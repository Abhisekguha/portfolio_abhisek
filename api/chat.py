"""
Vercel Serverless Function — Portfolio AI Chat API Proxy
Replaces server.py for Vercel deployment.
"""
import json
import os
import urllib.error
import urllib.request
from datetime import datetime


def log_message(msg):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{timestamp}] {msg}", flush=True)


def error_response(status_code, user_message, debug_info=""):
    body = json.dumps({"error": user_message, "status": status_code, "debug": debug_info})
    return {
        "statusCode": status_code,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
        "body": body,
    }


def handler(request):
    """
    Vercel serverless function handler.
    Receives requests from /api/chat and proxies to OpenRouter.
    """
    try:
        # ── Parse request body ──
        try:
            body = json.loads(request.get("body", "{}") or "{}")
        except json.JSONDecodeError:
            return error_response(400, "Invalid JSON in request body.")

        # ── Validate ──
        if "messages" not in body:
            return error_response(400, "Missing 'messages' field in request.")

        # ── Get API key ──
        api_key = os.environ.get("OPENROUTER_API_KEY", "")
        if not api_key:
            log_message("OPENROUTER_API_KEY not configured")
            return error_response(500, "Server configuration error: API key not set.")

        # ── Build payload ──
        model = body.get("model") or os.environ.get(
            "OPENROUTER_MODEL", "openrouter/auto"
        )
        payload = {
            "model": model,
            "messages": body["messages"],
            "temperature": body.get("temperature", 0.65),
            "max_tokens": body.get("max_tokens", 1500),
        }

        # ── Get referer from request or default ──
        headers_dict = request.get("headers", {})
        scheme = headers_dict.get("x-forwarded-proto", "https")
        host = headers_dict.get("host", "portfolio.vercel.app")
        referer = f"{scheme}://{host}"

        req_data = json.dumps(payload).encode("utf-8")
        req = urllib.request.Request(
            "https://openrouter.ai/api/v1/chat/completions",
            data=req_data,
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {api_key}",
                "HTTP-Referer": referer,
            },
            method="POST",
        )

        # ── Call OpenRouter ──
        with urllib.request.urlopen(req, timeout=30) as resp:
            response_data = resp.read()
            resp_json = json.loads(response_data.decode("utf-8"))
            msg_content = (
                resp_json.get("choices", [{}])[0]
                .get("message", {})
                .get("content", "")
            )
            log_message(f"Response received ({len(msg_content)} chars)")

            return {
                "statusCode": 200,
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type, Authorization",
                },
                "body": response_data.decode("utf-8"),
            }

    except urllib.error.HTTPError as e:
        err_body = e.read().decode("utf-8", errors="ignore")
        log_message(f"OpenRouter HTTP {e.code}: {err_body[:100]}")
        return error_response(e.code, f"OpenRouter error: {e.code}", err_body[:200])

    except urllib.error.URLError as e:
        log_message(f"Network error: {e.reason}")
        return error_response(503, "Network error connecting to OpenRouter.")

    except Exception as e:
        log_message(f"Unexpected error: {e}")
        return error_response(500, f"Internal server error: {str(e)[:100]}")