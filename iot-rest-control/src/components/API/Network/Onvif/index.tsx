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

import OnvifFetchParams from '@/components/API/Network/Onvif/Onvif'

export default function MqttMenu(): JSX.Element {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">ONVIF</Button>
      </SheetTrigger>

      <SheetContent className='overflow-y-auto min-w-max'>
          <SheetHeader className='mb-7'>
              <SheetTitle>ONVIF</SheetTitle>
              <SheetDescription>
                  Configure your cameras ONVIF parameters
              </SheetDescription>
          </SheetHeader>
          <OnvifFetchParams />
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
