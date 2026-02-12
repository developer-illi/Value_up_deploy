import ChevronUp from '~/assets/icons/chevron-up.svg?react'
import Kakao from '~/assets/icons/kakao.svg?react'

const kakaoUrl = import.meta.env.VITE_KAKAO_CHANNEL

type FloatingMenuProps = {
  main?: boolean
}

export function FloatingMenu({ main = false }: FloatingMenuProps) {
  const scrollToTop = () => {
    const mainContainer = document.querySelector('main')

    if (main && mainContainer) {
      mainContainer.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className='fixed right-4 bottom-4 z-50 flex flex-col gap-3 sm:right-8 sm:bottom-6 sm:gap-4 lg:right-12 lg:bottom-8'>
      <button
        onClick={scrollToTop}
        className='bg-primary flex aspect-square h-10 w-10 flex-col items-center justify-center rounded-full text-xs text-white shadow sm:h-12 sm:w-12 sm:text-sm'
      >
        <ChevronUp className='-my-1 h-5 w-5 sm:h-6 sm:w-6' />
        TOP
      </button>
      <a
        target='_blank'
        rel='noreferrer'
        href={kakaoUrl}
        className='flex aspect-square h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#FFE812] text-white shadow sm:h-12 sm:w-12'
      >
        <Kakao className='h-7 w-7 sm:h-8 sm:w-8' />
      </a>
    </div>
  )
}
