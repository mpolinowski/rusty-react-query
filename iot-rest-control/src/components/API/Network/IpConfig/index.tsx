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

import IpConfigFetchParams from '@/components/API/Network/IpConfig/IpConfig'
import LanMacFetchParams from '@/components/API/Network/IpConfig/LanMac'
import WlanMacFetchParams from '@/components/API/Network/IpConfig/WlanMac'

export default function MqttMenu(): JSX.Element {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">Network</Button>
      </SheetTrigger>

      <SheetContent className='overflow-y-auto min-w-max'>
            <SheetHeader className='mb-7'>
                <SheetTitle>Network</SheetTitle>
                <SheetDescription>
                    Configure your cameras Network parameters
                </SheetDescription>
            </SheetHeader>
            <IpConfigFetchParams />
            <LanMacFetchParams />
            <WlanMacFetchParams />
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
