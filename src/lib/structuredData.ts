import type { CollectionEntry } from 'astro:content'
import type { Article, Person, WebSite, WithContext } from 'schema-dts'

import { projectMetaData } from './metaData'

export const mainWebsite: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: import.meta.env.SITE,
  name: 'Ritik - Personal Website',
  description:
    'DevOps/DevSecOps Engineer automating cloud infrastructure (AWS), Kubernetes, Docker, CI/CD, and security.',
  inLanguage: 'en_US'
}

export const projectWebsite: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: `${import.meta.env.SITE}/projects/`,
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
    url: `${import.meta.env.SITE}/projects/${post.id}/`,
    image: {
      '@type': 'ImageObject',
      url: `${import.meta.env.SITE}${post.data.heroImage.src}/`
    },
    description: post.data.description,
    // datePublished
    publisher: personSchema,
    author: personSchema
  }
  return articleStructuredData
}
