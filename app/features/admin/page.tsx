import { Contact, Hero, Intro, Outro, Partners, Portfolio, PreIntro, Project } from '~/features/admin/components/sections'
import { Footer, Header } from '~/features/main/components/layouts'

import type { Route } from '../../../.react-router/types/app/+types/root'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Value Up Partners' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export default function Page() {
  return (
    <div className='bg-muted-background overflow-hidden p-6 pb-0'>
      <div className='hidden-scrollbar relative h-full overflow-y-auto bg-white'>
        <Header />
        <Hero />
        <PreIntro />
        <Intro />
        <Portfolio />
        <Project />
        <Partners />
        <Outro />
        <Contact />
        <Footer />
      </div>
    </div>
  )
}
