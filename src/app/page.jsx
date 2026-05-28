import fs from 'fs'
import path from 'path'
import Markdoc from '@markdoc/markdoc'
import React from 'react'

import { Layout } from '@/components/Layout'
import { parseMarkdoc } from '@/lib/markdoc'

export async function generateMetadata() {
  const filePath = path.join(process.cwd(), 'src/content/index.md')
  const rawContent = fs.readFileSync(filePath, 'utf8')
  const { frontmatter } = parseMarkdoc(rawContent)

  const title = frontmatter.pageTitle || frontmatter.title || 'Skyport Documentation'
  const description = frontmatter.description || 'Skyport Documentation - Guide and API Reference'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: ['https://i.imgur.com/llwMKX4.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://i.imgur.com/llwMKX4.png'],
    },
  }
}

export default function HomePage() {
  const filePath = path.join(process.cwd(), 'src/content/index.md')
  const rawContent = fs.readFileSync(filePath, 'utf8')
  const { frontmatter, contentAst, tableOfContents } = parseMarkdoc(rawContent)

  const reactContent = Markdoc.renderers.react(contentAst, React)

  return (
    <Layout title={frontmatter.title} tableOfContents={tableOfContents}>
      {reactContent}
    </Layout>
  )
}
