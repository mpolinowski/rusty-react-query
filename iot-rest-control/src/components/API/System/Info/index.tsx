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

import ServerParams from '@/components/API/System/Info/ServerInfo'
import VendorParams from '@/components/API/System/Info/VendorInfo'
import DeviceInfo from '@/components/API/System/Info/DeviceInfo'
import FactoryMode from '@/components/API/System/Info/FactoryMode'

export default function AsMenu(): JSX.Element {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">Server Infos</Button>
      </SheetTrigger>

      <SheetContent className='overflow-y-auto min-w-max'>
          <SheetHeader className='mb-7'>
              <SheetTitle>Server Infos</SheetTitle>
              <SheetDescription>
                  Configure your cameras Server parameters
              </SheetDescription>
          </SheetHeader>
            <ServerParams />
            <VendorParams />
            <DeviceInfo />
            <FactoryMode />
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
