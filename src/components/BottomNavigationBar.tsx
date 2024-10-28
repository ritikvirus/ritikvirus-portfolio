import './BottomNavigationBar.css'

import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

import { Bookmarks } from './icons/Bookmarks'
import { Briefcase } from './icons/Briefcase'
import { ChatTeardropDots } from './icons/ChatTeardrop'
import { HandPalm } from './icons/HandPalm'
import { HandWaving } from './icons/HandWaving'
import { Dock, DockIcon } from './ui/dock'
import { useNavTooltipHandler } from './useNavTooltipHandler'
import useScrollHandler from './useScrollHandler'

export const bottomNavigationItems = [
  {
    name: 'Hi 👋',
    icon: HandWaving,
    href: '/'
  },
  {
    name: 'Works',
    icon: Briefcase,
    href: '/works'
  },
  {
    name: 'Blog',
    icon: ChatTeardropDots,
    href: '/blog'
  },
  {
    name: 'About',
    icon: HandPalm,
    href: '/about'
  },
  {
    name: 'Bookmarks',
    icon: Bookmarks,
    href: '/bookmarks'
  }
]

const BottomNavigationBar = () => {
  const [currentPath, setCurrentPath] = useState('')

  const { handleScroll, navRef } = useScrollHandler()

  useNavTooltipHandler()

  const handlePathChange = () => {
    // hide the tooltip when the page is loaded
    const tip = document.querySelector<HTMLDivElement>('.tip')
    tip?.style.setProperty('--show', '0')
  }

  useEffect(() => {
    setCurrentPath(window.location.pathname)

    document.addEventListener('astro:page-load', handlePathChange)
    window.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('astro:page-load', handlePathChange)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <nav
        ref={navRef}
        onPointerMove={() => {
          // remove the css variable which force tooltip to be hidden
          const tip = document.querySelector<HTMLDivElement>('.tip')
          tip?.style.removeProperty('--show')
        }}
        className={cn('nav', 'fixed z-10')}
        style={{ bottom: '32px' }}
      >
        <Dock direction='middle'>
          {bottomNavigationItems.map(({ name, icon: Icon, href }) => (
            <DockIcon
              key={name}
              {...{ href, onClick: () => setCurrentPath(href) }}
            >
              <Icon className='size-6' />
              {currentPath === href && (
                <div className='absolute bottom-2 size-1 rounded-full bg-emerald-200'></div>
              )}
            </DockIcon>
          ))}
        </Dock>
      </nav>
      <div className='tip' aria-hidden='true'>
        <div className='tip__track'>
          {bottomNavigationItems.map(({ name }) => (
            <div key={name}>{name}</div>
          ))}
        </div>
      </div>
    </>
  )
}

export default BottomNavigationBar
