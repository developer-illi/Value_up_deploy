import { data } from 'react-router'

import { prisma } from '~/lib/db.server.ts'

import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router'

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { id: 'asc' },
    })

    return {
      projects: projects.map((p) => ({
        id: p.id.toString(),
        type: p.type,
        title: p.title,
        link: p.link || '',
        image: p.image || '',
      })),
    }
  } catch (error: any) {
    const message = error instanceof Error ? error.message : '데이터를 불러오는데 실패했습니다.'
    return data({ error: message, projects: [] }, { status: 500 })
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const method = request.method

  try {
    if (method === 'POST') {
      const formData = await request.formData()
      const projectData = formData.get('data') as string

      if (!projectData) {
        return data({ error: '데이터가 없습니다.' }, { status: 400 })
      }

      const body = JSON.parse(projectData)

      const result = await prisma.project.create({
        data: {
          type: body.type || '',
          title: body.title || '',
          link: body.link || null,
          image: body.image || null,
        },
      })

      return {
        project: {
          id: result.id.toString(),
          type: result.type,
          title: result.title,
          link: result.link || '',
          image: result.image || '',
        },
      }
    }

    if (method === 'PUT') {
      const formData = await request.formData()
      const id = formData.get('id') as string
      const projectData = formData.get('data') as string

      if (!id || !projectData) {
        return data({ error: 'ID와 데이터가 필요합니다.' }, { status: 400 })
      }

      const project = JSON.parse(projectData) as {
        type: string
        title: string
        link?: string
        image?: string
      }

      const result = await prisma.project.update({
        where: { id: parseInt(id, 10) },
        data: {
          type: project.type,
          title: project.title,
          link: project.link || null,
          image: project.image || null,
        },
      })

      return {
        project: {
          id: result.id.toString(),
          type: result.type,
          title: result.title,
          link: result.link || '',
          image: result.image || '',
        },
      }
    }

    if (method === 'DELETE') {
      const formData = await request.formData()
      const id = formData.get('id') as string

      if (!id) {
        return data({ error: 'ID가 필요합니다.' }, { status: 400 })
      }

      await prisma.project.delete({
        where: { id: parseInt(id, 10) },
      })

      return { success: true }
    }

    return data({ error: 'Method not allowed' }, { status: 405 })
  } catch (error: any) {
    if (error.code === 'P2025') {
      return data({ error: '프로젝트를 찾을 수 없습니다.' }, { status: 404 })
    }
    const message = error instanceof Error ? error.message : '작업에 실패했습니다.'
    return data({ error: message }, { status: 500 })
  }
}
