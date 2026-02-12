import { adminServiceSteps } from '~/data/admin.data'

export function PreIntro() {
  return (
    <section
      id='about'
      className='bg-muted-background flex flex-col items-center gap-6 px-4 pt-12 pb-10 sm:gap-8 sm:px-8 sm:pt-16 sm:pb-12 2xl:flex-row 2xl:justify-between 2xl:px-24 2xl:pt-40 2xl:pb-20'
    >
      <h2 className='text-center text-base font-bold text-black sm:text-lg xl:text-xl 2xl:pb-16 2xl:text-start 2xl:text-2xl'>
        벨류업 파트너스는 3단계의 전략으로
        <br />
        스타트업 기업에 투자유치를 성공시킵니다.
      </h2>
      <div className='mt-8 grid grid-cols-3 gap-3 sm:mt-8 sm:gap-12 md:mt-10 lg:mt-12 xl:mt-16 2xl:mt-0 2xl:gap-8'>
        {adminServiceSteps.map((step) => (
          <div key={step.id} className='flex flex-col items-center'>
            <div className='relative'>
              <step.icon className='absolute bottom-7/12 left-1/2 h-auto w-20 -translate-x-1/2 sm:w-24 md:w-28 xl:w-32 2xl:bottom-5/12 2xl:w-48' />
              <div className='flex h-12 w-20 items-center justify-center rounded-xl bg-white px-4 py-2 sm:h-16 sm:w-24 sm:rounded-2xl sm:py-3 md:h-18 md:w-28 xl:h-20 xl:w-32 2xl:h-24 2xl:w-40 2xl:rounded-3xl 2xl:py-4'>
                <p className='lg:text-md text-center text-[11px] font-semibold whitespace-pre text-black sm:text-xs md:text-sm xl:text-sm 2xl:text-xl'>
                  {step.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
