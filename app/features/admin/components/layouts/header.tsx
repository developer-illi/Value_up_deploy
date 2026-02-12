import { Form } from 'react-router'

import Arrow from '~/assets/icons/arrow-top-right.svg?react'
import Menu from '~/assets/icons/menu.svg?react'

interface HeaderProps {
  onMenuToggle: () => void
}

export function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header className='bg-accent text-white'>
      <div className='flex items-center justify-between px-4 py-4 sm:px-6 sm:py-6'>
        <div className='flex items-center gap-4'>
          <button onClick={onMenuToggle} className='hover:text-primary p-1 lg:hidden'>
            <Menu className='h-6 w-6' />
          </button>

          <div className='text-sm flex gap-4 sm:gap-6 sm:text-base'>
            <a className='hover:text-primary cursor-pointer'>Edit</a>
            <p className='hidden sm:block'>|</p>
            <a href='/' className='group hover:text-primary hidden sm:inline'>
              V-up.kr&nbsp;&nbsp;
              <Arrow className='group-hover:fill-primary inline-block h-4 w-4 fill-white align-text-bottom' />
            </a>
          </div>
        </div>

        <Form method='DELETE' action='/api/auth'>
          <button type='submit' className='text-sm hover:text-primary sm:text-base'>
            Logout
          </button>
        </Form>
      </div>
    </header>
  )
}
