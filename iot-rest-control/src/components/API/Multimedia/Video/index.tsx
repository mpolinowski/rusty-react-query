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

import VideoFetchParams from '@/components/API/Multimedia/Video/Video'
import VideoEncoder11FetchParams from '@/components/API/Multimedia/Video/VideoEncoder11'
import VideoEncoder12FetchParams from '@/components/API/Multimedia/Video/VideoEncoder12'
import VideoEncoder13FetchParams from '@/components/API/Multimedia/Video/VideoEncoder13'

export default function MqttMenu(): JSX.Element {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">Video</Button>
      </SheetTrigger>
        <SheetContent className='overflow-y-auto min-w-max'>
            <SheetHeader className='mb-7'>
                <SheetTitle>Video</SheetTitle>
                <SheetDescription>
                    Configure your cameras Video parameters
                </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <VideoFetchParams />
              <VideoEncoder11FetchParams />
              <VideoEncoder12FetchParams />
              <VideoEncoder13FetchParams />
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
