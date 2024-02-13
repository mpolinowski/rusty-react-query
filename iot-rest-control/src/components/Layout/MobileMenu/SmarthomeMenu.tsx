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

import MqttMenu from '@/components/API/Smarthome/Mqtt'
import AlarmserverMenu from '@/components/API/Smarthome/Alarmserver'
import IftttMenu from '@/components/API/Smarthome/Ifttt'
import HkMenu from '@/components/API/Smarthome/Hk'
import AlexaMenu from '@/components/API/Smarthome/Alexa'

export function SmarthomeMenu() {

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost">Smarthome</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Smarthome Menu</DrawerTitle>
            <DrawerDescription>Configure your cameras smarthome parameters.</DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col items-center">
            <MqttMenu />
            <AlarmserverMenu />
            <IftttMenu />
            <HkMenu />
            <AlexaMenu />
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
