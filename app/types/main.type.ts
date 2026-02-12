import type { SVGProps } from 'react'

export type ServiceIcon = {
  id: string
  title: string
  icon: React.FC<SVGProps<SVGSVGElement>>
}

export type ServiceDetail = {
  id: string
  title: string
  description: string
  image: string
}

export type PortfolioItem = {
  id: string
  logo: string
  companyName: string
  name: string
  title: string
  items: string[]
}

export type ProjectItem = {
  id: string
  title: string
  image: string
  tag?: string
  link: string
}

export type Partner = {
  id: string
  name: string
  logo: string
}

export type TeamMember = {
  id: string
  name: string
  nameEn: string
  position: string
  image: string
  description: string[]
}

export type ContactInfo = {
  address: string
  phone: string
  fax: string
  email: string
}
