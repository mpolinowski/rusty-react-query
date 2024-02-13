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

import SdParams from '@/components/API/Features/SD/Sd'
import SdInfoParams from '@/components/API/Features/SD/SdInfo'
import SdActionRec from '@/components/API/Features/SD/SdActionRec'
import SdActionSnap from '@/components/API/Features/SD/SdActionSnap'
import SdActionTimeSnap from '@/components/API/Features/SD/SdActionTimeSnap'
import SdActionAttr from '@/components/API/Features/SD/SdActionAttr'

export default function MqttMenu(): JSX.Element {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">SD Card</Button>
      </SheetTrigger>
        <SheetContent className='overflow-y-auto min-w-max'>
            <SheetHeader className='mb-7'>
                <SheetTitle>SD Card Settings</SheetTitle>
                <SheetDescription>
                    Configure your cameras SD Card parameters
                </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <SdParams />
              <SdInfoParams />
              <SdActionRec />
              <SdActionSnap />
              <SdActionTimeSnap />
              <SdActionAttr />
            </div>
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
