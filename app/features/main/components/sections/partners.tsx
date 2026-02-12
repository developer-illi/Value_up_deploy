import { motion } from 'motion/react'

import type { Partner, TeamMember } from '~/types/main.type'

type PartnersProps = {
  partners: Partner[]
  teamMember: TeamMember | null
}

export function Partners({ partners, teamMember }: PartnersProps) {
  return (
    <>
      <section className='section-padding'>
        <div className='container mx-auto'>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className='text-title text-text-primary mb-8 text-center md:mb-12'
          >
            Partners
          </motion.h2>
          <div className='space-y-2 overflow-hidden md:space-y-3'>
            <div className='animate-scroll-right flex gap-2 md:gap-3'>
              <div className='flex shrink-0 gap-2 md:gap-3'>
                {partners.map((partner) => (
                  <div
                    key={partner.id}
                    className='flex h-16 w-32 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-3 text-black transition-shadow hover:shadow-md md:h-20 md:w-40 md:p-4 lg:h-24 lg:w-48'
                  >
                    <img src={partner.logo} alt={partner.name} className='max-h-full max-w-full object-contain' />
                  </div>
                ))}
              </div>
              <div className='flex shrink-0 gap-2 md:gap-3' aria-hidden='true'>
                {partners.map((partner) => (
                  <div
                    key={`duplicate-${partner.id}`}
                    className='flex h-16 w-32 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-3 md:h-20 md:w-40 md:p-4 lg:h-24 lg:w-48'
                  >
                    <img src={partner.logo} alt='' className='max-h-full max-w-full object-contain' />
                  </div>
                ))}
              </div>
            </div>
            <div className='animate-scroll-left flex gap-2 md:gap-3'>
              <div className='flex shrink-0 gap-2 md:gap-3'>
                {partners
                  .slice()
                  .reverse()
                  .map((partner) => (
                    <div
                      key={partner.id}
                      className='flex h-16 w-32 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-3 transition-shadow hover:shadow-md md:h-20 md:w-40 md:p-4 lg:h-24 lg:w-48'
                    >
                      <img src={partner.logo} alt={partner.name} className='max-h-full max-w-full object-contain' />
                    </div>
                  ))}
              </div>
              <div className='flex shrink-0 gap-2 md:gap-3' aria-hidden='true'>
                {partners
                  .slice()
                  .reverse()
                  .map((partner) => (
                    <div
                      key={`duplicate-reverse-${partner.id}`}
                      className='flex h-16 w-32 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-3 md:h-20 md:w-40 md:p-4 lg:h-24 lg:w-48'
                    >
                      <img src={partner.logo} alt='' className='max-h-full max-w-full object-contain' />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {teamMember && (
        <section className='section-padding'>
          <div className='container mx-auto'>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className='text-title text-text-primary mb-8 text-center md:mb-12'
            >
              VALUE UP PARTNERS
            </motion.h2>
            <div className='mx-auto max-w-4xl'>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className='grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:gap-12'
              >
                <div className='aspect-[3/4] w-full overflow-hidden rounded-lg md:aspect-auto md:rounded-xl'>
                  <img src={teamMember.image} alt={teamMember.name} className='h-full w-full rounded-lg object-cover shadow-lg md:rounded-xl' />
                </div>
                <div className='flex w-full flex-col justify-center'>
                  <p className='text-body2 text-primary mb-1'>{teamMember.position}</p>
                  <h3 className='text-subtitle text-text-primary mb-1'>{teamMember.name}</h3>
                  <p className='text-body2 text-text-primary mb-4 font-semibold md:mb-6'>{teamMember.nameEn}</p>
                  <ul className='space-y-2 md:space-y-3'>
                    {teamMember.description.map((item, index) => (
                      <li key={index} className='text-body2 text-text-secondary flex items-start'>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
