# ZHO.RT

ZHO.RT is a fast, minimal URL zhortener. Paste your long URL, get a zhort one instantly. Powered by the [clc.is](https://clc.is/api) public API.

## Stack
- **Next.js 16** · **React 19** · **TypeScript**
- **Tailwind CSS** · **Lucide React**

## Features
- ✂️ Paste any URL → zhort link instantly via `clc.is/api/links`
- 🌞 Bright theme by default with **dark/light toggle** (no flash)
- 🕐 Recent links history stored in `localStorage`
- 📋 One-click copy · 🔗 Open in new tab · 🗑️ Delete history entries

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

> No `.env` setup needed — the app calls the public `https://clc.is` directly.

## API Reference

The app uses the **clc.is** public API — no auth required.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `https://clc.is/api/links` | Zhorten a URL |

**Request body:**
```json
{
  "domain": "clc.is",
  "target_url": "https://publicapis.io/alternatives/tly-url-shortner-api",
  "expired_hours": 0 // optional (0 = no expiration)
}
```

**Response:**
```json
{ "url": "https://clc.is/9Gb4L" }
```

Returns HTTP `200` for successful zhortens

## Project Structure
```
zho.rt-web/
├── app/
│   ├── components/
│   │   ├── Navbar.tsx         # Top bar with theme toggle
│   │   ├── ShortenForm.tsx    # URL input + result card
│   │   ├── HistoryPanel.tsx   # localStorage history list
│   │   └── ThemeScript.tsx    # Flash-prevention inline script
│   ├── lib/
│   │   ├── api.ts             # clc.is API call
│   │   └── useTheme.ts        # Dark/light mode hook
│   ├── globals.css            # Tailwind + CSS variables + fonts
│   ├── layout.tsx
│   └── page.tsx
├── tailwind.config.js
├── next.config.js
└── package.json
```
