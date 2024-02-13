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

import AlexaParams from '@/components/API/Smarthome/Alexa/Alexa'

export default function AsMenu(): JSX.Element {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">Alexa</Button>
      </SheetTrigger>

      <SheetContent className='overflow-y-auto min-w-max'>
          <SheetHeader className='mb-7'>
              <SheetTitle>Alexa</SheetTitle>
              <SheetDescription>
                  Configure your cameras Alexa parameters
              </SheetDescription>
          </SheetHeader>
            <AlexaParams />
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
