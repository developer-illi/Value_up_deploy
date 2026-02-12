import { data } from 'react-router'

import { prisma } from '~/lib/db.server.ts'

import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router'

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const portfolios = await prisma.portfolio.findMany({
      orderBy: { id: 'asc' },
    })

    return {
      portfolios: portfolios.map((p) => ({
        id: p.id.toString(),
        brandName: p.brand,
        managerName: p.name,
        title: p.title,
        text: p.content,
        image: p.image || '',
      })),
    }
  } catch (error: any) {
    const message = error instanceof Error ? error.message : '데이터를 불러오는데 실패했습니다.'
    return data({ error: message, portfolios: [] }, { status: 500 })
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const method = request.method

  try {
    if (method === 'POST') {
      const formData = await request.formData()
      const portfolioData = formData.get('data') as string

      if (!portfolioData) {
        return data({ error: '데이터가 없습니다.' }, { status: 400 })
      }

      const body = JSON.parse(portfolioData)

      const result = await prisma.portfolio.create({
        data: {
          brand: body.brandName,
          name: body.managerName,
          title: body.title,
          content: body.text,
          image: body.image || null,
        },
      })

      return {
        portfolio: {
          id: result.id.toString(),
          brandName: result.brand,
          managerName: result.name,
          title: result.title,
          text: result.content,
          image: result.image || '',
        },
      }
    }

    if (method === 'PUT') {
      const formData = await request.formData()
      const id = formData.get('id') as string
      const portfolioData = formData.get('data') as string

      if (!id || !portfolioData) {
        return data({ error: 'ID와 데이터가 필요합니다.' }, { status: 400 })
      }

      const portfolio = JSON.parse(portfolioData) as {
        brandName: string
        managerName: string
        title: string
        text: string
        image?: string
      }

      const result = await prisma.portfolio.update({
        where: { id: parseInt(id, 10) },
        data: {
          brand: portfolio.brandName,
          name: portfolio.managerName,
          title: portfolio.title,
          content: portfolio.text,
          image: portfolio.image || null,
        },
      })

      return {
        portfolio: {
          id: result.id.toString(),
          brandName: result.brand,
          managerName: result.name,
          title: result.title,
          text: result.content,
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

      await prisma.portfolio.delete({
        where: { id: parseInt(id, 10) },
      })

      return { success: true }
    }

    return data({ error: 'Method not allowed' }, { status: 405 })
  } catch (error: any) {
    if (error.code === 'P2025') {
      return data({ error: '포트폴리오를 찾을 수 없습니다.' }, { status: 404 })
    }
    const message = error instanceof Error ? error.message : '작업에 실패했습니다.'
    return data({ error: message }, { status: 500 })
  }
}
