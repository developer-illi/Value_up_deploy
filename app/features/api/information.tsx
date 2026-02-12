import { data } from 'react-router'

import { prisma } from '~/lib/db.server.ts'

import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router'

const DEFAULT_INFORMATION = [
  {
    title: '',
    content: '',
    image: '',
  },
  {
    title: '',
    content: '',
    image: '',
  },
  {
    title: '',
    content: '',
    image: '',
  },
]

async function ensureThreeRecords() {
  const count = await prisma.information.count()

  if (count < 3) {
    const existing = await prisma.information.findMany({ orderBy: { id: 'asc' } })
    const toCreate = DEFAULT_INFORMATION.slice(count)

    for (const item of toCreate) {
      await prisma.information.create({ data: item })
    }
  }
}

export async function loader({}: LoaderFunctionArgs) {
  try {
    await ensureThreeRecords()

    const informations = await prisma.information.findMany({
      orderBy: { id: 'asc' },
      take: 3,
    })

    return {
      informations: informations.map((info) => ({
        id: info.id,
        title: info.title,
        content: info.content,
        image: info.image,
      })),
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : '데이터를 불러오는데 실패했습니다.'
    return data({ error: message, informations: [] }, { status: 500 })
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const method = request.method

  try {
    if (method === 'PUT') {
      const formData = await request.formData()
      const id = formData.get('id') as string
      const infoData = formData.get('data') as string

      if (!id || !infoData) {
        return data({ error: 'ID와 데이터가 필요합니다.' }, { status: 400 })
      }

      const body = JSON.parse(infoData) as {
        title: string
        content: string
        image?: string | null
      }

      const result = await prisma.information.update({
        where: { id: parseInt(id, 10) },
        data: {
          title: body.title,
          content: body.content,
          image: body.image || null,
        },
      })

      return {
        success: true,
        message: '저장되었습니다.',
        information: {
          id: result.id,
          title: result.title,
          content: result.content,
          image: result.image,
        },
      }
    }

    return data({ error: 'Method not allowed' }, { status: 405 })
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2025') {
      return data({ error: '정보를 찾을 수 없습니다.' }, { status: 404 })
    }
    const message = error instanceof Error ? error.message : '저장에 실패했습니다.'
    return data({ error: message }, { status: 500 })
  }
}
