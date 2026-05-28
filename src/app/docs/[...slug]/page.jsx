import fs from 'fs'
import path from 'path'
import Markdoc from '@markdoc/markdoc'
import React from 'react'
import { notFound } from 'next/navigation'
import { globby } from 'globby'

import { Layout } from '@/components/Layout'
import { parseMarkdoc } from '@/lib/markdoc'

export async function generateStaticParams() {
  const docsDir = path.join(process.cwd(), 'src/content/docs')
  const paths = await globby('**/*.md', { cwd: docsDir })
  return paths.map((p) => {
    const slug = p.replace(/\.md$/, '').split('/')
    return { slug }
  })
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const filePath = path.join(process.cwd(), 'src/content/docs', `${slug.join('/')}.md`)
  
  if (!fs.existsSync(filePath)) {
    return {}
  }

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

export default async function DocPage({ params }) {
  const { slug } = await params
  const filePath = path.join(process.cwd(), 'src/content/docs', `${slug.join('/')}.md`)

  if (!fs.existsSync(filePath)) {
    notFound()
  }

  const rawContent = fs.readFileSync(filePath, 'utf8')
  const { frontmatter, contentAst, tableOfContents } = parseMarkdoc(rawContent)

  const reactContent = Markdoc.renderers.react(contentAst, React)

  return (
    <Layout title={frontmatter.title} tableOfContents={tableOfContents}>
      {reactContent}
    </Layout>
  )
}
