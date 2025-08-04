import { Head, Html, Main, NextScript } from 'next/document'

const themeScript = `
  let mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  function updateTheme(savedTheme) {
    let theme = 'system'
    try {
      if (!savedTheme) {
        savedTheme = window.localStorage.theme
      }
      if (savedTheme === 'dark') {
        theme = 'dark'
        document.documentElement.classList.add('dark')
      } else if (savedTheme === 'light') {
        theme = 'light'
        document.documentElement.classList.remove('dark')
      } else if (mediaQuery.matches) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    } catch {
      theme = 'light'
      document.documentElement.classList.remove('dark')
    }
    return theme
  }

  function updateThemeWithoutTransitions(savedTheme) {
    updateTheme(savedTheme)
    document.documentElement.classList.add('[&_*]:!transition-none')
    window.setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none')
    }, 0)
  }

  document.documentElement.setAttribute('data-theme', updateTheme())

  new MutationObserver(([{ oldValue }]) => {
    let newValue = document.documentElement.getAttribute('data-theme')
    if (newValue !== oldValue) {
      try {
        window.localStorage.setItem('theme', newValue)
      } catch {}
      updateThemeWithoutTransitions(newValue)
    }
  }).observe(document.documentElement, { attributeFilter: ['data-theme'], attributeOldValue: true })

  mediaQuery.addEventListener('change', updateThemeWithoutTransitions)
  window.addEventListener('storage', updateThemeWithoutTransitions)
`

export default function Document() {
  return (
    <Html className="antialiased [font-feature-settings:'ss01']" lang="en">
      <Head>
        {/* SEO Metadata */}
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Skyport Documentation - Guide and API Reference"
        />
        <meta
          name="keywords"
          content="skyport, documentation, api, development, guide, panel, game-panel, skyport panel, skyport github"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://skyport.dev/" />
        <meta property="og:title" content="Skyport Documentation" />
        <meta property="og:description" content="Documentation for Skyport" />
        <meta property="og:image" content="https://i.imgur.com/llwMKX4.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://skyport.dev/" />
        <meta property="twitter:title" content="Skyport Documentation" />
        <meta
          property="twitter:description"
          content="Documentation for Skyport"
        />
        <meta
          property="twitter:image"
          content="https://i.imgur.com/llwMKX4.png"
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://skyport.dev" />

        {/* Theme Script */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </Head>
      <body className="bg-white dark:bg-neutral-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
