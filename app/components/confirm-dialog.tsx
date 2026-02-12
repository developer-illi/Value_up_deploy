'use client'

import { createContext, useContext, useState, useCallback } from 'react'

import type { ConfirmDialogOptions, DialogContextValue } from '~/types/common.type'

const DialogContext = createContext<DialogContextValue | null>(null)

export function useDialog() {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error('useDialog must be used within DialogProvider')
  }
  return context
}

type DialogState = ConfirmDialogOptions & {
  isOpen: boolean
  resolve: ((value: boolean) => void) | null
}

type DialogProviderProps = {
  children: React.ReactNode
}

export function DialogProvider({ children }: DialogProviderProps) {
  const [dialog, setDialog] = useState<DialogState>({
    isOpen: false,
    title: '',
    message: '',
    resolve: null,
  })

  const confirm = useCallback((options: ConfirmDialogOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setDialog({
        isOpen: true,
        ...options,
        resolve,
      })
    })
  }, [])

  const handleConfirm = () => {
    dialog.resolve?.(true)
    setDialog((prev) => ({ ...prev, isOpen: false, resolve: null }))
  }

  const handleCancel = () => {
    dialog.resolve?.(false)
    setDialog((prev) => ({ ...prev, isOpen: false, resolve: null }))
  }

  return (
    <DialogContext.Provider value={{ confirm }}>
      {children}
      {dialog.isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <div className='fixed inset-0 bg-black/50' onClick={handleCancel} />
          <div className='relative max-w-md min-w-80 rounded-2xl bg-white p-6 shadow-xl'>
            <h3 className='mb-2 text-lg font-bold text-gray-900'>{dialog.title}</h3>
            <p className='mb-6 whitespace-pre-wrap text-gray-600'>{dialog.message}</p>
            <div className='flex justify-end gap-3'>
              <button onClick={handleCancel} className='rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200'>
                {dialog.cancelText || '취소'}
              </button>
              <button onClick={handleConfirm} className='bg-primary hover:bg-primary/90 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors'>
                {dialog.confirmText || '확인'}
              </button>
            </div>
          </div>
        </div>
      )}
    </DialogContext.Provider>
  )
}
