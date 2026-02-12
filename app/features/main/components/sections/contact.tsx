import { motion } from 'motion/react'

import { KakaoMap } from '~/components/kakao-map'

import type { ContactInfo } from '~/types/main.type'

type ContactProps = {
  data: (ContactInfo & { latitude: number | null; longitude: number | null }) | null
}

export function Contact({ data }: ContactProps) {
  if (!data) {
    return null
  }

  const lat = data.latitude || 37.5451422412538
  const lng = data.longitude || 127.057127702049

  return (
    <section id='contact' className='section-padding'>
      <div className='container mx-auto'>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className='text-title text-text-primary mb-6 md:mb-8'
        >
          벨류업파트너스 본사
        </motion.h2>
        <div className='grid grid-cols-1 gap-6 md:gap-8 lg:gap-12'>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='space-y-3 md:space-y-4'
          >
            <p className='text-body2 text-text-secondary'>
              <span className='text-text-primary inline-block w-14 font-semibold'>Add:</span> {data.address}
            </p>
            <p className='text-body2 text-text-secondary'>
              <span className='text-text-primary inline-block w-14 font-semibold'>Tel:</span> {data.phone}
            </p>
            {data.fax && (
              <p className='text-body2 text-text-secondary'>
                <span className='text-text-primary inline-block w-14 font-semibold'>Fax:</span> {data.fax}
              </p>
            )}
            <p className='text-body2 text-text-secondary'>
              <span className='text-text-primary inline-block w-14 font-semibold'>Mail:</span> {data.email}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='flex h-64 items-center justify-center overflow-hidden md:h-80 lg:h-96'
          >
            <KakaoMap lat={lat} lng={lng} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
