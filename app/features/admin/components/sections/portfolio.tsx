import { useState, useEffect, useRef } from 'react'

import { useFetcher } from 'react-router'
import { toast } from 'react-toastify'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import MagnifyingGlass from '~/assets/icons/magnifying-glass.svg?react'
import { useDialog } from '~/components/confirm-dialog'
import { ImageUpload } from '~/components/image-upload'
import { RemovableSection } from '~/components/removable-section'
import { SectionTitle } from '~/components/section-title'
import { EditableSection } from '~/features/admin/components/editable-section'
import { uploadImageFile } from '~/hooks'

import type { Swiper as SwiperType } from 'swiper'
import type { AdminPortfolioItem } from '~/types/admin.type'

type PortfolioResponse = {
  portfolios?: AdminPortfolioItem[]
  portfolio?: AdminPortfolioItem
  success?: boolean
  error?: string
}

type LocalPortfolioItem = AdminPortfolioItem & {
  imageFile?: File | null
  isNew?: boolean
  isDeleted?: boolean
}

export function Portfolio() {
  const fetcher = useFetcher<PortfolioResponse>()
  const dialog = useDialog()
  const [portfolios, setPortfolios] = useState<LocalPortfolioItem[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const originalDataRef = useRef<AdminPortfolioItem[]>([])
  const isLoadedRef = useRef(false)
  const swiperRef = useRef<SwiperType | null>(null)

  useEffect(() => {
    if (!isLoadedRef.current) {
      isLoadedRef.current = true
      fetcher.load('/api/portfolio')
    }
  }, [fetcher])

  useEffect(() => {
    if (!fetcher.data) return

    if ('error' in fetcher.data && fetcher.data.error) {
      toast.error(fetcher.data.error)
      return
    }

    if ('portfolios' in fetcher.data && fetcher.data.portfolios) {
      const data = fetcher.data.portfolios
      originalDataRef.current = data
      setPortfolios(data.map((p) => ({ ...p, imageFile: null, isNew: false, isDeleted: false })))
    }

    if ('success' in fetcher.data && fetcher.data.success) {
      toast.success('저장되었습니다.')
    }
  }, [fetcher.data])

  const visiblePortfolios = portfolios.filter((p) => !p.isDeleted)

  const handleUpdatePortfolio = (id: string, field: keyof AdminPortfolioItem, value: string) => {
    setPortfolios((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)))
  }

  const handleImageSelect = (id: string, file: File | null, previewUrl: string | null) => {
    setPortfolios((prev) => prev.map((p) => (p.id === id ? { ...p, image: previewUrl || '', imageFile: file } : p)))
  }

  const handleDeletePortfolio = async (id: string) => {
    const confirmed = await dialog.confirm({
      title: '삭제 확인',
      message: '정말 삭제하시겠습니까?',
      confirmText: '삭제',
      cancelText: '취소',
    })

    if (!confirmed) return

    setPortfolios((prev) => prev.map((p) => (p.id === id ? { ...p, isDeleted: true } : p)))
  }

  const handleAddPortfolio = () => {
    const newItem: LocalPortfolioItem = {
      id: `temp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      brandName: '',
      managerName: '',
      title: '',
      text: '',
      image: '',
      imageFile: null,
      isNew: true,
      isDeleted: false,
    }
    setPortfolios((prev) => [...prev, newItem])

    setTimeout(() => {
      if (swiperRef.current) {
        swiperRef.current.slideTo(swiperRef.current.slides.length - 1)
      }
    }, 0)
  }

  const handleCancel = () => {
    setPortfolios(originalDataRef.current.map((p) => ({ ...p, imageFile: null, isNew: false, isDeleted: false })))
    toast.info('변경사항이 취소되었습니다.')
  }

  const handleSave = async () => {
    setIsSaving(true)

    try {
      const deletePromises = portfolios
        .filter((p) => p.isDeleted && !p.isNew)
        .map(async (item) => {
          const formData = new FormData()
          formData.append('id', item.id)
          return fetch('/api/portfolio', { method: 'DELETE', body: formData })
        })

      const createPromises = portfolios
        .filter((p) => p.isNew && !p.isDeleted)
        .map(async (item) => {
          let imageUrl = item.image
          if (item.imageFile) {
            imageUrl = await uploadImageFile(item.imageFile)
          }

          const formData = new FormData()
          formData.append(
            'data',
            JSON.stringify({
              brandName: item.brandName,
              managerName: item.managerName,
              title: item.title,
              text: item.text,
              image: imageUrl,
            }),
          )
          return fetch('/api/portfolio', { method: 'POST', body: formData })
        })

      const updatePromises = portfolios
        .filter((p) => !p.isNew && !p.isDeleted)
        .map(async (item) => {
          let imageUrl = item.image
          if (item.imageFile) {
            imageUrl = await uploadImageFile(item.imageFile)
          }

          const formData = new FormData()
          formData.append('id', item.id)
          formData.append(
            'data',
            JSON.stringify({
              brandName: item.brandName,
              managerName: item.managerName,
              title: item.title,
              text: item.text,
              image: imageUrl,
            }),
          )
          return fetch('/api/portfolio', { method: 'PUT', body: formData })
        })

      await Promise.all([...deletePromises, ...createPromises, ...updatePromises])

      toast.success('저장되었습니다.')
      isLoadedRef.current = false
      fetcher.load('/api/portfolio')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '저장에 실패했습니다.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section id='portfolio' className='px-4 py-12 sm:px-8 sm:py-16 md:p-20'>
      <div className='container mx-auto'>
        <EditableSection onCancel={handleCancel} onSave={handleSave} disabled={isSaving}>
          <div className='mb-8 text-start md:mb-12'>
            <div className='mb-0 flex items-center justify-center gap-2 sm:gap-4'>
              <h2 className='text-2xl font-bold text-black sm:text-3xl md:text-4xl lg:text-5xl'>Portfolio</h2>
              <MagnifyingGlass className='h-auto w-16 sm:w-24 md:w-32' />
            </div>
            <SectionTitle icon title='V-up Partners 성공사례' subtitle='더 많은 사례는 상담시 보여드립니다.' onClick={handleAddPortfolio} />
          </div>
          {visiblePortfolios.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination]}
              slidesPerView={1}
              slidesPerGroup={1}
              spaceBetween={32}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                420: { slidesPerView: 1 },
                768: { slidesPerView: 1 },
                1280: { slidesPerView: 2, spaceBetween: 24 },
                1420: { slidesPerView: 3, spaceBetween: 32 },
              }}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              className='portfolio-swiper'
              style={{ width: '100%', padding: '3rem 2.5rem' }}
            >
              {visiblePortfolios.map((item) => (
                <SwiperSlide key={item.id} style={{ height: 'auto' }}>
                  <RemovableSection
                    onRemove={() => handleDeletePortfolio(item.id)}
                    className='mx-auto flex h-full w-full max-w-80 flex-col gap-6 rounded-2xl bg-white py-6 shadow sm:gap-8 sm:rounded-3xl sm:py-8'
                  >
                    <div className='flex flex-col items-center gap-3 px-4 sm:flex-row sm:gap-4 sm:px-8'>
                      <div className='group/logo relative flex h-20 w-20 shrink-0 items-center justify-center sm:h-24 sm:w-24'>
                        <ImageUpload
                          currentImage={item.image}
                          onFileSelect={(file, previewUrl) => handleImageSelect(item.id, file, previewUrl)}
                          buttonText='로고 변경'
                          className='flex h-20 w-20 items-center justify-center bg-white sm:h-24 sm:w-24'
                          imageClassName='w-20 sm:w-24 h-auto object-contain'
                          clickable
                        />
                      </div>
                      <div className='w-full flex-1 space-y-2'>
                        <input
                          type='text'
                          value={item.brandName}
                          onChange={(e) => handleUpdatePortfolio(item.id, 'brandName', e.target.value)}
                          className='border-primary w-full border border-dashed px-2 py-1 text-sm text-black focus:outline-none sm:text-base'
                          placeholder='회사명'
                        />
                        <input
                          type='text'
                          value={item.managerName}
                          onChange={(e) => handleUpdatePortfolio(item.id, 'managerName', e.target.value)}
                          className='border-primary w-full border border-dashed px-2 py-1 text-sm font-bold text-black focus:outline-none sm:text-base'
                          placeholder='이름'
                        />
                      </div>
                    </div>
                    <div className='flex flex-1 flex-col items-center px-4 text-center sm:px-8'>
                      <input
                        type='text'
                        value={item.title}
                        onChange={(e) => handleUpdatePortfolio(item.id, 'title', e.target.value)}
                        className='bg-primary/20 text-primary border-primary w-full border border-dashed px-2 py-1 text-center text-base font-bold focus:outline-none sm:text-lg'
                        placeholder='제목'
                      />
                      <div className='my-3 h-px w-full bg-gray-300 sm:my-4' />
                      <textarea
                        value={item.text}
                        onChange={(e) => handleUpdatePortfolio(item.id, 'text', e.target.value)}
                        className='text-text-primary border-primary h-full max-h-40 w-full flex-1 resize-none border border-dashed px-2 py-1 text-left text-sm leading-relaxed focus:outline-none sm:max-h-48 sm:text-base'
                        rows={6}
                        placeholder='내용'
                      />
                    </div>
                  </RemovableSection>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className='flex min-h-64 items-center justify-center text-gray-400'>포트폴리오를 추가해주세요</div>
          )}
        </EditableSection>
      </div>
    </section>
  )
}
