import { motion } from 'motion/react'

type OutroProps = {
  data: { title: string; subtitle: string } | null
}

export function Outro({ data }: OutroProps) {
  return (
    <section className='bg-primary section-padding flex min-h-[70vh] items-center justify-center text-white'>
      <div className='container mx-auto max-w-4xl text-center'>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className='text-subtitle md:text-title lg:text-header mb-8 leading-relaxed font-bold whitespace-pre-wrap md:mb-12'
        >
          {data?.title || 'Title'}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className='text-body md:text-subtitle lg:text-title leading-relaxed whitespace-pre-wrap'
        >
          {data?.subtitle || 'VALUE UP PARTNERS'}
        </motion.p>
      </div>
    </section>
  )
}
