const fs = require('fs')
const path = require('path')

async function generateSearchIndex() {
  const { globby } = await import('globby')

  const pages = await globby([
    'src/content/**/*.{md,mdx}',
  ])

  const index = pages.map((page) => {
    const fileContent = fs.readFileSync(page, 'utf8')
    
    let title = ''
    let description = ''
    
    const frontmatterMatch = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---/)
    if (frontmatterMatch) {
      const fm = frontmatterMatch[1]
      const titleMatch = fm.match(/^title:\s*(.*)$/m)
      if (titleMatch) title = titleMatch[1].replace(/^["']|["']$/g, '').trim()
      
      const descMatch = fm.match(/^description:\s*(.*)$/m)
      if (descMatch) description = descMatch[1].replace(/^["']|["']$/g, '').trim()
    }

    const route = page
        .replace('src/content', '')
        .replace('.md', '')
        .replace('.mdx', '')
        .replace('/index', '')

    const url = route === '' ? '/' : route

    const content = fileContent
      .replace(/^---\r?\n[\s\S]*?\r?\n---/, '')
      .replace(/<[^>]*>?/gm, '')
      .replace(/[#*`_\[\]()]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 5000)

    return {
      url,
      title,
      description,
      content
    }
  })

  fs.writeFileSync(
    path.join(__dirname, '../public/search-index.json'),
    JSON.stringify(index)
  )
  console.log('Search index generated at public/search-index.json')
}

generateSearchIndex()
