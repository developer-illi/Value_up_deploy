import { useEffect, useState } from 'react'

import Logo from '~/assets/logo.svg?react'

export function Header() {
  const [activeSection, setActiveSection] = useState<string>('about')

  useEffect(() => {
    const sections = ['about', 'portfolio', 'contact']
    const observers: IntersectionObserver[] = []

    const checkInitialSection = () => {
      const scrollPosition = window.scrollY
      const headerHeight = 80

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (!element) continue

        const rect = element.getBoundingClientRect()
        const elementTop = rect.top + scrollPosition
        const elementBottom = elementTop + rect.height

        if (scrollPosition + headerHeight >= elementTop && scrollPosition + headerHeight < elementBottom) {
          setActiveSection(sectionId)
          break
        }
      }
    }

    checkInitialSection()

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(sectionId)
            }
          })
        },
        {
          rootMargin: '-100px 0px -60% 0px',
        },
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  const getNavClassName = (sectionId: string) => {
    const baseClass = 'text-body2 text-text-secondary hover:text-primary transition-colors whitespace-nowrap'
    const activeClass = activeSection === sectionId ? 'text-primary! font-semibold!' : ''
    return `${baseClass} ${activeClass}`
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className='sticky top-0 z-50 bg-white'>
      <div className='container-padding flex items-center justify-between px-0 py-3 md:py-4 xl:container xl:mx-auto'>
        <Logo className='h-10 w-auto md:h-12 lg:h-14' />
        <nav className='flex gap-4 md:gap-6'>
          <a href='#about' onClick={(e) => handleNavClick(e, 'about')} className={getNavClassName('about')}>
            V-up 소개
          </a>
          <a href='#portfolio' onClick={(e) => handleNavClick(e, 'portfolio')} className={getNavClassName('portfolio')}>
            포트폴리오
          </a>
          <a href='#contact' onClick={(e) => handleNavClick(e, 'contact')} className={getNavClassName('contact')}>
            고객센터
          </a>
        </nav>
      </div>
    </header>
  )
}
