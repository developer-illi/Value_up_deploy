import React from 'react'

import { AnimatePresence, motion } from 'motion/react'

import { useSubscribe } from '~/hooks'

export function Hero() {
  const { email, setEmail, isSuccess, isSubmitting, handleSubmit, handleReset } = useSubscribe()

  return (
    <section className='relative flex min-h-[calc(100vh-64px)] flex-col items-center justify-evenly md:min-h-[calc(100vh-80px)] lg:min-h-[calc(100vh-88px)]'>
      <div className='section-padding max-w-4xl text-center'>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-header text-text-primary mb-4 md:mb-6'
        >
          VALUE UP PARTNERS
        </motion.h1>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <p className='text-subtitle text-text-secondary mb-2'>날개를 달아주는 기업 컨설팅</p>
          <p className='text-subtitle text-text-secondary mb-8 md:mb-12'>당신의 투자 유치를 응원합니다.</p>
        </motion.div>

        <div className='mx-auto w-full max-w-xl'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            layout
            className='flex flex-col items-center gap-2 sm:flex-row sm:justify-center md:gap-3'
          >
            <AnimatePresence>
              {!isSuccess && (
                <motion.input
                  key='email-input'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                  placeholder='Enter Your Email'
                  initial={{ opacity: 1, width: '100%' }}
                  exit={{ opacity: 0, width: 0, paddingLeft: 0, paddingRight: 0, marginRight: 0 }}
                  transition={{ duration: 0.3 }}
                  className='focus:ring-primary w-full flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm text-black placeholder:text-gray-600 focus:ring-2 focus:outline-none sm:w-auto md:text-base'
                />
              )}
            </AnimatePresence>
            <motion.button
              type='button'
              disabled={isSubmitting}
              onClick={handleSubmit}
              layout
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                backgroundColor: isSuccess ? '#22c55e' : undefined,
              }}
              className='bg-secondary hover:bg-secondary/80 disabled:bg-secondary/50 rounded-lg px-6 py-3 text-sm whitespace-nowrap text-white transition-colors disabled:cursor-not-allowed md:px-8 md:text-base'
            >
              <AnimatePresence mode='wait'>
                {isSubmitting ? (
                  <motion.span
                    key='loading'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='flex items-center justify-center gap-2'
                  >
                    <svg className='h-4 w-4 animate-spin' viewBox='0 0 24 24'>
                      <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' fill='none' />
                      <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z' />
                    </svg>
                    Sending...
                  </motion.span>
                ) : isSuccess ? (
                  <motion.span
                    key='success'
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleReset}
                    className='flex items-center justify-center gap-2'
                  >
                    <motion.svg className='h-5 w-5' viewBox='0 0 24 24' fill='none'>
                      <motion.path
                        stroke='currentColor'
                        strokeWidth='3'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M5 13l4 4L19 7'
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      />
                    </motion.svg>
                    Subscribed!
                  </motion.span>
                ) : (
                  <motion.span key='subscribe' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    Subscribe
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>
        <AnimatePresence mode='wait'>
          {isSuccess ? (
            <motion.div
              key='success-text'
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className='mt-4 space-y-2 px-2 text-center'
            >
              <p className='text-caption text-green-600'>신청이 완료되었습니다.</p>
            </motion.div>
          ) : (
            <motion.p
              key='default-text'
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className='text-caption mt-2 px-2 text-start text-gray-400'
            >
              No spam, notifications only about new products, updates and freebies.
              <br />
              You can always unsubscribe
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className='section-padding pt-0! text-center'
      >
        <h2 className='text-title text-text-primary mb-4'>당신의 첫 도약을 함께합니다.</h2>
        <p className='text-title text-primary'>초기 기업 성장 컨설팅</p>
      </motion.div>
    </section>
  )
}
