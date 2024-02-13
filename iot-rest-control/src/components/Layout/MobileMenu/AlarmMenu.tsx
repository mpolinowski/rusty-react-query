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

import ActionsMenu from '@/components/API/Alarm/Actions'
import AreasMenu from '@/components/API/Alarm/Areas'
import ObjectDetectionMenu from '@/components/API/Alarm/ObjectDetection'
import PushMenu from '@/components/API/Alarm/Push'
import ScheduleMenu from '@/components/API/Alarm/Schedule'

export function AlarmMenu() {

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost">Alarm</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Alarm Menu</DrawerTitle>
            <DrawerDescription>Configure your cameras alarm parameters.</DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col items-center">
            <ActionsMenu />
            <AreasMenu />
            <ObjectDetectionMenu />
            <PushMenu />
            <ScheduleMenu />
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
