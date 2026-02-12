import { motion } from 'motion/react'

import { serviceIcons } from '~/data/main.data'

interface InformationItem {
  id: string
  title: string
  description: string
  image: string
}

interface IntroProps {
  data: InformationItem[]
}

export function Intro({ data }: IntroProps) {
  return (
    <section id='about' className='bg-primary section-padding w-full overflow-hidden'>
      <div className='section-gap container mx-auto'>
        <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5 md:gap-8'>
          {serviceIcons.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='flex flex-col items-center'
            >
              <div className='mb-3 flex aspect-square items-center justify-center rounded-full bg-white/20 p-6 md:mb-4 md:p-8'>
                <service.icon className='h-auto w-12 md:w-16 lg:w-20' />
              </div>
              <p className='text-center text-xs font-medium whitespace-pre text-white md:text-sm lg:text-base'>{service.title}</p>
            </motion.div>
          ))}
        </div>
        <div className='flex flex-col gap-6 md:gap-8 lg:gap-12'>
          {data.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='flex min-h-75 flex-col gap-6 overflow-hidden rounded-2xl bg-white p-6 transition-shadow outline-none hover:shadow-lg md:min-h-100 md:gap-8 md:rounded-3xl md:p-8 lg:h-auto lg:flex-row lg:gap-12'
            >
              <div className='min-h-50 flex-1 overflow-hidden rounded-2xl md:min-h-75 md:rounded-3xl lg:min-h-0'>
                <img src={item.image} alt={item.title} className='h-full w-full object-cover' />
              </div>
              <div className='flex flex-1 flex-col justify-center gap-4'>
                <h3 className='text-subtitle text-text-primary whitespace-pre'>{item.title}</h3>
                <p className='text-body2 text-text-secondary leading-relaxed whitespace-pre'>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
