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

import TimedReboot from '@/components/API/System/Reboot/TimedReboot'
import RebootFlag from '@/components/API/System/Reboot/RebootFlag'

export default function SystemTimeMenu(): JSX.Element {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">Reboot</Button>
      </SheetTrigger>

      <SheetContent className='overflow-y-auto min-w-max'>
          <SheetHeader className='mb-7'>
              <SheetTitle>Reboot</SheetTitle>
              <SheetDescription>
                  Configure your cameras Reboot parameters
              </SheetDescription>
          </SheetHeader>
            <TimedReboot />
            <RebootFlag />
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
