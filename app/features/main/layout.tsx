import { Outlet } from 'react-router'

import { FloatingMenu } from '~/components/floating-menu.tsx'
import { Header, Footer } from '~/features/main/components/layouts'

export default function Layout() {
  return (
    <div className='min-h-screen bg-white'>
      <FloatingMenu />
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
