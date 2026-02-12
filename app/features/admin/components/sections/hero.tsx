import { adminHeroSection } from '~/data/admin.data'
import { useSubscribe } from '~/hooks'

export function Hero() {
  const { email, setEmail, isSubmitting, handleSubmit } = useSubscribe()

  return (
    <section className='container mx-auto flex flex-col gap-8 px-4 py-12 sm:px-8 sm:py-16 lg:flex-row lg:justify-between lg:px-24 lg:py-40'>
      <div className='flex flex-col gap-4'>
        <h1 className='mb-4 text-2xl font-bold text-gray-900 sm:text-3xl lg:mb-6 lg:text-5xl xl:text-6xl'>{adminHeroSection.title}</h1>
        <p className='mb-2 text-sm whitespace-pre text-gray-700 sm:text-base lg:text-lg xl:text-xl'>{adminHeroSection.subtitle}</p>

        <div className='mt-4 w-full lg:mt-8 lg:max-w-md'>
          <div className='flex flex-row gap-2'>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
              placeholder={adminHeroSection.emailPlaceholder}
              disabled={isSubmitting}
              className='min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm text-black placeholder:text-gray-600 focus:ring-2 focus:ring-blue-600 focus:outline-none disabled:opacity-50 sm:px-4 sm:py-3 sm:text-base'
            />
            <button
              type='button'
              disabled={isSubmitting}
              onClick={handleSubmit}
              className='bg-secondary hover:bg-secondary/80 shrink-0 rounded-lg px-4 py-2 text-sm text-white transition-all disabled:cursor-not-allowed disabled:opacity-50 sm:px-8 sm:py-3 sm:text-base'
            >
              {isSubmitting ? '...' : adminHeroSection.buttonText}
            </button>
          </div>
          <p className='mt-2 text-center text-xs text-gray-400'>{adminHeroSection.disclaimer}</p>
        </div>
      </div>
      <div className='self-end text-end text-black'>
        <p className='text-sm sm:text-base'>{adminHeroSection.nameDescription}</p>
        <p className='text-sm sm:text-base'>{adminHeroSection.email}</p>
        <p className='mt-4 text-lg font-semibold sm:text-xl lg:text-2xl'>{adminHeroSection.name}</p>
      </div>
    </section>
  )
}
