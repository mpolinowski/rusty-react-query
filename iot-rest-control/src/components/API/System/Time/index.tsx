import { Button } from "@/components/ui/button"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet"

import ServerTimeParams from '@/components/API/System/Time/ServerTime'
import HwClockParams from '@/components/API/System/Time/HwClock'

export default function SystemTimeMenu(): JSX.Element {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">Date & Time</Button>
      </SheetTrigger>

      <SheetContent className='overflow-y-auto min-w-max'>
          <SheetHeader className='mb-7'>
              <SheetTitle>Date & Time</SheetTitle>
              <SheetDescription>
                  Configure your cameras Date & Time parameters
              </SheetDescription>
          </SheetHeader>
            <ServerTimeParams />
            <HwClockParams />
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
