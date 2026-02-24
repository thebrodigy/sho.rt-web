'use client'

import { useState, useEffect } from 'react'
import { Copy, Check, ExternalLink, Trash2 } from 'lucide-react'
import { ShortenResponse } from '../lib/api'

export function HistoryPanel() {
  const [history, setHistory] = useState<ShortenResponse[]>([])
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)

  const loadHistory = () => {
    try { setHistory(JSON.parse(localStorage.getItem('short_history') || '[]')) }
    catch { setHistory([]) }
  }

  useEffect(() => {
    loadHistory()
    window.addEventListener('history_updated', loadHistory)
    return () => window.removeEventListener('history_updated', loadHistory)
  }, [])

  const handleCopy = async (item: ShortenResponse) => {
    const full = item.shortUrl.startsWith('http') ? item.shortUrl : `https://${item.shortUrl}`
    await navigator.clipboard.writeText(full)
    setCopiedUrl(item.shortUrl)
    setTimeout(() => setCopiedUrl(null), 2000)
  }

  const handleDelete = (shortUrl: string) => {
    const next = history.filter(h => h.shortUrl !== shortUrl)
    setHistory(next)
    localStorage.setItem('short_history', JSON.stringify(next))
  }

  const clearAll = () => {
    setHistory([])
    localStorage.removeItem('short_history')
  }

  if (history.length === 0) return null

  return (
    <div className="w-full max-w-3xl mt-10 animate-fade-up" style={{ animationDelay: '0.1s' }}>
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{
          background: 'var(--bg-invert)',
          border: '3px solid var(--border)',
          borderBottom: 'none',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '18px',
          fontWeight: 900,
          letterSpacing: '3px',
          color: 'var(--text-invert)',
          textTransform: 'uppercase',
        }}>
          RECENT <span style={{ color: 'var(--accent)' }}>({history.length})</span>
        </span>
        <button
          onClick={clearAll}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--text-muted)',
            letterSpacing: '1px',
            textDecoration: 'underline',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          CLEAR ALL
        </button>
      </div>
      
      <div style={{ border: '3px solid var(--border)', boxShadow: 'var(--shadow-lg)' }}>
        {history.map((item, i) => {
          const fullShortUrl = item.shortUrl.startsWith('http') ? item.shortUrl : `https://${item.shortUrl}`
          const isLast = i === history.length - 1

          return (
            <div
              key={item.shortUrl}
              className="group flex items-center gap-4 px-4 py-4 animate-fade-up"
              style={{
                animationDelay: `${i * 0.04}s`,
                borderBottom: isLast ? 'none' : '2px solid var(--border)',
                background: i % 2 === 0 ? 'var(--bg-card)' : 'var(--bg)',
              }}
            >
              <div style={{ width: '10px', height: '10px', background: 'var(--accent)', border: '2px solid var(--border)', flexShrink: 0 }} />

              <div className="flex-1 min-w-0">
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '20px',
                  fontWeight: 900,
                  letterSpacing: '1px',
                  color: 'var(--text-primary)',
                  lineHeight: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {item.shortUrl}
                </p>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  color: 'var(--text-muted)',
                  marginTop: '4px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {item.originalUrl}
                </p>
              </div>

              <span className="hidden sm:block shrink-0"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '1px' }}>
                {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </span>

              <div className="flex gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                {[
                  { icon: <ExternalLink className="w-3.5 h-3.5" />, action: () => window.open(fullShortUrl, '_blank'), active: false },
                  { icon: copiedUrl === item.shortUrl ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />, action: () => handleCopy(item), active: copiedUrl === item.shortUrl },
                  { icon: <Trash2 className="w-3.5 h-3.5" />, action: () => handleDelete(item.shortUrl), active: false },
                ].map((btn, bi) => (
                  <button
                    key={bi}
                    onClick={btn.action}
                    className="brut-btn w-8 h-8 flex items-center justify-center"
                    style={{
                      border: '2px solid var(--border)',
                      boxShadow: 'var(--shadow-sm)',
                      background: btn.active ? 'var(--accent)' : 'var(--bg)',
                      cursor: 'pointer',
                    }}
                  >
                    {btn.icon}
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
