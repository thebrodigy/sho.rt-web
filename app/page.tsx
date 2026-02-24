import { Navbar } from './components/Navbar'
import { ShortenForm } from './components/ShortenForm'
import { HistoryPanel } from './components/HistoryPanel'

export default function Home() {
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />
      <div
        className="overflow-hidden"
        style={{
          marginTop: '56px',
          background: 'var(--accent)',
          borderBottom: '3px solid var(--border)',
          padding: '7px 0',
        }}
      >
        <div className="marquee-track">
          {Array(4).fill(null).map((_, i) => (
            <span key={i} className="flex whitespace-nowrap mr-12" style={{
              fontFamily: 'var(--font-display)',
              fontSize: '15px',
              fontWeight: 900,
              letterSpacing: '4px',
              color: 'var(--text-primary)',
              textTransform: 'uppercase',
              gap: '40px',
              display: 'flex',
            }}>
              <span>✂ SHORTEN ANY URL</span>
              <span>★ 100% FREE</span>
              <span>✂ NO SIGNUP NEEDED</span>
              <span>★ LINKS NEVER EXPIRE</span>
              <span>✂ INSTANT RESULTS</span>
              <span>★ NO BS</span>
              <span style={{ marginRight: '40px' }}>&nbsp;</span>
            </span>
          ))}
        </div>
      </div>

      <section className="px-6 pt-12 pb-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 animate-fade-up">
            <div className="flex items-center gap-4 mb-4">
              <div style={{ flex: 1, maxWidth: '60px', height: '3px', background: 'var(--border)' }} />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '3px',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
              }}>
                URL SHORTENER
              </span>
            </div>

            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(64px, 12vw, 120px)',
              lineHeight: 0.88,
              letterSpacing: '-1px',
              textTransform: 'uppercase',
              color: 'var(--text-primary)',
              marginBottom: '8px',
            }}>
              MAKE<br />
              <span style={{
                WebkitTextStroke: '3px var(--text-primary)',
                color: 'transparent',
              }}>
                IT SHORT
              </span>
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginTop: '16px' }}>
              <div style={{ height: '8px', width: '60px', background: 'var(--accent)', border: '2px solid var(--border)' }} />
              <div style={{ height: '8px', flex: 1, maxWidth: '200px', background: 'var(--border)' }} />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start animate-fade-up" style={{ animationDelay: '0.08s' }}>
            <div className="lg:w-64 shrink-0">
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: '16px',
              }}>
                Paste any URL. Get a short one. No account, no tracking, no nonsense.
              </p>
              <div className="flex flex-col gap-2">
                {[
                  ['⚡︎', 'Under 50ms'],
                  ['∞', 'Never expires'],
                  ['★', 'Always free'],
                ].map(([icon, label]) => (
                  <div key={label} className="flex items-center gap-2">
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '16px',
                      fontWeight: 900,
                      color: 'var(--accent)',
                      textShadow: '-1px 1px 0 var(--border)',
                    }}>{icon}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)', letterSpacing: '1px' }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 min-w-0 w-full">
              <ShortenForm />
              <HistoryPanel />
            </div>
          </div>
        </div>
      </section>

      <section style={{ borderTop: '3px solid var(--border)', borderBottom: '3px solid var(--border)' }}>
        <div className="max-w-4xl mx-auto grid grid-cols-3">
          {[
            { num: '50MS', label: 'Response time' },
            { num: '∞', label: 'Link lifetime' },
            { num: '0', label: 'Signups required' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="px-6 py-8 text-center"
              style={{
                borderRight: i < 2 ? '3px solid var(--border)' : 'none',
                background: i === 1 ? 'var(--bg-invert)' : 'var(--bg-card)',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px,7vw,64px)',
                fontWeight: 900,
                lineHeight: 1,
                color: i === 1 ? 'var(--accent)' : 'var(--text-primary)',
                textShadow: i === 1 ? 'none' : `-2px 2px 0 var(--accent)`,
                letterSpacing: '-1px',
              }}>
                {stat.num}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: i === 1 ? 'var(--text-muted)' : 'var(--text-secondary)',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginTop: '6px',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer
        style={{ background: 'var(--bg-invert)', borderTop: '3px solid var(--border)', padding: '16px 24px' }}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 900, color: 'var(--text-invert)', letterSpacing: '2px' }}>
            SHO<span style={{ color: 'var(--accent)' }}>.RT</span>
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '1px' }}>
            POWERED BY URLSHORT.DEV
          </span>
          <a
            href="https://github.com/thebrodigy/sho.rt-web"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent)', letterSpacing: '1px', textDecoration: 'underline' }}
          >
            GITHUB ↗
          </a>
        </div>
      </footer>
    </main>
  )
}
