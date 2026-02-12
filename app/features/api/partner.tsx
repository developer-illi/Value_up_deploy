import { data } from 'react-router'

import { prisma } from '~/lib/db.server.ts'

import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router'

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const partners = await prisma.partner.findMany({
      orderBy: { id: 'asc' },
    })

    return {
      partners: partners.map((p) => ({
        id: p.id.toString(),
        name: p.name,
        logo: p.logo,
        url: p.url || '',
      })),
    }
  } catch (error: any) {
    const message = error instanceof Error ? error.message : '데이터를 불러오는데 실패했습니다.'
    return data({ error: message, partners: [] }, { status: 500 })
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const method = request.method

  try {
    if (method === 'POST') {
      const formData = await request.formData()
      const partnerData = formData.get('data') as string

      if (!partnerData) {
        return data({ error: '데이터가 없습니다.' }, { status: 400 })
      }

      const body = JSON.parse(partnerData)

      const result = await prisma.partner.create({
        data: {
          name: body.name || '',
          logo: body.logo || '',
          url: body.url || null,
        },
      })

      return {
        partner: {
          id: result.id.toString(),
          name: result.name,
          logo: result.logo,
          url: result.url || '',
        },
      }
    }

    if (method === 'PUT') {
      const formData = await request.formData()
      const id = formData.get('id') as string
      const partnerData = formData.get('data') as string

      if (!id || !partnerData) {
        return data({ error: 'ID와 데이터가 필요합니다.' }, { status: 400 })
      }

      const partner = JSON.parse(partnerData) as {
        name: string
        logo: string
        url?: string
      }

      const result = await prisma.partner.update({
        where: { id: parseInt(id, 10) },
        data: {
          name: partner.name,
          logo: partner.logo,
          url: partner.url || null,
        },
      })

      return {
        partner: {
          id: result.id.toString(),
          name: result.name,
          logo: result.logo,
          url: result.url || '',
        },
      }
    }

    if (method === 'DELETE') {
      const formData = await request.formData()
      const id = formData.get('id') as string

      if (!id) {
        return data({ error: 'ID가 필요합니다.' }, { status: 400 })
      }

      await prisma.partner.delete({
        where: { id: parseInt(id, 10) },
      })

      return { success: true }
    }

    return data({ error: 'Method not allowed' }, { status: 405 })
  } catch (error: any) {
    if (error.code === 'P2025') {
      return data({ error: '파트너를 찾을 수 없습니다.' }, { status: 404 })
    }
    const message = error instanceof Error ? error.message : '작업에 실패했습니다.'
    return data({ error: message }, { status: 500 })
  }
}
