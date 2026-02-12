import { useState, useEffect, useRef } from 'react'

import { useFetcher } from 'react-router'
import { toast } from 'react-toastify'

import { KakaoMap } from '~/components/kakao-map'
import { SectionTitle } from '~/components/section-title'
import { EditableSection } from '~/features/admin/components/editable-section'

import type { CompanyInfo } from '~/types/admin.type'

type CompanyInfoResponse = {
  companyInfo?: CompanyInfo
  success?: boolean
  error?: string
  message?: string
}

export function Contact() {
  const fetcher = useFetcher<CompanyInfoResponse>()
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    id: '1',
    address: '',
    phone: '',
    fax: '',
    email: '',
    latitude: null,
    longitude: null,
  })
  const [isSaving, setIsSaving] = useState(false)
  const originalDataRef = useRef<CompanyInfo | null>(null)
  const isLoadedRef = useRef(false)

  useEffect(() => {
    if (!isLoadedRef.current) {
      isLoadedRef.current = true
      fetcher.load('/api/company-info')
    }
  }, [fetcher])

  useEffect(() => {
    if (!fetcher.data) return

    if ('error' in fetcher.data && fetcher.data.error) {
      toast.error(fetcher.data.error)
      return
    }

    if ('companyInfo' in fetcher.data && fetcher.data.companyInfo) {
      const data = fetcher.data.companyInfo
      originalDataRef.current = data
      setCompanyInfo(data)
    }

    if ('success' in fetcher.data && fetcher.data.success) {
      toast.success(fetcher.data.message || '저장되었습니다.')
    }
  }, [fetcher.data])

  const handleUpdate = (field: keyof CompanyInfo, value: string | number | null) => {
    setCompanyInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handleCancel = () => {
    if (originalDataRef.current) {
      setCompanyInfo(originalDataRef.current)
    }
    toast.info('변경사항이 취소되었습니다.')
  }

  const handleSave = async () => {
    setIsSaving(true)

    try {
      const formData = new FormData()
      formData.append(
        'data',
        JSON.stringify({
          address: companyInfo.address,
          phone: companyInfo.phone,
          fax: companyInfo.fax,
          email: companyInfo.email,
          latitude: companyInfo.latitude,
          longitude: companyInfo.longitude,
        }),
      )

      fetcher.submit(formData, {
        method: 'PUT',
        action: '/api/company-info',
      })

      originalDataRef.current = companyInfo
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '저장에 실패했습니다.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section id='contact' className='bg-gray-50 px-4 py-12 sm:px-8 sm:py-16 md:px-12 lg:px-20 lg:py-20'>
      <div className='container mx-auto'>
        <SectionTitle title='벨류업파트너스 본사' className='mb-6 md:mb-8' />
        <div className='grid grid-cols-1 gap-6 md:gap-8'>
          <div>
            <EditableSection onSave={handleSave} onCancel={handleCancel} disabled={isSaving} className='mb-6 flex-col gap-6 md:mb-8 md:flex-row md:gap-8 lg:gap-12'>
              <div className='w-full flex-1 space-y-3 md:space-y-4'>
                <div className='flex flex-col gap-1 sm:flex-row sm:items-center'>
                  <p className='text-text-primary w-12 shrink-0 font-semibold'>Add:</p>
                  <input
                    type='text'
                    value={companyInfo.address}
                    onChange={(e) => handleUpdate('address', e.target.value)}
                    className='border-primary text-md text-text-primary w-full border border-dashed px-1 py-0.5 font-medium focus:outline-none'
                    placeholder='주소'
                  />
                </div>
                <div className='flex flex-col gap-1 sm:flex-row sm:items-center'>
                  <p className='text-text-primary w-12 shrink-0 font-semibold'>Tel:</p>
                  <input
                    type='text'
                    value={companyInfo.phone}
                    onChange={(e) => handleUpdate('phone', e.target.value)}
                    className='border-primary text-md text-text-primary w-full border border-dashed px-1 py-0.5 font-medium focus:outline-none'
                    placeholder='전화번호'
                  />
                </div>
                <div className='flex flex-col gap-1 sm:flex-row sm:items-center'>
                  <p className='text-text-primary w-12 shrink-0 font-semibold'>Fax:</p>
                  <input
                    type='text'
                    value={companyInfo.fax}
                    onChange={(e) => handleUpdate('fax', e.target.value)}
                    className='border-primary text-md text-text-primary w-full border border-dashed px-1 py-0.5 font-medium focus:outline-none'
                    placeholder='팩스번호'
                  />
                </div>
                <div className='flex flex-col gap-1 sm:flex-row sm:items-center'>
                  <p className='text-text-primary w-12 shrink-0 font-semibold'>Mail:</p>
                  <input
                    type='text'
                    value={companyInfo.email}
                    onChange={(e) => handleUpdate('email', e.target.value)}
                    className='border-primary text-md text-text-primary w-full border border-dashed px-1 py-0.5 font-medium focus:outline-none'
                    placeholder='이메일'
                  />
                </div>
                <div className='flex flex-col gap-1 sm:flex-row sm:items-center'>
                  <p className='text-text-primary w-12 shrink-0 font-semibold'>Lat:</p>
                  <input
                    type='number'
                    step='any'
                    value={companyInfo.latitude ?? ''}
                    onChange={(e) => handleUpdate('latitude', e.target.value ? parseFloat(e.target.value) : null)}
                    className='border-primary text-md text-text-primary w-full border border-dashed px-1 py-0.5 font-medium focus:outline-none'
                    placeholder='위도'
                  />
                </div>
                <div className='flex flex-col gap-1 sm:flex-row sm:items-center'>
                  <p className='text-text-primary w-12 shrink-0 font-semibold'>Lng:</p>
                  <input
                    type='number'
                    step='any'
                    value={companyInfo.longitude ?? ''}
                    onChange={(e) => handleUpdate('longitude', e.target.value ? parseFloat(e.target.value) : null)}
                    className='border-primary text-md text-text-primary w-full border border-dashed px-1 py-0.5 font-medium focus:outline-none'
                    placeholder='경도'
                  />
                </div>
              </div>
            </EditableSection>
          </div>
          <div className='flex h-60 items-center justify-center overflow-hidden rounded-lg sm:h-72 md:h-80'>
            <KakaoMap lat={companyInfo.latitude ?? 37.5451422412538} lng={companyInfo.longitude ?? 127.057127702049} />
          </div>
        </div>
      </div>
    </section>
  )
}
