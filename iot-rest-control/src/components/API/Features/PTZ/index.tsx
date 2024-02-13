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

import PtzParams from '@/components/API/Features/PTZ/Ptz'
import PtzTourParams from '@/components/API/Features/PTZ/PtzTour'
import PtzStateParams from '@/components/API/Features/PTZ/PtzState'
import PtzTimedPresets from '@/components/API/Features/PTZ/PtzTimedPresets'

export default function MqttMenu(): JSX.Element {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">PTZ</Button>
      </SheetTrigger>
        <SheetContent className='overflow-y-auto min-w-max'>
            <SheetHeader className='mb-7'>
                <SheetTitle>PTZ Settings</SheetTitle>
                <SheetDescription>
                    Configure your cameras Pan, Tilt & Zoom parameters
                </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <PtzParams />
              <PtzTourParams />
              <PtzStateParams />
              <PtzTimedPresets />
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
