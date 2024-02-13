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

import IrCtrlFetchParams from '@/components/API/Features/Light/IrCtrl'
import IrCtrlAttrFetchParams from '@/components/API/Features/Light/IrCtrlAttr'
import SaradcStateFetchParams from '@/components/API/Features/Light/SaradcState'
import LightModeFetchParams from '@/components/API/Features/Light/LightMode'
import StatusLedWlan from '@/components/API/Features/Light/StatusLedWlan'
import StatusLedPower from '@/components/API/Features/Light/StatusLedPower'
import PirNightMode from '@/components/API/Features/Light/PirNightMode'

export default function MqttMenu(): JSX.Element {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">LEDs</Button>
      </SheetTrigger>
        <SheetContent className='overflow-y-auto min-w-max'>
            <SheetHeader className='mb-7'>
                <SheetTitle>LED Settings</SheetTitle>
                <SheetDescription>
                    Configure your cameras LED parameters
                </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <IrCtrlFetchParams />
              <IrCtrlAttrFetchParams />
              <SaradcStateFetchParams />
              <LightModeFetchParams />
              <StatusLedWlan />
              <StatusLedPower />
              <PirNightMode />
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
