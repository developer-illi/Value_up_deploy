import { useState } from 'react'
import { Outlet } from 'react-router'

import { FloatingMenu } from '~/components/floating-menu.tsx'
import { Sidebar, Header } from '~/features/admin/components/layouts'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className='relative flex h-screen overflow-hidden'>
      {sidebarOpen && <div className='fixed inset-0 z-30 bg-black/50 lg:hidden' onClick={() => setSidebarOpen(false)} />}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <FloatingMenu main />

      <div className='flex flex-1 flex-col overflow-hidden'>
        <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className='flex-1 overflow-y-auto'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
