import React from 'react'

import Logo from '~/assets/logo.svg?react'

export function Footer() {
  return (
    <footer className='section-padding'>
      <div className='container mx-auto'>
        <div className='flex flex-col gap-8 md:flex-row md:gap-12 lg:gap-24'>
          <Logo className='h-12 w-auto md:h-14 lg:h-16'/>
          <div className='flex flex-col gap-4 md:gap-6'>
            <div className='space-y-2'>
              <p className='text-body2 text-text-primary font-semibold'>벨류업파트너스</p>
              <p className='text-body2 text-text-secondary'>대표 박다솜 : 사업자등록번호 710-14-02117</p>
              <p className='text-body2 text-text-secondary'>경기도 덕양구 소만로 49</p>
            </div>
            <p className='text-body2 text-text-secondary'>이용약관 : 개인정보 취급방침</p>
            <p className='text-caption text-gray-400'>© 2024 VALUE UP PARTNERS. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
