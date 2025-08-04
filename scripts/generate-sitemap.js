const fs = require('fs')
const path = require('path')

async function generateSitemap() {
  const { globby } = await import('globby')

  const pages = await globby([
    'src/pages/**/*.{js,jsx,md,mdx}',
    '!src/pages/_*.{js,jsx}',
    '!src/pages/api',
  ])

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map((page) => {
      const route = page
        .replace('src/pages', '')
        .replace('.js', '')
        .replace('.jsx', '')
        .replace('.md', '')
        .replace('.mdx', '')
        .replace('/index', '')

      const path = route === '/index' ? '' : route
      return `
    <url>
      <loc>https://skyport.dev${path}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
    </url>
  `
    })
    .join('')}
</urlset>`

  fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap)
}

generateSitemap()
