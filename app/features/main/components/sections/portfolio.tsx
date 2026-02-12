import { useEffect, useRef } from 'react'

import { motion, useAnimationFrame, useMotionValue } from 'motion/react'

import MagnifyingGlass from '~/assets/icons/magnifying-glass.svg?react'

import type { PortfolioItem } from '~/types/main.type'

type PortfolioProps = {
  data: PortfolioItem[]
}

export function Portfolio({ data }: PortfolioProps) {
  const x = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const firstSetRef = useRef<HTMLDivElement>(null)

  useAnimationFrame((t, delta) => {
    if (!firstSetRef.current) return

    const firstSetWidth = firstSetRef.current.offsetWidth
    const speed = 0.5

    const newX = x.get() - speed * (delta / 16.67)

    if (Math.abs(newX) >= firstSetWidth) {
      x.set(0)
    } else {
      x.set(newX)
    }
  })

  useEffect(() => {
    x.set(0)
  }, [data, x])

  if (data.length === 0) return null

  return (
    <section id='portfolio' className='section-padding'>
      <div className='container mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className='mb-8 text-start md:mb-12'
        >
          <div className='flex items-center'>
            <h2 className='text-title text-text-primary'>Portfolio</h2>
            <MagnifyingGlass className='mb-1 -ml-1 h-auto w-12 md:mb-1.5 md:-ml-1 md:w-14 lg:mb-3 lg:-ml-1 lg:w-18' />
          </div>
          <h2 className='text-title text-text-primary -mt-1 mb-2 md:-mt-1.5 lg:-mt-3'>V-up Partners 성공사례</h2>
          <p className='text-body2 text-text-secondary'>더 많은 사례는 상담시 보여드립니다.</p>
        </motion.div>
        <div className='overflow-hidden py-6 md:py-12'>
          <motion.div ref={containerRef} className='flex gap-4 md:gap-6 lg:gap-8' style={{ x }}>
            <div ref={firstSetRef} className='flex shrink-0 gap-4 md:gap-6 lg:gap-8'>
              {data.map((item) => (
                <div
                  key={item.id}
                  className='relative flex w-64 shrink-0 flex-col gap-6 rounded-2xl bg-white py-12 shadow md:w-72 md:gap-8 md:rounded-3xl md:py-16 lg:w-80 lg:py-20'
                >
                  <div className='grid min-h-20 grid-cols-2 gap-3 px-4 md:min-h-25 md:gap-4 md:px-6 lg:min-h-28 lg:px-8'>
                    <img src={item.logo} alt={item.companyName} className='h-16 w-auto object-contain md:h-20 lg:h-24' />
                    <div className='space-y-1 md:space-y-2'>
                      <p className='text-body2 text-text-primary'>{item.companyName}</p>
                      <p className='text-body2 text-text-primary font-semibold'>{item.name}</p>
                    </div>
                  </div>
                  <div className='flex flex-1 flex-col items-center text-center'>
                    <h3 className='text-subtitle text-primary px-4 md:px-6'>{item.title}</h3>
                    <div className='my-4 h-px w-full bg-gray-300 md:my-6 lg:my-8'></div>
                    <ul className='w-full space-y-1 px-4 text-left md:space-y-2 md:px-6 lg:px-8'>
                      {item.items.map((listItem, listIndex) => (
                        <li key={listIndex} className='text-body2 text-text-secondary flex flex-row gap-2 leading-relaxed'>
                          <p>•</p>
                          <p>{listItem}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <div className='flex shrink-0 gap-4 md:gap-6 lg:gap-8' aria-hidden='true'>
              {data.map((item) => (
                <div
                  key={`duplicate-${item.id}`}
                  className='relative flex w-64 shrink-0 flex-col gap-6 rounded-2xl bg-white py-12 shadow md:w-72 md:gap-8 md:rounded-3xl md:py-16 lg:w-80 lg:py-20'
                >
                  <div className='grid min-h-20 grid-cols-2 gap-3 px-4 md:min-h-25 md:gap-4 md:px-6 lg:min-h-28 lg:px-8'>
                    <img src={item.logo} alt='' className='h-16 w-auto object-contain md:h-20 lg:h-24' />
                    <div className='space-y-1 md:space-y-2'>
                      <p className='text-body2 text-text-primary'>{item.companyName}</p>
                      <p className='text-body2 text-text-primary font-semibold'>{item.name}</p>
                    </div>
                  </div>
                  <div className='flex flex-1 flex-col items-center text-center'>
                    <h3 className='text-subtitle text-primary px-4 md:px-6'>{item.title}</h3>
                    <div className='my-4 h-px w-full bg-gray-300 md:my-6 lg:my-8'></div>
                    <ul className='w-full space-y-1 px-4 text-left md:space-y-2 md:px-6 lg:px-8'>
                      {item.items.map((listItem, listIndex) => (
                        <li key={listIndex} className='text-body2 text-text-secondary flex flex-row gap-2 leading-relaxed'>
                          <p>•</p>
                          <p>{listItem}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
