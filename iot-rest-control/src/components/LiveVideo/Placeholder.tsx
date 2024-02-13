import {
    Card,
    CardContent,
    CardFooter
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"

import { MobileMenu } from '@/components/Layout/MobileMenu'
import GoTo from '@/components/API/Post/FetchPtzPreset'

const imageUrl: string = '/images/camera.avif'

export function VideoPlayer(): JSX.Element {
    return (
        <>
        <MobileMenu />
        <Card className="rounded-sm">
            <CardContent>
                <div className="mt-3">
                    <img src={imageUrl} className="rounded-sm shadow-md" />
                </div>
            </CardContent>
            <CardFooter className="hidden lg:block">
                <GoTo/>
                <ScrollArea className="whitespace-pre text-left h-[100px] w-full rounded-md border mt-4 p-4">
                    <h3>Event log:</h3>
                    <p><Label>06:46:21 pm :: 06/02/24 :: ALARM : Motion detected in area 1 | Person detected in area 1</Label></p>
                    <p><Label>06:46:21 pm :: 06/02/24 :: ALARM : Motion detected and alarm video recorded to SD card</Label></p>
                    <p><Label>06:46:21 pm :: 06/02/24 :: ALARM : Motion detected in area 1 | Person detected in area 1</Label></p>
                    <p><Label>06:46:21 pm :: 06/02/24 :: ALARM : Motion detected and alarm video recorded to SD card</Label></p>
                    <p><Label>06:46:21 pm :: 06/02/24 :: ALARM : Motion detected in area 1 | Person detected in area 1</Label></p>
                    <p><Label>06:46:21 pm :: 06/02/24 :: ALARM : Motion detected and alarm video recorded to SD card</Label></p>
                    <p><Label>06:46:21 pm :: 06/02/24 :: ALARM : Motion detected in area 1 | Person detected in area 1</Label></p>
                    <p><Label>06:46:21 pm :: 06/02/24 :: ALARM : Motion detected and alarm video recorded to SD card</Label></p>
                    <p><Label>06:46:21 pm :: 06/02/24 :: ALARM : Motion detected in area 1 | Person detected in area 1</Label></p>
                    <p><Label>06:46:21 pm :: 06/02/24 :: ALARM : Motion detected and alarm video recorded to SD card</Label></p>
                    <p><Label>06:46:21 pm :: 06/02/24 :: ALARM : Motion detected in area 1 | Person detected in area 1</Label></p>
                    <p><Label>06:46:21 pm :: 06/02/24 :: ALARM : Motion detected and alarm video recorded to SD card</Label></p>
                </ScrollArea>
            </CardFooter>
        </Card>
        </>
    )
}