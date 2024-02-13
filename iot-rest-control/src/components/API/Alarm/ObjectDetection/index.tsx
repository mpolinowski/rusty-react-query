import { Button } from "@/components/ui/button"

import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import AlarmOdAttrFetchParams from '@/components/API/Alarm/ObjectDetection/AlarmOdAttr'

import AlarmOdThreshAnimalAttr from '@/components/API/Alarm/ObjectDetection/AlarmOdThreshAnimalAttr'
import AlarmOdThreshPersonAttr from '@/components/API/Alarm/ObjectDetection/AlarmOdThreshPersonAttr'
import AlarmOdThreshVehicleAttr from '@/components/API/Alarm/ObjectDetection/AlarmOdThreshVehicleAttr'

import AlarmOdUiAnimalAttr from '@/components/API/Alarm/ObjectDetection/AlarmOdUiAnimalAttr'
import AlarmOdUiPersonAttr from '@/components/API/Alarm/ObjectDetection/AlarmOdUiPersonAttr'
import AlarmOdUiVehicleAttr from '@/components/API/Alarm/ObjectDetection/AlarmOdUiVehicleAttr'

export default function MqttMenu(): JSX.Element {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">Object Detection</Button>
      </SheetTrigger>
      <SheetContent className='overflow-y-auto min-w-max'>
            <SheetHeader className='mb-7'>
                <SheetTitle>Object Detection</SheetTitle>
                <SheetDescription>
                    Configure your cameras Alarm Actions parameters
                </SheetDescription>
            </SheetHeader>
            <AlarmOdAttrFetchParams />
            <AlarmOdThreshAnimalAttr />
            <AlarmOdThreshPersonAttr />
            <AlarmOdThreshVehicleAttr />
            <AlarmOdUiAnimalAttr />
            <AlarmOdUiPersonAttr />
            <AlarmOdUiVehicleAttr />
            <SheetFooter>
                <SheetClose asChild>
                    <Button className="mt-4 w-full" variant="outline" type="submit">
                      Close
                    </Button>
                </SheetClose>
            </SheetFooter>
        </SheetContent>
    </Sheet>
  )
}
