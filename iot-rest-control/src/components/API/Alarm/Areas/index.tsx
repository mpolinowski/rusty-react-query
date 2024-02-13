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

import AlarmArea1Attr from '@/components/API/Alarm/Areas/AlarmArea1Attr'
import AlarmArea2Attr from '@/components/API/Alarm/Areas/AlarmArea2Attr'
import AlarmArea3Attr from '@/components/API/Alarm/Areas/AlarmArea3Attr'
import AlarmArea4Attr from '@/components/API/Alarm/Areas/AlarmArea4Attr'
import AlarmAreaTimeAttr from '@/components/API/Alarm/Areas/AlarmAreaTimeAttr'

export default function MqttMenu(): JSX.Element {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">Alarm Areas</Button>
      </SheetTrigger>
      <SheetContent className='overflow-y-auto min-w-max'>
            <SheetHeader className='mb-7'>
                <SheetTitle>Motion Detection</SheetTitle>
                <SheetDescription>
                    Configure your cameras Alarm Areas
                </SheetDescription>
            </SheetHeader>
            <AlarmArea1Attr />
            <AlarmArea2Attr />
            <AlarmArea3Attr />
            <AlarmArea4Attr />
            <AlarmAreaTimeAttr />
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
