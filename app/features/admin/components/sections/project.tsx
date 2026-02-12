import { useState, useEffect, useRef } from 'react'

import { useFetcher } from 'react-router'
import { toast } from 'react-toastify'

import { useDialog } from '~/components/confirm-dialog'
import { ImageUpload } from '~/components/image-upload'
import { RemovableSection } from '~/components/removable-section'
import { SectionTitle } from '~/components/section-title'
import { ProjectEditForm } from '~/features/admin/components/forms/project-edit-form'
import { uploadImageFile } from '~/hooks'

import type { AdminProjectItem } from '~/types/admin.type'

type ProjectResponse = {
  projects?: AdminProjectItem[]
  project?: AdminProjectItem
  success?: boolean
  error?: string
}

type LocalProjectItem = AdminProjectItem & {
  imageFile?: File | null
  isNew?: boolean
  isDeleted?: boolean
}

export function Project() {
  const fetcher = useFetcher<ProjectResponse>()
  const dialog = useDialog()
  const [projects, setProjects] = useState<LocalProjectItem[]>([])
  const [open, setOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<LocalProjectItem | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const originalDataRef = useRef<AdminProjectItem[]>([])
  const isLoadedRef = useRef(false)

  useEffect(() => {
    if (!isLoadedRef.current) {
      isLoadedRef.current = true
      fetcher.load('/api/project')
    }
  }, [fetcher])

  useEffect(() => {
    if (!fetcher.data) return

    if ('error' in fetcher.data && fetcher.data.error) {
      toast.error(fetcher.data.error)
      return
    }

    if ('projects' in fetcher.data && fetcher.data.projects) {
      const data = fetcher.data.projects
      originalDataRef.current = data
      setProjects(data.map((p) => ({ ...p, imageFile: null, isNew: false, isDeleted: false })))
    }

    if ('success' in fetcher.data && fetcher.data.success) {
      toast.success('저장되었습니다.')
    }
  }, [fetcher.data])

  const visibleProjects = projects.filter((p) => !p.isDeleted)

  const handleDeleteProject = async (id: string) => {
    const confirmed = await dialog.confirm({
      title: '삭제 확인',
      message: '정말 삭제하시겠습니까?',
      confirmText: '삭제',
      cancelText: '취소',
    })

    if (!confirmed) return

    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, isDeleted: true } : p)))
  }

  const handleImageSelect = (id: string, file: File | null, previewUrl: string | null) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, image: previewUrl || '', imageFile: file } : p)))
  }

  const handleAddProject = () => {
    const newItem: LocalProjectItem = {
      id: `temp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      type: '',
      title: '',
      link: '',
      image: '',
      imageFile: null,
      isNew: true,
      isDeleted: false,
    }
    setEditingProject(newItem)
    setOpen(true)
  }

  const handleEditProject = (project: LocalProjectItem) => {
    setEditingProject({ ...project })
    setOpen(true)
  }

  const handleSaveProjectForm = (data: { type: string; title: string; link: string; image: string; imageFile?: File | null }) => {
    if (!editingProject) return

    if (editingProject.isNew) {
      const newProject: LocalProjectItem = {
        ...editingProject,
        type: data.type,
        title: data.title,
        link: data.link,
        image: data.image,
        imageFile: data.imageFile || null,
      }
      setProjects((prev) => [...prev, newProject])
    } else {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === editingProject.id
            ? { ...p, type: data.type, title: data.title, link: data.link, image: data.image, imageFile: data.imageFile || p.imageFile }
            : p,
        ),
      )
    }

    setOpen(false)
    setEditingProject(null)
  }

  const handleSaveAll = async () => {
    setIsSaving(true)

    try {
      const deletePromises = projects
        .filter((p) => p.isDeleted && !p.isNew)
        .map(async (item) => {
          const formData = new FormData()
          formData.append('id', item.id)
          return fetch('/api/project', { method: 'DELETE', body: formData })
        })

      const createPromises = projects
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
              type: item.type,
              title: item.title,
              link: item.link,
              image: imageUrl,
            }),
          )
          return fetch('/api/project', { method: 'POST', body: formData })
        })

      const updatePromises = projects
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
              type: item.type,
              title: item.title,
              link: item.link,
              image: imageUrl,
            }),
          )
          return fetch('/api/project', { method: 'PUT', body: formData })
        })

      await Promise.all([...deletePromises, ...createPromises, ...updatePromises])

      toast.success('저장되었습니다.')
      isLoadedRef.current = false
      fetcher.load('/api/project')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '저장에 실패했습니다.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className='px-4 py-12 sm:px-8 sm:py-16 md:p-20'>
      <div className='container mx-auto space-y-8 md:space-y-12'>
        <div className='flex items-center justify-between'>
          <SectionTitle icon title='Project' onClick={handleAddProject} />
        </div>
        <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-6'>
          {visibleProjects.map((project) => (
            <RemovableSection key={project.id} onRemove={() => handleDeleteProject(project.id)} className='flex flex-col bg-white'>
              <div
                className='relative h-24 cursor-pointer bg-gray-100 sm:h-32 md:h-40'
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleEditProject(project)
                }}
              >
                <ImageUpload
                  currentImage={project.image}
                  onFileSelect={(file, previewUrl) => handleImageSelect(project.id, file, previewUrl)}
                  className='h-full w-full object-cover'
                  clickable
                />
                <div className='absolute top-2 left-2 text-white sm:top-3 sm:left-3'>
                  <p className='w-full text-[10px] sm:text-xs'>{project.type}</p>
                  <p className='w-full text-sm font-bold sm:text-base md:text-lg'>{project.title}</p>
                </div>
              </div>
              <div className='py-1.5 sm:py-2'>
                <p className='text-primary w-full text-[10px] sm:text-xs'>{project.type}</p>
                <p className='text-text-primary w-full text-sm font-bold sm:text-base md:text-lg'>{project.title}</p>
              </div>
            </RemovableSection>
          ))}
        </div>
        <div className='flex items-center gap-2 justify-self-end'>
          <button className='text-md rounded-xl bg-gray-400 px-4 py-2 font-semibold text-white disabled:opacity-50'>Cancel</button>
          <button
            onClick={handleSaveAll}
            disabled={isSaving}
            className='text-md rounded-xl bg-black px-6 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50'
          >
            {isSaving ? '저장 중...' : 'Save'}
          </button>
        </div>
      </div>
      {open && editingProject && (
        <ProjectEditForm
          initialData={{
            type: editingProject.type,
            title: editingProject.title,
            link: editingProject.link,
            image: editingProject.image,
          }}
          onClose={() => {
            setOpen(false)
            setEditingProject(null)
          }}
          onSave={handleSaveProjectForm}
        />
      )}
    </section>
  )
}
