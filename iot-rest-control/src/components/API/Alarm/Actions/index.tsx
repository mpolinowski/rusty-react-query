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

import ActionsFetchParams from '@/components/API/Alarm/Actions/Actions'
import AudioAlarmAttrFetchParams from '@/components/API/Alarm/Actions/AudioAlarmAttr'
import AudioPirAttrFetchParams from '@/components/API/Alarm/Actions/PirAttr'
import AudioPirModeFetchParams from '@/components/API/Alarm/Actions/PirMode'
import AudioInputAttrFetchParams from '@/components/API/Alarm/Actions/InputAttr'
import AudioRelayAttrFetchParams from '@/components/API/Alarm/Actions/RelayAttr'
import AudioAlarmRecAttrFetchParams from '@/components/API/Alarm/Actions/AlarmRecAttr'
import RecStatusFetchParams from '@/components/API/Alarm/Actions/RecStatus'
import AlarmSnapAttrFetchParams from '@/components/API/Alarm/Actions/AlarmSnapAttr'

export default function MqttMenu(): JSX.Element {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">Alarm Actions</Button>
      </SheetTrigger>
      <SheetContent className='overflow-y-auto min-w-max'>
            <SheetHeader className='mb-7'>
                <SheetTitle>Actions</SheetTitle>
                <SheetDescription>
                    Configure your cameras Alarm Actions parameters
                </SheetDescription>
            </SheetHeader>
            <ActionsFetchParams />
            <AudioAlarmAttrFetchParams />
            <AudioPirAttrFetchParams />
            <AudioPirModeFetchParams />
            <AudioInputAttrFetchParams />
            <AudioRelayAttrFetchParams />
            <AudioAlarmRecAttrFetchParams />
            <RecStatusFetchParams />
            <AlarmSnapAttrFetchParams />
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
