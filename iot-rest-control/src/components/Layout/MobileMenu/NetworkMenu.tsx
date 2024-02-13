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
  
import IpConfigMenu from '@/components/API/Network/IpConfig'
import OnvifMenu from '@/components/API/Network/Onvif'
import DdnsMenu from '@/components/API/Network/DDNS'
import P2pMenu from '@/components/API/Network/P2p'
import WifiMenu from '@/components/API/Network/Wifi'

export function NetworkMenu() {

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost">Network</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Network Menu</DrawerTitle>
            <DrawerDescription>Configure your cameras network parameters.</DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col items-center">
            <IpConfigMenu />
            <OnvifMenu />
            <DdnsMenu />
            <P2pMenu />
            <WifiMenu />
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
