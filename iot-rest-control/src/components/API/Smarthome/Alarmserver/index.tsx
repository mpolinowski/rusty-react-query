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

import Server1Params from '@/components/API/Smarthome/Alarmserver/Server1'
import Server2Params from '@/components/API/Smarthome/Alarmserver/Server2'
import Server3Params from '@/components/API/Smarthome/Alarmserver/Server3'

export default function AsMenu(): JSX.Element {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">Alarmserver</Button>
      </SheetTrigger>

      <SheetContent className='overflow-y-auto min-w-max'>
          <SheetHeader className='mb-7'>
              <SheetTitle>Alarmserver</SheetTitle>
              <SheetDescription>
                  Configure your cameras Alarmserver parameters
              </SheetDescription>
          </SheetHeader>
            <Server1Params />
            <Server2Params />
            <Server3Params />
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
