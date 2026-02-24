'use client'

import { useState, useRef, useEffect } from 'react'
import { Loader2, Check, Copy, ExternalLink, AlertCircle } from 'lucide-react'
import { shortenUrl, ShortenResponse } from '../lib/api'

export function ShortenForm() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ShortenResponse | null>(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { inputRef.current?.focus() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await shortenUrl(url.trim())
      setResult(res)
      try {
        const hist: ShortenResponse[] = JSON.parse(localStorage.getItem('short_history') || '[]')
        const filtered = hist.filter(h => h.originalUrl !== res.originalUrl)
        localStorage.setItem('short_history', JSON.stringify([res, ...filtered].slice(0, 50)))
        window.dispatchEvent(new CustomEvent('history_updated'))
      } catch {}
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to shorten URL')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    if (!result) return
    const full = result.shortUrl.startsWith('http') ? result.shortUrl : `https://${result.shortUrl}`
    await navigator.clipboard.writeText(full)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const fullShortUrl = result
    ? (result.shortUrl.startsWith('http') ? result.shortUrl : `https://${result.shortUrl}`)
    : ''

  return (
    <div className="w-full max-w-3xl">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-0">
          <input
            ref={inputRef}
            type="url"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="PASTE YOUR LONG URL HERE..."
            required
            style={{
              flex: 1,
              padding: '16px 20px',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              letterSpacing: '0.5px',
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              border: '3px solid var(--border)',
              outline: 'none',
              caretColor: 'var(--text-primary)',
            }}
          />
          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="brut-btn"
            style={{
              padding: '16px 32px',
              fontFamily: 'var(--font-display)',
              fontSize: '22px',
              fontWeight: 900,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              background: 'var(--accent)',
              color: 'var(--text-primary)',
              border: '3px solid var(--border)',
              borderLeft: 'none',
              boxShadow: 'var(--shadow)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              opacity: loading || !url.trim() ? 0.5 : 1,
            }}
          >
            {loading
              ? <Loader2 className="w-5 h-5 animate-spin" />
              : '→ SHORTEN'
            }
          </button>
        </div>
      </form>
      {error && (
        <div
          className="mt-5 p-4 flex gap-3 items-start animate-fade-up"
          style={{
            border: '3px solid var(--border)',
            boxShadow: 'var(--shadow)',
            background: 'var(--bg-card)',
          }}
        >
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, letterSpacing: '1px', marginBottom: '2px' }}>
              ERROR
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)' }}>{error}</p>
          </div>
        </div>
      )}
      {result && (
        <div
          className="mt-5 animate-pop-in"
          style={{
            border: '3px solid var(--border)',
            boxShadow: 'var(--shadow-lg)',
            background: 'var(--bg-card)',
          }}
        >
          <div
            style={{
              background: 'var(--accent)',
              borderBottom: '3px solid var(--border)',
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 900, letterSpacing: '3px', color: 'var(--text-primary)' }}>
              ★ LINK READY
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-secondary)', letterSpacing: '1px' }}>
              {new Date().toLocaleDateString()}
            </span>
          </div>

          <div className="p-5 flex items-center gap-4 justify-between flex-wrap">
            <div className="min-w-0 flex-1">
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '2px', marginBottom: '6px', textTransform: 'uppercase' }}>
                Your short URL:
              </p>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: '32px',
                fontWeight: 900,
                letterSpacing: '1px',
                color: 'var(--text-primary)',
                lineHeight: 1,
                wordBreak: 'break-all',
              }}>
                {result.shortUrl}
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', marginTop: '8px', wordBreak: 'break-all' }}>
                ↳ {result.originalUrl}
              </p>
            </div>

            <div className="flex gap-2 shrink-0">
              <a
                href={fullShortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="brut-btn w-11 h-11 flex items-center justify-center"
                style={{
                  border: '2px solid var(--border)',
                  boxShadow: 'var(--shadow-sm)',
                  background: 'var(--bg)',
                }}
                title="Open link"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={handleCopy}
                className="brut-btn w-11 h-11 flex items-center justify-center"
                style={{
                  border: '2px solid var(--border)',
                  boxShadow: copied ? 'none' : 'var(--shadow-sm)',
                  background: copied ? 'var(--accent)' : 'var(--bg)',
                  transform: copied ? 'translate(3px,3px)' : undefined,
                }}
                title="Copy"
              >
                {copied
                  ? <Check className="w-4 h-4" />
                  : <Copy className="w-4 h-4" />
                }
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
