
import Number1 from '~/assets/icons/number-1.svg?react'
import Number2 from '~/assets/icons/number-2.svg?react'
import Number3 from '~/assets/icons/number-3.svg?react'

import type {
  AdminServiceStep,
  AdminServiceDetail,
  AdminPortfolioItem,
  AdminProjectItem,
  AdminPartner,
  AdminTeamMember,
  AdminHeroSection,
  AdminCTASection,
  AdminContactInfo,
  AdminSidebarItem,
} from '~/types/admin.type'

export const adminSidebarItems: AdminSidebarItem[] = [
  { id: '1', label: 'V-up 소개', active: true },
  { id: '2', label: '포트폴리오', active: false },
  { id: '3', label: '고객센터', active: false },
]

export const adminHeroSection: AdminHeroSection = {
  title: 'VALUE UP PARTNERS',
  subtitle: '날개를 달아주는 기업 컨설팅\n당신의 투자 유치를 응원합니다.',
  emailPlaceholder: 'Enter Your Email',
  buttonText: 'Subscribe',
  disclaimer: 'No spam, notifications only about new products, updates and freebies.\nYou can always unsubscribe.',
  name: '박다솜',
  nameDescription: '벨류업파트너스 대표이사',
  email: 'pds2225@naver.com',
}

export const adminServiceSteps: AdminServiceStep[] = [
  {
    id: '1',
    icon: Number1,
    title: 'IR Deck 제작',
  },
  {
    id: '2',
    icon: Number2,
    title: '투자자 연결',
  },
  {
    id: '3',
    icon: Number3,
    title: '사업계획서\n컨설팅',
  },
]

export const adminServiceDetails: AdminServiceDetail[] = [
  {
    id: '1',
    title: 'IR Deck 제작',
    subtitle: '투자유치를 위한 IR Deck 제작',
    description:
      '투자자들에게 효과적으로 전달할 수 있는 전문적인 IR Deck을 제작합니다. 비즈니스 모델, 시장 분석, 재무 계획 등을 명확하고 설득력 있게 정리하여 투자 유치 성공률을 높입니다.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
  },
  {
    id: '2',
    title: '투자자 연결',
    subtitle: '투자자 연결 및 매칭 기회 제공 (AC, VC)',
    description:
      '엔젤 클럽(AC)과 벤처 캐피탈(VC) 등 다양한 투자자 네트워크를 활용하여 적합한 투자자를 매칭합니다. IR 기회를 제공하여 직접적인 투자 유치 기회를 만들어드립니다.',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600',
  },
  {
    id: '3',
    title: '사업계획서 컨설팅',
    subtitle: '사업계획서 작성 컨설팅',
    description:
      '전문 컨설턴트가 직접 참여하여 체계적이고 완성도 높은 사업계획서를 작성합니다. 시장 분석, 경쟁력 분석, 재무 모델링 등 투자자들이 요구하는 모든 요소를 포함합니다.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600',
  },
]

export const adminPortfolioItems: AdminPortfolioItem[] = [
  {
    id: '1',
    brandName: 'P&E KOREA',
    managerName: '홍길동',
    title: '성공적인 투자 유치 사례',
    text: 'IR Deck 제작 및 투자자 매칭을 통해 시리즈 A 투자 유치에 성공했습니다.',
    image: 'https://via.placeholder.com/100?text=P&E',
  },
  {
    id: '2',
    brandName: 'KB국민은행',
    managerName: '김철수',
    title: '전략적 파트너십 구축',
    text: '금융 서비스 혁신 프로젝트와 디지털 전환 컨설팅을 통해 장기 파트너십을 체결했습니다.',
    image: 'https://via.placeholder.com/100?text=KB',
  },
  {
    id: '3',
    brandName: '엠에이치에스',
    managerName: '이영희',
    title: '헬스케어 스타트업 성장 지원',
    text: '사업계획서 작성 지원과 헬스케어 전문 투자자 연결을 통해 정부 지원 사업 수주에 성공했습니다.',
    image: 'https://via.placeholder.com/100?text=MHS',
  },
  {
    id: '4',
    brandName: 'CAFE 29',
    managerName: '박민수',
    title: 'F&B 스타트업 투자 유치',
    text: '프랜차이즈 확장 전략 수립과 투자자 네트워크 연결을 통해 시리즈 B 투자 유치에 성공했습니다.',
    image: 'https://via.placeholder.com/100?text=C29',
  },
]

export const adminProjectItems: AdminProjectItem[] = [
  {
    id: '1',
    title: 'Untitled',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400',
    tag: 'NFT',
    type: 'NFT',
    link: '',
  },
  {
    id: '2',
    title: 'Untitled',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
    tag: 'NFT',
    type: 'NFT',
    link: '',
  },
  {
    id: '3',
    title: 'Untitled',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400',
    tag: 'NFT',
    type: 'NFT',
    link: '',
  },
  {
    id: '4',
    title: 'Untitled',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400',
    tag: 'NFT',
    type: 'NFT',
    link: '',
  },
  {
    id: '5',
    title: 'Untitled',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400',
    tag: 'NFT',
    type: 'NFT',
    link: '',
  },
  {
    id: '6',
    title: 'Untitled',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400',
    tag: 'NFT',
    type: 'NFT',
    link: '',
  },
  {
    id: '7',
    title: 'Untitled',
    image: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400',
    tag: 'NFT',
    type: 'NFT',
    link: '',
  },
  {
    id: '8',
    title: 'Untitled',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400',
    tag: 'NFT',
    type: 'NFT',
    link: '',
  },
]

export const adminPartners: AdminPartner[] = [
  { id: '1', name: 'S Caltex', logo: 'https://via.placeholder.com/150?text=SC', url: 'https://example.com' },
  { id: '2', name: 'Uber', logo: 'https://via.placeholder.com/150?text=Uber', url: 'https://example.com' },
  { id: '3', name: 'Yujin', logo: 'https://via.placeholder.com/150?text=Yujin', url: 'https://example.com' },
  { id: '4', name: '2HAE', logo: 'https://via.placeholder.com/150?text=2HAE', url: 'https://example.com' },
  { id: '5', name: 'EM emtake', logo: 'https://via.placeholder.com/150?text=EM', url: 'https://example.com' },
  { id: '6', name: 'UM PLUS', logo: 'https://via.placeholder.com/150?text=UM', url: 'https://example.com' },
]

export const adminTeamMember: AdminTeamMember = {
  id: '1',
  name: '박다솜',
  nameEn: 'Park Da-som',
  position: '대표',
  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
  description: [
    '10년 이상의 기업 컨설팅 경력',
    '다수의 스타트업 투자 유치 성공 사례',
    'IR 및 사업계획서 작성 전문가',
    '벤처 캐피탈 및 엔젤 투자자 네트워크 보유',
  ],
}

export const adminCTASection: AdminCTASection = {
  title: '날개를 달아주는 기업컨설팅\nVALUE UP PARTNERS',
  subtitle: 'VALUE UP PARTNERS',
  description: '수많은 스타트업과 함께 성장해온 벨류업 파트너스가 당신의 성공을 응원합니다.',
}

export const adminContactInfo: AdminContactInfo = {
  address: '서울시 성동구 성수이로 113, 2층',
  phone: '010-7933-6590',
  fax: '02-2250-0000',
  email: 'job2250@naver.com',
}
