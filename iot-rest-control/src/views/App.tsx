import { NavBar } from '@/components/Layout/NavBar'
import { SideMenu } from '@/components/Layout/SideMenu'
import { VideoPlayer } from '@/components/LiveVideo/Placeholder'

import '@/styles/App.css'

export default function App(): JSX.Element {
  
  return (
    <>
      <NavBar />
      <br/>
      <div className="flex flex-row gap-x-3">
        <div className="basis-58">
          <SideMenu />
        </div>
        <div className="w-full lg:basis-5/6">
          <VideoPlayer />
        </div>
      </div>
    </>
  )
}