import { useState, useEffect, useRef } from 'react'

import { useFetcher } from 'react-router'
import { toast } from 'react-toastify'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { useDialog } from '~/components/confirm-dialog'
import { ImageUpload } from '~/components/image-upload'
import { RemovableSection } from '~/components/removable-section'
import { SectionTitle } from '~/components/section-title'
import { EditableSection } from '~/features/admin/components/editable-section'
import { PartnerEditForm } from '~/features/admin/components/forms/partner-edit-form'
import { uploadImageFile } from '~/hooks'

import type { AdminPartner, AdminTeamMember } from '~/types/admin.type'

type PartnerResponse = {
  partners?: AdminPartner[]
  partner?: AdminPartner
  success?: boolean
  error?: string
}

type PartnerCeoResponse = {
  partnerCeo?: AdminTeamMember
  success?: boolean
  error?: string
}

type LocalPartner = AdminPartner & {
  logoFile?: File | null
  isNew?: boolean
  isDeleted?: boolean
}

type LocalTeamMember = AdminTeamMember & {
  imageFile?: File | null
}

export function Partners() {
  const fetcher = useFetcher<PartnerResponse>()
  const partnerCeoFetcher = useFetcher<PartnerCeoResponse>()
  const dialog = useDialog()

  const [partners, setPartners] = useState<LocalPartner[]>([])
  const [open, setOpen] = useState(false)
  const [isSavingPartners, setIsSavingPartners] = useState(false)

  const [teamMember, setTeamMember] = useState<LocalTeamMember>({
    id: '1',
    name: '',
    nameEn: '',
    position: '',
    image: '',
    description: [],
    imageFile: null,
  })
  const [isSavingTeamMember, setIsSavingTeamMember] = useState(false)

  const originalPartnersRef = useRef<AdminPartner[]>([])
  const originalTeamMemberRef = useRef<AdminTeamMember | null>(null)
  const isLoadedRef = useRef(false)

  useEffect(() => {
    if (!isLoadedRef.current) {
      isLoadedRef.current = true
      fetcher.load('/api/partner')
      partnerCeoFetcher.load('/api/partner-ceo')
    }
  }, [fetcher, partnerCeoFetcher])

  useEffect(() => {
    if (!fetcher.data) return

    if ('error' in fetcher.data && fetcher.data.error) {
      toast.error(fetcher.data.error)
      return
    }

    if ('partners' in fetcher.data && fetcher.data.partners) {
      const data = fetcher.data.partners
      originalPartnersRef.current = data
      setPartners(data.map((p) => ({ ...p, logoFile: null, isNew: false, isDeleted: false })))
    }

    if ('success' in fetcher.data && fetcher.data.success) {
      toast.success('파트너 정보가 저장되었습니다.')
    }
  }, [fetcher.data])

  useEffect(() => {
    if (!partnerCeoFetcher.data) return

    if ('error' in partnerCeoFetcher.data && partnerCeoFetcher.data.error) {
      toast.error(partnerCeoFetcher.data.error)
      return
    }

    if ('partnerCeo' in partnerCeoFetcher.data && partnerCeoFetcher.data.partnerCeo) {
      const data = partnerCeoFetcher.data.partnerCeo
      originalTeamMemberRef.current = data
      setTeamMember({ ...data, imageFile: null })
    }

    if ('success' in partnerCeoFetcher.data && partnerCeoFetcher.data.success) {
      toast.success('팀 멤버 정보가 저장되었습니다.')
    }
  }, [partnerCeoFetcher.data])

  const visiblePartners = partners.filter((p) => !p.isDeleted)

  const partnerPairs: [LocalPartner | null, LocalPartner | null][] = []
  for (let i = 0; i < visiblePartners.length; i += 2) {
    partnerPairs.push([visiblePartners[i] || null, visiblePartners[i + 1] || null])
  }

  const handleUpdatePartner = (id: string, logoUrl: string | null, logoFile: File | null) => {
    setPartners((prev) => prev.map((p) => (p.id === id ? { ...p, logo: logoUrl || '', logoFile } : p)))
  }

  const handleDeletePartner = async (id: string) => {
    const confirmed = await dialog.confirm({
      title: '삭제 확인',
      message: '정말 삭제하시겠습니까?',
      confirmText: '삭제',
      cancelText: '취소',
    })

    if (!confirmed) return

    setPartners((prev) => prev.map((p) => (p.id === id ? { ...p, isDeleted: true } : p)))
  }

  const handleAddPartner = () => {
    setOpen(true)
  }

  const handleSavePartnerForm = (data: { logo: string; logoFile: File | null }[]) => {
    const newPartners: LocalPartner[] = data.map((item) => ({
      id: `temp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      name: '',
      logo: item.logo,
      url: '',
      logoFile: item.logoFile,
      isNew: true,
      isDeleted: false,
    }))

    setPartners((prev) => [...prev, ...newPartners])
    setOpen(false)
  }

  const handleCancelPartners = () => {
    setPartners(originalPartnersRef.current.map((p) => ({ ...p, logoFile: null, isNew: false, isDeleted: false })))
    toast.info('변경사항이 취소되었습니다.')
  }

  const handleSavePartners = async () => {
    setIsSavingPartners(true)

    try {
      const deletedItems = partners.filter((p) => p.isDeleted && !p.isNew)
      for (const item of deletedItems) {
        const formData = new FormData()
        formData.append('id', item.id)
        fetcher.submit(formData, { method: 'DELETE', action: '/api/partner' })
      }

      const newItems = partners.filter((p) => p.isNew && !p.isDeleted)
      for (const item of newItems) {
        let logoUrl = item.logo
        if (item.logoFile) {
          logoUrl = await uploadImageFile(item.logoFile)
        }

        const formData = new FormData()
        formData.append('data', JSON.stringify({ logo: logoUrl }))
        fetcher.submit(formData, { method: 'POST', action: '/api/partner' })
      }

      const existingItems = partners.filter((p) => !p.isNew && !p.isDeleted)
      for (const item of existingItems) {
        let logoUrl = item.logo
        if (item.logoFile) {
          logoUrl = await uploadImageFile(item.logoFile)
        }

        const formData = new FormData()
        formData.append('id', item.id)
        formData.append('data', JSON.stringify({ logo: logoUrl }))
        fetcher.submit(formData, { method: 'PUT', action: '/api/partner' })
      }

      setTimeout(() => {
        isLoadedRef.current = false
        fetcher.load('/api/partner')
      }, 500)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '저장에 실패했습니다.')
    } finally {
      setIsSavingPartners(false)
    }
  }

  const handleUpdateTeamMember = (field: keyof AdminTeamMember, value: string | string[]) => {
    setTeamMember((prev) => ({ ...prev, [field]: value }))
  }

  const handleTeamMemberImageSelect = (file: File | null, previewUrl: string | null) => {
    setTeamMember((prev) => ({ ...prev, image: previewUrl || '', imageFile: file }))
  }

  const handleUpdateTeamMemberDescription = (value: string) => {
    const description = value.split('\n').filter((line) => line.trim() !== '')
    handleUpdateTeamMember('description', description)
  }

  const handleCancelTeamMember = () => {
    if (originalTeamMemberRef.current) {
      setTeamMember({ ...originalTeamMemberRef.current, imageFile: null })
    }
    toast.info('변경사항이 취소되었습니다.')
  }

  const handleSaveTeamMember = async () => {
    setIsSavingTeamMember(true)

    try {
      let imageUrl = teamMember.image
      if (teamMember.imageFile) {
        imageUrl = await uploadImageFile(teamMember.imageFile)
      }

      const formData = new FormData()
      formData.append(
        'data',
        JSON.stringify({
          position: teamMember.position,
          name: teamMember.name,
          nameEn: teamMember.nameEn,
          description: Array.isArray(teamMember.description) ? teamMember.description : [],
          image: imageUrl,
        }),
      )

      partnerCeoFetcher.submit(formData, {
        method: 'PUT',
        action: '/api/partner-ceo',
      })

      originalTeamMemberRef.current = { ...teamMember, image: imageUrl }
      setTeamMember((prev) => ({ ...prev, image: imageUrl, imageFile: null }))
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '저장에 실패했습니다.')
    } finally {
      setIsSavingTeamMember(false)
    }
  }

  return (
    <>
      <section className='bg-muted-background overflow-x-hidden px-4 py-12 sm:py-16 md:py-20'>
        <div className='container mx-auto'>
          <div className='mb-8 flex items-center justify-between md:mb-12'>
            <SectionTitle icon title='Partners' className='justify-self-center' onClick={handleAddPartner} />
          </div>
          <div className='partner-swiper relative'>
            <Swiper
              modules={[Navigation, Pagination]}
              slidesPerView={1}
              spaceBetween={8}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                480: { slidesPerView: 2 },
                640: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 5 },
              }}
              className='partner-swiper'
              style={{ width: '100%', padding: '1.5rem 2rem' }}
            >
              {partnerPairs.map(([top, bottom], index) => (
                <SwiperSlide key={index} className='h-auto!'>
                  <div className='flex flex-col gap-2'>
                    {top && (
                      <RemovableSection
                        onRemove={() => handleDeletePartner(top.id)}
                        className='flex h-24 w-full items-center justify-center border border-gray-200 bg-white p-4 text-black'
                      >
                        <ImageUpload
                          currentImage={top.logo}
                          onFileSelect={(file, previewUrl) => handleUpdatePartner(top.id, previewUrl, file)}
                          buttonText='로고 변경'
                          className='flex h-full w-full items-center justify-center bg-white'
                          imageClassName='w-auto h-full object-contain'
                          clickable
                        />
                      </RemovableSection>
                    )}
                    {bottom && (
                      <RemovableSection
                        onRemove={() => handleDeletePartner(bottom.id)}
                        className='flex h-24 w-full items-center justify-center border border-gray-200 bg-white p-4 text-black sm:ml-8'
                      >
                        <ImageUpload
                          currentImage={bottom.logo}
                          onFileSelect={(file, previewUrl) => handleUpdatePartner(bottom.id, previewUrl, file)}
                          buttonText='로고 변경'
                          className='flex h-full w-full items-center justify-center bg-white'
                          imageClassName='w-auto h-full object-contain'
                          clickable
                        />
                      </RemovableSection>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className='mt-6 flex flex-wrap gap-2 justify-self-end sm:mt-8'>
            <button
              onClick={handleCancelPartners}
              disabled={isSavingPartners}
              className='rounded-xl bg-gray-400 px-3 py-2 text-sm font-semibold text-white disabled:opacity-50 sm:px-4 sm:text-base'
            >
              Cancel
            </button>
            <button
              onClick={handleSavePartners}
              disabled={isSavingPartners}
              className='rounded-xl bg-black px-3 py-2 text-sm font-semibold text-white disabled:opacity-50 sm:px-4 sm:text-base'
            >
              {isSavingPartners ? '...' : 'Save'}
            </button>
          </div>
        </div>
      </section>

      <section className='container mx-auto px-4 py-12 sm:py-16 md:py-20'>
        <EditableSection onSave={handleSaveTeamMember} onCancel={handleCancelTeamMember} disabled={isSavingTeamMember}>
          <SectionTitle title='VALUE UP PARTNERS' className='mx-auto mb-8 md:mb-12' />
          <div className='mx-auto max-w-4xl'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8'>
              <div className='flex flex-col items-center gap-2 overflow-hidden'>
                <ImageUpload
                  currentImage={teamMember.image}
                  onFileSelect={handleTeamMemberImageSelect}
                  buttonText='Choose Image'
                  className='h-full w-full'
                  clickable
                />
              </div>
              <div className='flex h-full w-full flex-col gap-4'>
                <div className='w-full space-y-2 sm:w-48 md:w-40'>
                  <input
                    type='text'
                    value={teamMember.position}
                    onChange={(e) => handleUpdateTeamMember('position', e.target.value)}
                    className='border-primary text-primary w-full border border-dashed px-2 py-1 text-sm font-medium focus:outline-none'
                    placeholder='직책'
                  />
                  <input
                    type='text'
                    value={teamMember.name}
                    onChange={(e) => handleUpdateTeamMember('name', e.target.value)}
                    className='border-primary text-text-primary tracking-name w-full border border-dashed px-2 py-1 text-xl font-black focus:outline-none'
                    placeholder='이름'
                  />
                  <input
                    type='text'
                    value={teamMember.nameEn}
                    onChange={(e) => handleUpdateTeamMember('nameEn', e.target.value)}
                    className='border-primary text-md text-text-primary w-full border border-dashed px-2 py-1 font-semibold focus:outline-none'
                    placeholder='영문 이름'
                  />
                </div>
                <textarea
                  value={teamMember.description.join('\n')}
                  onChange={(e) => handleUpdateTeamMemberDescription(e.target.value)}
                  rows={6}
                  className='border-primary text-text-primary w-full flex-1 resize-none border border-dashed px-2 py-1 whitespace-pre-wrap focus:outline-none'
                  placeholder='설명'
                />
              </div>
            </div>
          </div>
        </EditableSection>
        {open && <PartnerEditForm onClose={() => setOpen(false)} onSave={handleSavePartnerForm} />}
      </section>
    </>
  )
}
