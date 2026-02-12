import { useLoaderData } from 'react-router'

import { Contact, Hero, Intro, Outro, Partners, Portfolio, Project } from '~/features/main/components/sections'
import { prisma } from '~/lib/db.server'

import type { LoaderFunctionArgs, MetaFunction } from 'react-router'

export const meta: MetaFunction = () => {
  return [{ title: 'Value Up Partners' }, { name: 'description', content: 'VALUE UP PARTNERS - 날개를 달아주는 기업 컨설팅' }]
}

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const [informations, portfolios, projects, partners, partnerCeo, companyInfo, outroMessage] = await Promise.all([
      prisma.information.findMany({ orderBy: { id: 'asc' }, take: 3 }),
      prisma.portfolio.findMany({ orderBy: { id: 'asc' } }),
      prisma.project.findMany({ orderBy: { id: 'asc' } }),
      prisma.partner.findMany({ orderBy: { id: 'asc' } }),
      prisma.partnerCeo.findUnique({ where: { id: 1 } }),
      prisma.companyInfo.findUnique({ where: { id: 1 } }),
      prisma.outroMessage.findUnique({ where: { id: 1 } }),
    ])

    const informationItems = informations.map((info) => ({
      id: info.id.toString(),
      title: info.title,
      description: info.content,
      image: info.image || '',
    }))

    const portfolioItems = portfolios.map((p) => ({
      id: p.id.toString(),
      logo: p.image || '',
      companyName: p.brand,
      name: p.name,
      title: p.title,
      items: p.content.split('\n').filter((line) => line.trim() !== ''),
    }))

    const projectItems = projects.map((p) => ({
      id: p.id.toString(),
      title: p.title,
      image: p.image || '',
      tag: p.type || undefined,
      link: p.link || '#',
    }))

    const partnerItems = partners.map((p) => ({
      id: p.id.toString(),
      name: p.name,
      logo: p.logo,
    }))

    const teamMember = partnerCeo
      ? {
          id: partnerCeo.id.toString(),
          name: partnerCeo.name,
          nameEn: partnerCeo.englishName,
          position: partnerCeo.position,
          image: partnerCeo.image || '',
          description: partnerCeo.description.split('\n').filter((line) => line.trim() !== ''),
        }
      : null

    const contactInfo = companyInfo
      ? {
          address: companyInfo.address,
          phone: companyInfo.phone,
          fax: companyInfo.fax || '',
          email: companyInfo.mail,
          latitude: companyInfo.latitude ? Number(companyInfo.latitude) : null,
          longitude: companyInfo.longitude ? Number(companyInfo.longitude) : null,
        }
      : null

    const outroData = outroMessage
      ? {
          title: outroMessage.title,
          subtitle: outroMessage.subtitle,
        }
      : null

    return {
      informationItems,
      portfolioItems,
      projectItems,
      partnerItems,
      teamMember,
      contactInfo,
      outroData,
    }
  } catch (error: any) {
    return {
      informationItems: [],
      portfolioItems: [],
      projectItems: [],
      partnerItems: [],
      teamMember: null,
      contactInfo: null,
      outroData: null,
    }
  }
}

export default function Page() {
  const { informationItems, portfolioItems, projectItems, partnerItems, teamMember, contactInfo, outroData } = useLoaderData<typeof loader>()

  return (
    <>
      <Hero />
      <Intro data={informationItems} />

      <Portfolio data={portfolioItems} />
      <Project projects={projectItems} />
      <Partners partners={partnerItems} teamMember={teamMember} />

      <Outro data={outroData} />
      <Contact data={contactInfo} />
    </>
  )
}
