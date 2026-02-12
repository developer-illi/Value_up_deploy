import { useEffect, useRef, useCallback } from 'react'

import { useFetcher } from 'react-router'
import { toast } from 'react-toastify'

import type { FetcherResponse } from '~/types/common.type'

type UseFetcherWithToastOptions<T> = {
  onSuccess?: (data: T) => void
  onError?: (error: string) => void
  successMessage?: string
}

export function useFetcherWithToast<T extends FetcherResponse>(options: UseFetcherWithToastOptions<T> = {}) {
  const fetcher = useFetcher<T>()
  const prevDataRef = useRef<unknown>(undefined)
  const optionsRef = useRef(options)
  optionsRef.current = options

  useEffect(() => {
    const data = fetcher.data
    if (!data || data === prevDataRef.current) return
    prevDataRef.current = data

    if (typeof data === 'object' && data !== null) {
      if ('error' in data && data.error) {
        toast.error(data.error as string)
        optionsRef.current.onError?.(data.error as string)
        return
      }

      if ('success' in data && data.success) {
        const message = optionsRef.current.successMessage || (data as FetcherResponse).message || '저장되었습니다.'
        toast.success(message)
        optionsRef.current.onSuccess?.(data as T)
      }
    }
  }, [fetcher.data])

  return fetcher
}

export async function uploadImageFile(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('image', file)

  const response = await fetch('/api/upload-image', {
    method: 'POST',
    body: formData,
  })

  const result = await response.json()

  if (!response.ok || result.error) {
    throw new Error(result.error || '이미지 업로드에 실패했습니다.')
  }

  return result.imageUrl
}
