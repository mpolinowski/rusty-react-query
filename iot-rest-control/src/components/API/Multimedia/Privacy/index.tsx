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

import ImagePrivArea1FetchParams from '@/components/API/Multimedia/Privacy/ImagePrivArea1'
import ImagePrivArea2FetchParams from '@/components/API/Multimedia/Privacy/ImagePrivArea2'
import ImagePrivArea3FetchParams from '@/components/API/Multimedia/Privacy/ImagePrivArea3'
import ImagePrivArea4FetchParams from '@/components/API/Multimedia/Privacy/ImagePrivArea4'
import ImagePrivArea5FetchParams from '@/components/API/Multimedia/Privacy/ImagePrivArea5'
import ImagePrivArea6FetchParams from '@/components/API/Multimedia/Privacy/ImagePrivArea6'
import ImagePrivArea7FetchParams from '@/components/API/Multimedia/Privacy/ImagePrivArea7'
import ImagePrivArea8FetchParams from '@/components/API/Multimedia/Privacy/ImagePrivArea8'

export default function MqttMenu(): JSX.Element {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">Privacy Areas</Button>
      </SheetTrigger>
        <SheetContent className='overflow-y-auto min-w-max'>
            <SheetHeader className='mb-7'>
                <SheetTitle>Privacy Areas</SheetTitle>
                <SheetDescription>
                    Configure your cameras Privacy Areas parameters
                </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <ImagePrivArea1FetchParams />
              <ImagePrivArea2FetchParams />
              <ImagePrivArea3FetchParams />
              <ImagePrivArea4FetchParams />
              <ImagePrivArea5FetchParams />
              <ImagePrivArea6FetchParams />
              <ImagePrivArea7FetchParams />
              <ImagePrivArea8FetchParams />
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
