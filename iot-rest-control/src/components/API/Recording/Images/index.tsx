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

import MailTimerSnap from '@/components/API/Recording/Images/MailTimerSnap'
import FtpSnaptimer from '@/components/API/Recording/Images/FtpSnaptimer'

export default function SystemTimeMenu(): JSX.Element {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">Images</Button>
      </SheetTrigger>

      <SheetContent className='overflow-y-auto min-w-max'>
          <SheetHeader className='mb-7'>
              <SheetTitle>Images</SheetTitle>
              <SheetDescription>
                  Configure your cameras Snapshot Recording parameters
              </SheetDescription>
          </SheetHeader>
            <MailTimerSnap />
            <FtpSnaptimer />
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
