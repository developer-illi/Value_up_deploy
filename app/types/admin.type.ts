import type { SVGProps } from 'react'

export type AdminServiceStep = {
  id: string
  icon: React.FC<SVGProps<SVGSVGElement>>
  title: string
}

export type AdminServiceDetail = {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
}

export type AdminPortfolioItem = {
  id: string
  brandName: string
  managerName: string
  title: string
  text: string
  image: string
}

export type AdminProjectItem = {
  id: string
  title: string
  image: string
  tag?: string
  type: string
  link: string
}

export type AdminPartner = {
  id: string
  name: string
  logo: string
  url: string
}

export type AdminTeamMember = {
  id: string
  name: string
  nameEn: string
  position: string
  image: string
  description: string[]
}

export type AdminHeroSection = {
  title: string
  subtitle: string
  emailPlaceholder: string
  buttonText: string
  disclaimer: string
  name: string
  nameDescription: string
  email: string
}

export type AdminCTASection = {
  title: string
  subtitle: string
  description: string
}

export type AdminContactInfo = {
  address: string
  phone: string
  fax: string
  email: string
}

export type AdminSidebarItem = {
  id: string
  label: string
  active?: boolean
}

export type OutroMessage = {
  id: string
  title: string
  subtitle: string
}

export type CompanyInfo = {
  id: string
  address: string
  phone: string
  fax: string
  email: string
  latitude: number | null
  longitude: number | null
}

export type Information = {
  id: number
  title: string
  content: string
  image: string | null
}
