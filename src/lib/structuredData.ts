import type { CollectionEntry } from 'astro:content'
import type { Article, Person, WebSite, WithContext } from 'schema-dts'

import { projectMetaData } from './metaData'
import { PRIMARY_SITE, BLOG_SITE } from './sites'

export const mainWebsite: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: PRIMARY_SITE,
  name: 'Ritik - Personal Website',
  description:
    'DevOps/DevSecOps Engineer automating cloud infrastructure (AWS), Kubernetes, Docker, CI/CD, and security.',
  inLanguage: 'en_US'
}

export const projectWebsite: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: `${PRIMARY_SITE}/projects/`,
  name: 'Projects',
  description: projectMetaData.description,
  inLanguage: 'en_US'
}

export const personSchema: WithContext<Person> = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ritik',
  url: 'https://www.linkedin.com/in/ritik-devops',
  // image: `${import.meta.env.SITE}${avatar.src}`,
  sameAs: ['https://www.linkedin.com/in/ritik-devops'],
  jobTitle: 'DevOps Engineer'
  // worksFor: {
  //   '@type': 'Organization',
  //   name: 'Grafana',
  //   url: 'https://grafana.com',
  // },
}

export function getProjectSchema(post: CollectionEntry<'projects'>) {
  const articleStructuredData: WithContext<Article> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.data.title,
    url: `${PRIMARY_SITE}/projects/${post.id}/`,
    image: {
      '@type': 'ImageObject',
      url: `${PRIMARY_SITE}${post.data.heroImage.src}/`
    },
    description: post.data.description,
    // datePublished
    publisher: personSchema,
    author: personSchema
  }
  return articleStructuredData
}

export function getBlogArticleSchema(post: CollectionEntry<'blog'>) {
  const article: WithContext<Article> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.data.title,
    url: `${BLOG_SITE}/blog/${post.id}/`,
    image: post.data.heroImage
      ? { '@type': 'ImageObject', url: `${BLOG_SITE}${post.data.heroImage}` }
      : undefined,
    description: post.data.description,
    publisher: personSchema,
    author: personSchema
  }
  return article
}
