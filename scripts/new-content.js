#!/usr/bin/env node
/*
 Minimal scaffolder for MDX content in blog/projects/pages collections.
 Usage:
   pnpm new:page "about"
   pnpm new:project "my-project"
   pnpm new:blog "my-first-post"
*/
const fs = require('fs')
const path = require('path')

const type = process.argv[2]
const slug = (process.argv[3] || '').trim()
if (!type || !slug) {
  console.error('Usage: node scripts/new-content.js <page|project|blog> <slug>')
  process.exit(1)
}

const now = new Date().toISOString().slice(0, 10)

const baseDir = {
  page: 'src/content/pages',
  project: 'src/content/projects',
  blog: 'src/content/blog'
}[type]

if (!baseDir) {
  console.error('Invalid type. Use: page | project | blog')
  process.exit(1)
}

const targetDir = path.join(process.cwd(), baseDir)
const targetPath = path.join(targetDir, `${slug}.mdx`)

if (fs.existsSync(targetPath)) {
  console.error(`File already exists: ${path.relative(process.cwd(), targetPath)}`)
  process.exit(1)
}

fs.mkdirSync(targetDir, { recursive: true })

let frontmatter = ''
if (type === 'page') {
  frontmatter = `---\ntitle: '${slug.replace(/-/g, ' ')}'\ndescription: 'Page description'\nupdatedDate: ${now}\n---\n\n# ${slug.replace(/-/g, ' ')}\n\nWrite your content here.\n`
} else if (type === 'project') {
  frontmatter = `---\nyear: ${new Date().getFullYear()}\ntitle: '${slug.replace(/-/g, ' ')}'\ndescription: 'Short project description'\nheroImage: '../../assets/qreate.png'\nlinks: []\nupdatedDate: ${now}\n---\n\nProject details here.\n`
} else if (type === 'blog') {
  frontmatter = `---\ntitle: '${slug.replace(/-/g, ' ')}'\ndescription: 'Post description'\nheroImage: '/images/og_main.png'\npubDate: ${now}\nupdatedDate: ${now}\ntags: []\n---\n\nYour post starts here.\n`
}

fs.writeFileSync(targetPath, frontmatter)
console.log('Created:', path.relative(process.cwd(), targetPath))
