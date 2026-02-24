'use client'

import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../lib/useTheme'

export function Navbar() {
  const { theme, toggle, mounted } = useTheme()

  return (
    <header style={{ background: 'var(--bg-invert)', borderBottom: '3px solid var(--border)' }}
      className="fixed top-0 inset-x-0 z-50">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 flex items-center justify-center text-sm font-bold brut-btn"
            style={{
              background: 'var(--accent)',
              color: 'var(--text-primary)',
              border: '2px solid var(--border)',
              boxShadow: 'var(--shadow-sm)',
              fontFamily: 'var(--font-display)',
              fontSize: '18px',
              lineHeight: 1,
            }}
          >
            ✂
          </div>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '26px',
            fontWeight: 900,
            color: 'var(--text-invert)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            lineHeight: 1,
          }}>
            ZHO<span style={{ color: 'var(--accent)' }}>.RT</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:block"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              color: 'var(--text-muted)',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            FREE · NO SIGNUP
          </span>

          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="brut-btn w-9 h-9 flex items-center justify-center"
            style={{
              background: 'var(--accent)',
              border: '2px solid var(--border)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            {mounted && (
              theme === 'dark'
                ? <Sun className="w-4 h-4" style={{ color: 'var(--text-primary)' }} />
                : <Moon className="w-4 h-4" style={{ color: 'var(--text-primary)' }} />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
