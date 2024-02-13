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

import SmtpAttrFetchParams from '@/components/API/Features/Mail/SmtpAttr'
import MailActionFetchParams from '@/components/API/Features/Mail/MailAction'
import MailActionAttrFetchParams from '@/components/API/Features/Mail/MailActionAttr'

export default function MqttMenu(): JSX.Element {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">Email</Button>
      </SheetTrigger>
        <SheetContent className='overflow-y-auto min-w-max'>
            <SheetHeader className='mb-7'>
                <SheetTitle>SMTP Settings</SheetTitle>
                <SheetDescription>
                    Configure your cameras SMTP parameters
                </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <SmtpAttrFetchParams />
              <MailActionFetchParams />
              <MailActionAttrFetchParams />
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
