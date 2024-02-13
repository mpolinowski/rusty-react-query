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

import AudioInFetchParams from '@/components/API/Multimedia/Audio/AudioIn'
import AudioOutFetchParams from '@/components/API/Multimedia/Audio/AudioOut'
import AudioCodecInFetchParams from '@/components/API/Multimedia/Audio/AudioCodecIn'
import AudioCodecOutFetchParams from '@/components/API/Multimedia/Audio/AudioCodecOut'
import AudioActionFetchParams from '@/components/API/Multimedia/Audio/AudioAction'
import AudioAnrFetchParams from '@/components/API/Multimedia/Audio/AudioAnr'

export default function MqttMenu(): JSX.Element {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">Audio</Button>
      </SheetTrigger>
        <SheetContent className='overflow-y-auto min-w-max'>
            <SheetHeader className='mb-7'>
                <SheetTitle>Audio</SheetTitle>
                <SheetDescription>
                    Configure your cameras Audio parameters
                </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <AudioInFetchParams />
              <AudioOutFetchParams />
              <AudioCodecInFetchParams />
              <AudioCodecOutFetchParams />
              <AudioActionFetchParams />
              <AudioAnrFetchParams />
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
