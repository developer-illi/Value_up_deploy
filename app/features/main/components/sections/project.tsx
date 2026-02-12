import { motion } from 'motion/react'

import type { ProjectItem } from '~/types/main.type'

type ProjectProps = {
  projects: ProjectItem[]
}

export function Project({ projects }: ProjectProps) {
  if (projects.length === 0) return null

  return (
    <section className='section-padding'>
      <div className='container mx-auto'>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className='text-title text-text-primary mb-8 md:mb-12'
        >
          Project
        </motion.h2>
        <div className='grid auto-rows-fr grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6'>
          {projects.map((project, index) => (
            <motion.a
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              href={project.link}
              target='_blank'
              className='flex flex-col overflow-hidden bg-white'
            >
              <div className='group relative min-h-37.5 grow cursor-pointer overflow-hidden md:min-h-50 lg:min-h-62.5'>
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className='h-full w-full object-cover'
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className='absolute inset-0 flex flex-col items-center justify-center bg-black/60 p-3 text-center md:p-4'
                >
                  <p className='text-caption mb-1 font-semibold text-white'>{project.tag || 'Untitled'}</p>
                  <p className='text-body font-bold text-white'>{project.title}</p>
                </motion.div>
              </div>
              <div className='py-3 md:py-4'>
                <p className='text-caption text-primary mb-1'>{project.tag || 'Untitled'}</p>
                <p className='text-body2 text-text-primary font-semibold'>{project.title}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
