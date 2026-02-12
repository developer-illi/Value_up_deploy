import { useState, useEffect } from 'react'

import Close from '~/assets/icons/close.svg?react'
import { adminSidebarItems } from '~/data/admin.data'

const sectionIdMap: Record<string, string> = {
  '1': 'about',
  '2': 'portfolio',
  '3': 'contact',
}

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [activeSidebarItem, setActiveSidebarItem] = useState('1')

  useEffect(() => {
    const sections = ['about', 'portfolio', 'contact']
    const observers: IntersectionObserver[] = []

    const findScrollContainer = (): Element | null => {
      const sidebar = document.querySelector('aside')
      if (!sidebar) return null

      let parent = sidebar.parentElement
      while (parent) {
        const style = window.getComputedStyle(parent)
        if (style.overflowY === 'auto' || style.overflowY === 'scroll' || style.overflow === 'auto' || style.overflow === 'scroll') {
          return parent
        }
        parent = parent.parentElement
      }
      return null
    }

    const scrollContainer = findScrollContainer()
    const isCustomScroll = scrollContainer !== null

    const checkInitialSection = () => {
      const scrollPosition = isCustomScroll ? (scrollContainer as Element).scrollTop : window.scrollY
      const headerHeight = 100

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (!element) continue

        const rect = element.getBoundingClientRect()
        const containerRect = isCustomScroll ? (scrollContainer as Element).getBoundingClientRect() : { top: 0 }

        const elementTop = rect.top - containerRect.top + scrollPosition
        const elementBottom = elementTop + rect.height

        if (scrollPosition + headerHeight >= elementTop && scrollPosition + headerHeight < elementBottom) {
          const sidebarItemId = Object.keys(sectionIdMap).find((key) => sectionIdMap[key] === sectionId)
          if (sidebarItemId) {
            setActiveSidebarItem(sidebarItemId)
          }
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
              const sidebarItemId = Object.keys(sectionIdMap).find((key) => sectionIdMap[key] === sectionId)
              if (sidebarItemId) {
                setActiveSidebarItem(sidebarItemId)
              }
            }
          })
        },
        {
          root: scrollContainer,
          rootMargin: '-100px 0px -60% 0px',
        },
      )

      observer.observe(element)
      observers.push(observer)
    })

    const handleScroll = () => {
      checkInitialSection()
    }

    const scrollTarget = isCustomScroll ? scrollContainer : window
    scrollTarget.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observers.forEach((observer) => observer.disconnect())
      scrollTarget.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleClick = (itemId: string) => {
    const sectionId = sectionIdMap[itemId]
    if (sectionId) {
      const element = document.getElementById(sectionId)
      if (element) {
        const sidebar = document.querySelector('aside')
        let scrollContainer: Element | null = null

        if (sidebar) {
          let parent = sidebar.parentElement
          while (parent) {
            const style = window.getComputedStyle(parent)
            if (style.overflowY === 'auto' || style.overflowY === 'scroll' || style.overflow === 'auto' || style.overflow === 'scroll') {
              scrollContainer = parent
              break
            }
            parent = parent.parentElement
          }
        }

        if (scrollContainer) {
          const containerRect = scrollContainer.getBoundingClientRect()
          const elementRect = element.getBoundingClientRect()
          const scrollTop = (scrollContainer as Element).scrollTop
          const targetScrollTop = scrollTop + elementRect.top - containerRect.top - 100

          scrollContainer.scrollTo({
            top: targetScrollTop,
            behavior: 'smooth',
          })
        } else {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    }
  }

  const handleItemClick = (itemId: string) => {
    handleClick(itemId)
    onClose()
  }

  return (
    <aside
      className={`bg-accent fixed inset-y-0 left-0 z-40 flex w-64 flex-col text-white transition-transform duration-300 lg:relative lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className='flex items-center justify-end p-4 lg:hidden'>
        <button onClick={onClose} className='rounded-full bg-black/20 p-2 transition-colors hover:bg-black/40'>
          <Close className='h-4 w-4 text-white' />
        </button>
      </div>

      <nav className='mt-8 flex-1 lg:mt-40'>
        <ul className='space-y-2'>
          {adminSidebarItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleItemClick(item.id)}
                className={`w-full p-3 text-center transition-colors ${
                  activeSidebarItem === item.id ? 'text-primary bg-[#4F5160]' : 'text-gray-300 hover:bg-[#4F5160]'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
