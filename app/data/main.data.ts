
import Business from '~/assets/icons/business.svg?react'
import CalendarClock from '~/assets/icons/calendar-clock.svg?react'
import Clock from '~/assets/icons/clock.svg?react'
import DocumentCheck from '~/assets/icons/document-check.svg?react'
import MindMap from '~/assets/icons/mind-map.svg?react'

import type { ServiceIcon, ServiceDetail, PortfolioItem, ProjectItem, Partner, TeamMember, ContactInfo } from '~/types/main.type'

export const serviceIcons: ServiceIcon[] = [
  {
    id: '1',
    title: '체계적인 자료실\n클라우드',
    icon: DocumentCheck,
  },
  {
    id: '2',
    title: 'AI 비즈니스\n마인드맵',
    icon: MindMap,
  },
  {
    id: '3',
    title: '투자자 및 파트너\n비즈 매칭',
    icon: Business,
  },
  {
    id: '4',
    title: '지원/투자 프로그램\n스케줄링',
    icon: CalendarClock,
  },
  {
    id: '5',
    title: '분야 전문가\n멘토링',
    icon: Clock,
  },
]

export const serviceDetails: ServiceDetail[] = [
  {
    id: '1',
    title: 'IR Deck 제작\n투자유치를 위한 IR Deck 제작',
    description:
      '투자자가 원하는 자료를 담은 IR Deck\n\n' +
      '투자유치를 위한 IR Deck은 기업이 전달하기를 원하는 정보보다는\n' +
      '투자자가 원하는 정보를 전달하기 위해 제작이 되어야합니다.\n' +
      '내용을 더욱 효과적으로 보여주기 위해 벨류업 파트너스는 디자인 \n' +
      '작업까지 포함하여 제작해드립니다.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
  },
  {
    id: '2',
    title: '투자자 연결\n투자자 연결 및 IR 기회 제공 (AC, VC)',
    description:
      '투자 네트워크 보유로 연계 가능\n\n' +
      'IR Deck 제작에서 끝나는 것이 아닌 제작한 IR Deck을 \n' +
      '사용하여 투자자 앞에서 IR 피칭할 수 있는 기회까지 제공합니다.\n' +
      '보유중인 엑셀러레이터, 벤처캐피탈 네트워크를 활용하여 투자 \n' +
      '검토를 수행할 수 있도록 IR Deck을 전달합니다.',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600',
  },
  {
    id: '3',
    title: '사업계획서 컨설팅\n사업계획서 작성 컨설팅',
    description:
      '지원사업 선정 경험 다수 보유\n\n' +
      '아이디어 수준에서도 선정까지 가능하도록 사업을 고도화 시켜드립니다.\n' +
      '심사위원 네트워크를 통해 선정 가능성에 대한 사전 검증과 현직 \n' +
      '심사위원의 피드백을 받을 수 있습니다.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600',
  },
]

export const portfolioItems: PortfolioItem[] = [
  {
    id: '1',
    logo: 'https://placehold.co/150?text=P&P',
    companyName: '피앤피코리아',
    name: '이인수',
    title: '마케팅 목표 달성',
    items: ['사업계획서 컨설팅을 통한 정부지원사업 선정', '네트워크형 R&BD 지원사업 선정으로 연구개발비 6억 원 지원'],
  },
  {
    id: '2',
    logo: 'https://placehold.co/150?text=KD',
    companyName: 'KD덴탈',
    name: '엄태준',
    title: '마케팅 목표 달성',
    items: ['사업계획서 컨설팅을 통한 정부지원사업 선정', '소상공인진흥공단 희망리턴패키지 경영개선 지원사업 선정으로 사업비 1천만 원 지원'],
  },
  {
    id: '3',
    logo: 'https://placehold.co/150?text=PP',
    companyName: '팜베이스플러스',
    name: '황희철',
    title: '마케팅 목표 달성',
    items: ['IR 자료 작성 및 피칭 컨설팅을 통한 투자유치 준비완료', '투자자 연결로 투자자의 피드백 수령 및 투자자 네트워크 형성'],
  },
  {
    id: '4',
    logo: 'https://placehold.co/150?text=CAFE22',
    companyName: '카페22',
    name: '백진욱',
    title: '마케팅 목표 달성',
    items: ['사업계획서 컨설팅을 통한 정부지원사업', '소상공인진흥공단 희망리턴패키지 경영개선 지원사업 선정으로 사업비 1천 5백만 원'],
  },
]

export const projectItems: ProjectItem[] = [
  {
    id: '1',
    title: '이화여자대학교',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400',
    tag: 'NFT',
  },
  {
    id: '2',
    title: '이메리치프스튜디오',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
    tag: 'NFT',
  },
  {
    id: '3',
    title: '평창군',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400',
    tag: 'NFT',
  },
  {
    id: '4',
    title: '피앤케이코리아',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400',
    tag: 'NFT',
  },
  {
    id: '5',
    title: '헤이아크',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400',
    tag: 'NFT',
  },
  {
    id: '6',
    title: '시큐리티',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400',
    tag: 'NFT',
  },
  {
    id: '7',
    title: '지미션',
    image: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400',
    tag: 'NFT',
  },
  {
    id: '8',
    title: '셀럽',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400',
    tag: 'NFT',
  },
]

export const partners: Partner[] = [
  { id: '1', name: '2HAE', logo: 'https://placehold.co/150?text=2HAE' },
  {
    id: '2',
    name: 'EM emtake',
    logo: 'https://placehold.co/150?text=EM',
  },
  {
    id: '3',
    name: 'micabox',
    logo: 'https://placehold.co/150?text=micabox',
  },
  {
    id: '4',
    name: 'UM PLUS',
    logo: 'https://placehold.co/150?text=UM+PLUS',
  },
  {
    id: '5',
    name: 'Code Reach',
    logo: 'https://placehold.co/150?text=Code+Reach',
  },
  {
    id: '6',
    name: 'BASIA',
    logo: 'https://placehold.co/150?text=BASIA',
  },
  {
    id: '7',
    name: 'SOYES KIDS',
    logo: 'https://placehold.co/150?text=SOYES',
  },
  {
    id: '8',
    name: 'WHALE',
    logo: 'https://placehold.co/150?text=WHALE',
  },
]

export const teamMember: TeamMember = {
  id: '1',
  name: '박다솜',
  nameEn: 'Dasom Park',
  position: '대표이사',
  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
  description: [
    '한양대학교 경영컨설팅학과 석사과정 재학',
    '前 IPO브릿지(컨설팅 회사)',
    '前 오케이저축은행, 웰컴저축은행 기업/투자금융',
    '국가공인 경영지도사',
    '중소벤처기업부 비즈니스지원단 자문위원',
    '창업진흥원 창업 지원사업 평가위원회 위원',
    '안양산업진흥원 전문가',
    '평택산업진흥원 창업 지원사업 평가위원회 위원',
    '소상공인진흥공단 희망리턴패키지 경영개선 진단 전문가',
    '한양대학교 ERICA 창업동아리 멘토',
    '한국기술혁신학회 회원',
  ],
}

export const contactInfo: ContactInfo = {
  address: '서울시 성동구 성수이로 113, 2층',
  phone: '02-1234-5678',
  fax: '02-1234-5679',
  email: 'contact@valueuppartners.com',
}
