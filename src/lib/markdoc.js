import Markdoc from '@markdoc/markdoc'
import { slugifyWithCounter } from '@sindresorhus/slugify'
import matter from 'gray-matter'

import nodes from '../../markdoc/nodes'
import tags from '../../markdoc/tags'

export function getNodeText(node) {
  let text = ''
  for (let child of node.children ?? []) {
    if (typeof child === 'string') {
      text += child
    }
    text += getNodeText(child)
  }
  return text
}

export function collectHeadings(nodes, slugify = slugifyWithCounter()) {
  let sections = []

  for (let node of nodes) {
    if (node.name === 'h2' || node.name === 'h3') {
      let title = getNodeText(node)
      if (title) {
        let id = slugify(title)
        node.attributes.id = id
        if (node.name === 'h3') {
          if (!sections[sections.length - 1]) {
            throw new Error(
              'Cannot add `h3` to table of contents without a preceding `h2`'
            )
          }
          sections[sections.length - 1].children.push({
            ...node.attributes,
            title,
          })
        } else {
          sections.push({ ...node.attributes, title, children: [] })
        }
      }
    }

    sections.push(...collectHeadings(node.children ?? [], slugify))
  }

  return sections
}

export function parseMarkdoc(rawContent) {
  const { data: frontmatter, content } = matter(rawContent)
  const ast = Markdoc.parse(content)
  const contentAst = Markdoc.transform(ast, {
    tags,
    nodes,
  })

  // To match the old plugin behavior where variables might be passed, we could pass them if needed.
  // But here we just render without variables.
  const tableOfContents = collectHeadings([contentAst]) // collectHeadings expects an array of nodes or children. 
  
  return {
    frontmatter,
    contentAst,
    tableOfContents: collectHeadings(contentAst.children || []),
  }
}
