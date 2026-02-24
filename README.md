# sho.rt — Frontend

A clean, minimal Next.js frontend powered by the [urlshort.dev](https://www.urlshort.dev) public API.

## Stack
- **Next.js 14** (App Router) · **React 18** · **TypeScript**
- **Tailwind CSS** · **Lucide React**

## Features
- ✂️ Paste any URL → short link instantly via `api.encurtador.dev`
- 🌞 Bright theme by default with **dark/light toggle** (no flash)
- 🕐 Recent links history stored in `localStorage`
- 📋 One-click copy · 🔗 Open in new tab · 🗑️ Delete history entries
- 📄 OpenAPI 3.0 spec for the urlshort.dev API (`swagger.yaml`)

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run the dev server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> No `.env` setup needed — the app calls the public `https://api.encurtador.dev` directly.

## API Reference

The app uses the **urlshort.dev** public API — no auth required.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `https://api.encurtador.dev/encurtamentos` | Shorten a URL |

**Request body:**
```json
{ "url": "https://your-long-url.com" }
```

**Response:**
```json
{ "urlEncurtada": "acesse.one/Og5Wz" }
```

Returns HTTP `201` for new links, `200` if the URL was already shortened.
See `swagger.yaml` for the full OpenAPI 3.0 spec (paste at [editor.swagger.io](https://editor.swagger.io) to browse).

## Project Structure
```
short-frontend/
├── app/
│   ├── components/
│   │   ├── Navbar.tsx         # Top bar with theme toggle
│   │   ├── ShortenForm.tsx    # URL input + result card
│   │   ├── HistoryPanel.tsx   # localStorage history list
│   │   └── ThemeScript.tsx    # Flash-prevention inline script
│   ├── lib/
│   │   ├── api.ts             # urlshort.dev API call
│   │   └── useTheme.ts        # Dark/light mode hook
│   ├── globals.css            # Tailwind + CSS variables + fonts
│   ├── layout.tsx
│   └── page.tsx
├── swagger.yaml               # OpenAPI 3.0 spec for urlshort.dev
├── tailwind.config.js
├── next.config.js
└── package.json
```
