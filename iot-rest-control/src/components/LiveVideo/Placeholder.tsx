import {
    Card,
    CardContent,
    CardFooter
} from "@/components/ui/card"

import { MobileMenu } from '@/components/Layout/MobileMenu'
import { GoTo } from '@/components/API/VideoOverlay/PtzPreset'
import { PanTilt } from '@/components/API/VideoOverlay/Ptz'
import { SysLog } from '@/components/API/VideoOverlay/SysLog'

const imageUrl: string = '/images/camera.avif'

export function VideoPlayer(): JSX.Element {
    return (
        <>
        <MobileMenu />
        <Card className="rounded-sm">
            <div className='flex flex-row justify-between p-5'>
                <GoTo/>
                <PanTilt direction='left' distance='10' />
                <PanTilt direction='left' distance='50' />
                <PanTilt direction='up' distance='10' />
                <PanTilt direction='up' distance='50' />
                <PanTilt direction='right' distance='10' />
                <PanTilt direction='right' distance='50' />
                <PanTilt direction='down' distance='10' />
                <PanTilt direction='down' distance='50' />
            </div>
            <CardContent>
                <div className="mt-3">
                    <img src={imageUrl} className="rounded-sm shadow-md" />
                </div>
            </CardContent>
            <CardFooter className="hidden lg:block">
                <SysLog />
            </CardFooter>
        </Card>
        </>
    )
}