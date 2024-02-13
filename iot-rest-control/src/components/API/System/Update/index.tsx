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

import LatestVersion from '@/components/API/System/Update/LatestVersion'

export default function SystemTimeMenu(): JSX.Element {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">Update</Button>
      </SheetTrigger>

      <SheetContent className='overflow-y-auto min-w-max'>
          <SheetHeader className='mb-7'>
              <SheetTitle>Update</SheetTitle>
              <SheetDescription>
                  Configure your cameras Update parameters
              </SheetDescription>
          </SheetHeader>
            <LatestVersion />
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
