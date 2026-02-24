export function ThemeScript() {
  const script = `
    (function() {
      try {
        var t = localStorage.getItem('theme');
        if (t === 'dark') document.documentElement.classList.add('dark');
        // Default is light — no class needed
      } catch(e) {}
    })();
  `
  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
