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

import ImageOverlayNameFetchParams from '@/components/API/Multimedia/Overlay/ImageOverlayName'
import ImageOverlayTsFetchParams from '@/components/API/Multimedia/Overlay/ImageOverlayTs'

export default function MqttMenu(): JSX.Element {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">Overlays</Button>
      </SheetTrigger>
        <SheetContent className='overflow-y-auto min-w-max'>
            <SheetHeader className='mb-7'>
                <SheetTitle>Overlays</SheetTitle>
                <SheetDescription>
                    Configure your cameras Overlay parameters
                </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <ImageOverlayNameFetchParams />
              <ImageOverlayTsFetchParams />
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
