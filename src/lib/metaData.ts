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
  title: 'Milestones in the{n}learning journey',
  description:
    'Each project marks a step forward, showcasing my growth and journey as a developer.{nMd}Explore how I’ve tackled challenges and built solutions along the way.'
}
export const projectMetaData: MetaData = buildMetaData(_projectMetaData)

const _blogMetaData: MetaDataInput = {
  title: 'Learning, Building, and{nSm}Documenting',
  description:
    'Insights and experiences from my journey as a developer—exploring ideas,{nSm}overcoming challenges, and sharing lessons learned along the way.'
}
export const blogMetaData: MetaData = buildMetaData(_blogMetaData)
