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

import MailMenu from '@/components/API/Features/Mail'
import FTPMenu from '@/components/API/Features/FTP'
import LightMenu from '@/components/API/Features/Light'
import PTZMenu from '@/components/API/Features/PTZ'
import SDMenu from '@/components/API/Features/SD'
import WebUI from '@/components/API/Features/WebUI'

export function FeaturesMenu() {

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost">Features</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Features Menu</DrawerTitle>
            <DrawerDescription>Configure your cameras features parameters.</DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col items-center">
            <MailMenu />
            <FTPMenu />
            <LightMenu />
            <PTZMenu />
            <SDMenu />
            <WebUI />
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
