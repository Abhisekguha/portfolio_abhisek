# 🚀 Deploying Your Portfolio AI Chat to Vercel

This guide walks you through deploying your portfolio (with the AI chat assistant) to **Vercel** — for free.

## Architecture on Vercel

```
Browser (https://yourname.vercel.app)
    │
    ├── Static files: index.html, styles.css, script.js
    │
    └── /api/chat  →  api/chat.py (Python Serverless Function)
                           │
                           └── OpenRouter API (external)
```

- **Frontend**: HTML/CSS/JS served as static assets by Vercel's CDN
- **Backend**: `api/chat.py` runs as a Python serverless function on Vercel
- **No server.py needed** — that was for local development only

## Prerequisites

1. [GitHub](https://github.com) account
2. [Vercel](https://vercel.com) account (sign up free with GitHub)
3. [OpenRouter](https://openrouter.ai) API key (free credits available)

## Step-by-Step Deployment

### 1. Push Your Code to GitHub

```bash
# Initialize git (if not already done)
cd c:/Users/ADMIN/Desktop/my_portfolio
git init
git add .
git commit -m "Initial commit — portfolio with AI chat"

# Create a repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Vercel will auto-detect the project config from `vercel.json`
4. **Important**: Add your environment variables:

   | Variable | Value |
   |----------|-------|
   | `OPENROUTER_API_KEY` | `sk-or-v1-...` (your actual key) |
   | `OPENROUTER_MODEL` | `liquid/lfm-2.5-1.2b-thinking:free` (or your choice) |

   ![Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

5. Click **Deploy** ✅

Wait ~2 minutes, and your portfolio will be live at `https://your-project.vercel.app`.

### 3. After Deployment

- Your portfolio loads instantly (static CDN)
- The AI chat calls `/api/chat` which runs `api/chat.py` as a serverless function
- The function proxies your question to OpenRouter and returns the response
- Everything is in proper **Markdown** (tables, lists, code blocks, bold)

## Files You Need for Vercel

These files are already in your project:

| File | Purpose |
|------|---------|
| `vercel.json` | Tells Vercel how to build and route |
| `api/chat.py` | Python serverless function for OpenRouter proxy |
| `index.html` | Your portfolio page |
| `styles.css` | All styles (including Markdown chat styles) |
| `script.js` | Frontend logic with portfolio data + Markdown rendering |

Files **not needed** on Vercel (local dev only):
- `server.py` — replaced by `api/chat.py`
- `.env` — use Vercel's environment variables instead

## Testing Your Chat on Vercel

1. Open your deployed URL
2. Click **Ask Me ✦** (navbar or floating button)
3. Try a suggestion or type a question
4. Responses should appear formatted in Markdown (tables, bold, code blocks, bullet lists)

## Troubleshooting

### "API key not configured" error
→ You forgot to add `OPENROUTER_API_KEY` in Vercel's environment variables.
   Go to your project → Settings → Environment Variables → Add it.

### 500 error on chat
→ The API function timed out or OpenRouter returned an error.
   Check Vercel function logs: Dashboard → Project → Functions → View Logs.

### Chat returns plain text (no Markdown)
→ The AI model you chose might ignore formatting instructions.
   Try a different model like `openai/gpt-4o-mini` or `mistralai/mistral-7b-instruct:free`.

## Updating Your Portfolio

1. Make changes locally to `index.html`, `styles.css`, `script.js`, or `api/chat.py`
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Updated portfolio"
   git push
   ```
3. Vercel auto-deploys on every push 🚀

## Custom Domain (Optional)

In Vercel Dashboard → Project → Domains → Add your own domain.

---

**Your portfolio is now live with an AI assistant that responds in proper Markdown! 🎉**