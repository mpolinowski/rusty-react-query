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

import AlarmScheduleExMs from '@/components/API/Alarm/Schedule/AlarmScheduleExMs'
import AlarmScheduleExMd from '@/components/API/Alarm/Schedule/AlarmScheduleExMd'
import AlarmScheduleExIo from '@/components/API/Alarm/Schedule/AlarmScheduleExIo'
import AlarmScheduleExAudio from '@/components/API/Alarm/Schedule/AlarmScheduleExAudio'
import AlarmScheduleExPir from '@/components/API/Alarm/Schedule/AlarmScheduleExPir'
import AlarmScheduleExSnap from '@/components/API/Alarm/Schedule/AlarmScheduleExSnap'

import AlarmCustomScheduleExMs from '@/components/API/Alarm/Schedule/AlarmCustomScheduleExMs'
import AlarmCustomScheduleExMd from '@/components/API/Alarm/Schedule/AlarmCustomScheduleExMd'
import AlarmCustomScheduleExIo from '@/components/API/Alarm/Schedule/AlarmCustomScheduleExIo'
import AlarmCustomScheduleExAudio from '@/components/API/Alarm/Schedule/AlarmCustomScheduleExAudio'
import AlarmCustomScheduleExPir from '@/components/API/Alarm/Schedule/AlarmCustomScheduleExPir'
import AlarmCustomScheduleExSnap from '@/components/API/Alarm/Schedule/AlarmCustomScheduleExSnap'

export default function MqttMenu(): JSX.Element {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">Alarm Schedule</Button>
      </SheetTrigger>
      <SheetContent className='overflow-y-auto min-w-max'>
            <SheetHeader className='mb-7'>
                <SheetTitle>Alarm Schedule</SheetTitle>
                <SheetDescription>
                    Configure your cameras Alarm Schedule parameters
                </SheetDescription>
            </SheetHeader>
            <AlarmScheduleExMs />
            <AlarmScheduleExMd />
            <AlarmScheduleExIo />
            <AlarmScheduleExAudio />
            <AlarmScheduleExPir />
            <AlarmScheduleExSnap />
            <AlarmCustomScheduleExMs />
            <AlarmCustomScheduleExMd />
            <AlarmCustomScheduleExIo />
            <AlarmCustomScheduleExAudio />
            <AlarmCustomScheduleExPir />
            <AlarmCustomScheduleExSnap />
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
