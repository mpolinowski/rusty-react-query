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

import ImageFetchParams from '@/components/API/Multimedia/Image/Image'
import ImageNightFetchParams from '@/components/API/Multimedia/Image/ImageNight'
import ImageModeFetchParams from '@/components/API/Multimedia/Image/ImageMode'
import ImageStateFetchParams from '@/components/API/Multimedia/Image/ImageState'

export default function MqttMenu(): JSX.Element {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">Image</Button>
      </SheetTrigger>
        <SheetContent className='overflow-y-auto min-w-max'>
            <SheetHeader className='mb-7'>
                <SheetTitle>Image</SheetTitle>
                <SheetDescription>
                    Configure your cameras Image parameters
                </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <ImageFetchParams />
              <ImageNightFetchParams />
              <ImageModeFetchParams />
              <ImageStateFetchParams />
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
