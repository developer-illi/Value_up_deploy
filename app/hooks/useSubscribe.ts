import { useState } from 'react'
import { toast } from 'react-toastify'

type SubscribeResponse = { success?: boolean; error?: string }

export function useSubscribe() {
  const [email, setEmail] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed) {
      toast.warning('이메일을 입력해주세요.')
      return
    }
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('email', trimmed)
      const res = await fetch('/api/subscribe', { method: 'POST', body: formData })
      const data: SubscribeResponse = await res.json()
      if (data.success) {
        setIsSuccess(true)
        setEmail('')
      } else if (typeof data.error === 'string') {
        toast.error(data.error)
      } else if (!res.ok) {
        toast.error('구독 처리에 실패했습니다.')
      }
    } catch {
      toast.error('구독 처리에 실패했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setIsSuccess(false)
  }

  return { email, setEmail, isSuccess, isSubmitting, handleSubmit, handleReset }
}
