import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import AudioMenu from '@/components/API/Multimedia/Audio'
import VideoMenu from '@/components/API/Multimedia/Video'
import ImageMenu from '@/components/API/Multimedia/Image'
import OverlayMenu from '@/components/API/Multimedia/Overlay'
import PrivacyMenu from '@/components/API/Multimedia/Privacy'

export function MultimediaMenu() {

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost">Multimedia</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Multimedia Menu</DrawerTitle>
            <DrawerDescription>Configure your cameras multimedia parameters.</DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col items-center">
            <AudioMenu />
            <VideoMenu />
            <ImageMenu />
            <OverlayMenu />
            <PrivacyMenu />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
