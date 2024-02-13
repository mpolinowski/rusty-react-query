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

import FtpAttrFetchParams from '@/components/API/Features/FTP/FtpAttr'
import FtpActionAttrFetchParams from '@/components/API/Features/FTP/FtpActionAttr'
import FtpActionSnapFetchParams from '@/components/API/Features/FTP/FtpActionSnap'
import FtpActionTimersnapFetchParams from '@/components/API/Features/FTP/FtpActionTimersnap'
import FtpActionRecFetchParams from '@/components/API/Features/FTP/FtpActionRec'

export default function FTPMenu(): JSX.Element {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">FTP</Button>
      </SheetTrigger>
        <SheetContent className='overflow-y-auto min-w-max'>
            <SheetHeader className='mb-7'>
                <SheetTitle>FTP Settings</SheetTitle>
                <SheetDescription>
                    Configure your cameras FTP parameters
                </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <FtpAttrFetchParams />
              <FtpActionAttrFetchParams />
              <FtpActionSnapFetchParams />
              <FtpActionTimersnapFetchParams />
              <FtpActionRecFetchParams />
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
