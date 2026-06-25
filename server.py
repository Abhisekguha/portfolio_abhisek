import json
import os
import urllib.error
import urllib.request
from http.server import SimpleHTTPRequestHandler, HTTPServer
from pathlib import Path
import sys
from datetime import datetime

# Load environment variables from .env file if it exists
env_path = Path('.env')
if env_path.exists():
    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                key, value = line.split('=', 1)
                os.environ[key.strip()] = value.strip()

OPENROUTER_API_KEY = os.getenv(
    "OPENROUTER_API_KEY",
    ""
)
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
MAX_RETRIES = 2
REQUEST_TIMEOUT = 30

def log_message_with_time(message):
    """Log message with timestamp"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{timestamp}] {message}")

class ProxyHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, HEAD")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        if self.path == "/api/chat":
            self.handle_chat_proxy()
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"Not found")

    def handle_chat_proxy(self):
        """Main chat proxy handler with comprehensive error handling"""
        try:
            content_length = int(self.headers.get("Content-Length", 0))
            if content_length <= 0:
                return self.send_error_response(
                    400, "Missing request body.", "Invalid Content-Length"
                )

            raw_body = self.rfile.read(content_length)

            try:
                request_data = json.loads(raw_body)
            except json.JSONDecodeError as e:
                return self.send_error_response(
                    400, f"Invalid JSON in request body.", f"JSONDecodeError: {str(e)}"
                )

            # Validate required fields
            if "messages" not in request_data:
                return self.send_error_response(
                    400, "Missing 'messages' field in request.", "Invalid request structure"
                )

            if not OPENROUTER_API_KEY:
                log_message_with_time("❌ CRITICAL: OPENROUTER_API_KEY is not configured!")
                return self.send_error_response(
                    500, "Server configuration error.", "API key not configured"
                )

            # Set defaults and prepare request
            # Use model from request, then environment, then default
            model = request_data.get("model") or os.getenv("OPENROUTER_MODEL", "openrouter/auto")
            request_data["model"] = model
            request_data.setdefault("temperature", 0.65)
            request_data.setdefault("max_tokens", 500)
            
            payload = json.dumps(request_data).encode("utf-8")

            # Try to fetch response with retries
            response_data = self.fetch_from_openrouter(payload, retries=MAX_RETRIES)
            if response_data is None:
                return

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(response_data)

        except Exception as exc:
            log_message_with_time(f"❌ Unexpected error in handle_chat_proxy: {exc}")
            return self.send_error_response(
                500, "Internal server error.", str(exc)[:100]
            )

    def fetch_from_openrouter(self, payload, retries=1):
        """Fetch response from OpenRouter with retry logic"""
        for attempt in range(retries):
            try:
                req = urllib.request.Request(
                    OPENROUTER_URL,
                    data=payload,
                    headers={
                        "Content-Type": "application/json",
                        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                        "HTTP-Referer": "http://localhost:8000",
                    },
                    method="POST",
                )

                with urllib.request.urlopen(req, timeout=REQUEST_TIMEOUT) as upstream:
                    response_data = upstream.read()
                    response_text = response_data.decode("utf-8")
                    
                    try:
                        resp_json = json.loads(response_text)
                        msg_content = resp_json.get("choices", [{}])[0].get("message", {}).get("content", "")
                        log_message_with_time(f"✅ OpenRouter response received ({len(msg_content)} chars)")
                    except Exception as e:
                        log_message_with_time(f"⚠️ Could not parse response: {str(e)[:50]}")
                    
                    return response_data

            except urllib.error.HTTPError as exc:
                body = exc.read().decode("utf-8", errors="ignore")
                
                # Specific error handling
                if exc.code == 401:
                    log_message_with_time(f"❌ Authentication failed (401): Check API key")
                    return self.send_error_response(
                        401, "Authentication failed.", "Invalid or expired API key"
                    )
                elif exc.code == 429:
                    log_message_with_time(f"⚠️ Rate limited (429). Attempt {attempt + 1}/{retries}")
                    if attempt < retries - 1:
                        continue  # Retry
                    return self.send_error_response(
                        429, "Rate limited by OpenRouter.", "Too many requests, please wait"
                    )
                elif exc.code >= 500:
                    log_message_with_time(f"❌ OpenRouter server error ({exc.code})")
                    return self.send_error_response(
                        503, "OpenRouter service unavailable.", body[:100]
                    )
                else:
                    log_message_with_time(f"❌ OpenRouter error {exc.code}: {body[:100]}")
                    return self.send_error_response(
                        exc.code, f"OpenRouter returned error {exc.code}", body[:100]
                    )

            except urllib.error.URLError as exc:
                log_message_with_time(f"❌ Network error: {exc.reason}")
                if attempt < retries - 1:
                    log_message_with_time(f"🔄 Retrying... (attempt {attempt + 2}/{retries})")
                    continue
                return self.send_error_response(
                    503, "Network error connecting to OpenRouter.", str(exc.reason)[:100]
                )

            except socket.timeout:
                log_message_with_time(f"⏱️ Request timeout (attempt {attempt + 1}/{retries})")
                if attempt < retries - 1:
                    continue
                return self.send_error_response(
                    504, "Request timeout.", "OpenRouter took too long to respond"
                )

            except Exception as exc:
                log_message_with_time(f"❌ Unexpected error: {exc}")
                if attempt < retries - 1:
                    continue
                return self.send_error_response(
                    500, "Unexpected error.", str(exc)[:100]
                )

        return None

    def send_error_response(self, status_code, user_message, debug_info):
        """Send a structured error response"""
        error_response = {
            "error": user_message,
            "status": status_code
        }
        response_json = json.dumps(error_response).encode("utf-8")
        
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(response_json)

    def translate_path(self, path):
        """Serve files from current directory."""
        path = path.split('?', 1)[0]
        path = path.split('#', 1)[0]
        if path == '/':
            path = '/index.html'
        
        file_path = Path('.') / path.lstrip('/')
        if file_path.exists() and file_path.is_file():
            return str(file_path)
        
        return str(Path('.') / 'index.html')

    def log_message(self, format, *args):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] {format % args}")

if __name__ == "__main__":
    import socket
    
    port = 8000
    host = "127.0.0.1"
    
    log_message_with_time("=" * 60)
    log_message_with_time("🚀 Portfolio AI Chat Server Starting")
    log_message_with_time("=" * 60)
    log_message_with_time(f"📍 Serving at http://{host}:{port}")
    log_message_with_time(f"📡 API proxy enabled at /api/chat")
    
    # Check API key
    if OPENROUTER_API_KEY and not OPENROUTER_API_KEY.startswith('sk-or-v1-'):
        log_message_with_time("⚠️  WARNING: API key format looks invalid (should start with 'sk-or-v1-')")
    
    if OPENROUTER_API_KEY:
        masked_key = OPENROUTER_API_KEY[:20] + "..." if len(OPENROUTER_API_KEY) > 20 else "***"
        log_message_with_time(f"🔑 OpenRouter API Key: {masked_key}")
    else:
        log_message_with_time("❌ ERROR: OPENROUTER_API_KEY not set in environment!")
        log_message_with_time("   → Set it via: export OPENROUTER_API_KEY=sk-or-v1-your-key")
        log_message_with_time("   → Or add to .env file: OPENROUTER_API_KEY=sk-or-v1-your-key")
    
    model = os.getenv("OPENROUTER_MODEL", "openrouter/auto")
    log_message_with_time(f"📊 Default Model: {model}")
    log_message_with_time("=" * 60)
    
    server = HTTPServer((host, port), ProxyHandler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        log_message_with_time("👋 Server stopped by user")
        server.server_close()
    except Exception as e:
        log_message_with_time(f"❌ Fatal error: {e}")
        sys.exit(1)
