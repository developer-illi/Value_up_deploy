'use client'

import { useEffect, useState, type ReactNode } from 'react'

import { AnimatePresence, motion } from 'motion/react'

interface ModalDialogProps {
  children: ReactNode
  isOpen?: boolean
  onClose?: () => void
}

export function ModalDialog({ children, isOpen = true, onClose }: ModalDialogProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed inset-0 z-50 flex items-center justify-center p-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div className='absolute inset-0 bg-black/50' onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />

          <motion.div
            role='dialog'
            aria-modal='true'
            className='relative z-10 mx-auto w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-2xl sm:max-w-xl md:max-w-2xl lg:max-w-3xl'
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
