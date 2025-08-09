const LINE_BREAK = {
  '{n}': ' <br /> ',
  '{nSm}': " <br class='max-sm:hidden'/> ",
  '{nMd}': " <br class='max-md:hidden'/> ",
  '{nLg}': " <br class='max-lg:hidden'/> "
}

interface ParseTextOptions {
  isCleanText?: boolean
}

const parseText = (text: string, opts?: ParseTextOptions): string => {
  let newText = text
  Object.keys(LINE_BREAK).forEach((key) => {
    const replacement = opts?.isCleanText
      ? ' '
      : LINE_BREAK[key as keyof typeof LINE_BREAK]
    newText = newText.split(key).join(replacement)
  })
  return newText
}

type MetaData = {
  title: string
  htmlTitle: string
  description: string
  htmlDescription: string
}
type MetaDataInput = {
  title: string
  description: string
}

const buildMetaData = (input: MetaDataInput): MetaData => ({
  title: parseText(input.title, { isCleanText: true }),
  htmlTitle: parseText(input.title),
  description: parseText(input.description, { isCleanText: true }),
  htmlDescription: parseText(input.description)
})

const _mainMetaData: MetaDataInput = {
  title: 'Ritik',
  description:
    'DevOps/DevSecOps Engineer focusing on AWS, Kubernetes, Docker,{n}CI/CD, automation, and security best practices.'
}
export const mainMetaData = buildMetaData(_mainMetaData)

const _projectMetaData: MetaDataInput = {
  title: 'Projects{nMd}Milestones in my learning journey',
  description:
    'AI · DevOps · DevSecOps — Each project marks a step forward, showcasing growth in secure automation, cloud, and AI infrastructure.{nMd}Explore how I’ve tackled challenges and built solutions along the way.'
}
export const projectMetaData: MetaData = buildMetaData(_projectMetaData)

const _blogMetaData: MetaDataInput = {
  title: 'Learning, Automating, and{nSm}Documenting',
  description:
    'Insights from my DevOps/DevSecOps & AI journey—cloud, CI/CD, security-by-default,{nSm}MLOps, and practical lessons from real-world automation.'
}
export const blogMetaData: MetaData = buildMetaData(_blogMetaData)
