import type { MarkdownHeading } from 'astro'

import { cn } from '@/lib/utils'

interface Props {
  headings: MarkdownHeading[]
}
type GroupedHeadings = (MarkdownHeading | MarkdownHeading[])[]

const groupHeadings = (headings: MarkdownHeading[]): GroupedHeadings => {
  return headings.reduce<GroupedHeadings>((result, current, index) => {
    if (current.depth <= 2) result.push(current)
    // depth > 2
    else if (headings[index - 1]?.depth !== current.depth) {
      result.push([current])
    } else {
      ;(result[result.length - 1] as MarkdownHeading[]).push(current)
    }

    return result
  }, [])
}

const Heading = ({ slug, text }: MarkdownHeading) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    document.getElementById(slug)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  return (
    <li>
      <a
        onClick={handleClick}
        className='hover:text-slate-300'
        href={`#${slug}`}
      >
        {text}
      </a>
    </li>
  )
}

const DEPTH_STYLE = {
  3: 'pl-4',
  4: 'pl-8'
}

const NestedHeading = ({ headings }: { headings: MarkdownHeading[] }) => {
  return (
    <ul
      className={cn(
        'mt-2 space-y-2',
        DEPTH_STYLE[headings[0].depth as keyof typeof DEPTH_STYLE]
      )}
    >
      {headings.map((heading) => (
        <Heading key={heading.slug} {...heading} />
      ))}
    </ul>
  )
}

const TableOfContent = ({ headings }: Props) => {
  const groupedHeadings = groupHeadings(headings)
  return (
    <ul className='space-y-2 text-sm tracking-wide text-slate-500'>
      {groupedHeadings.map((heading) => {
        if (!Array.isArray(heading)) {
          return <Heading key={heading.slug} {...heading} />
        }

        return (
          <NestedHeading
            key={`${heading[0].slug}-${heading[0].depth}`}
            headings={heading}
          />
        )
      })}
    </ul>
  )
}

export default TableOfContent
