import React, { useState } from 'react'
import { useQuery } from "@tanstack/react-query"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ReloadIcon } from "@radix-ui/react-icons"

import { iGetImageCoverApiResponse } from '@/types/iMultimedia'
import { iPostApiResponseCode } from '@/types/iGeneral'
import { login, multimedia } from '@/config.ts'

const cmd='http://'+login.url+':'+login.port+'/param.cgi?cmd='
const auth='&user='+login.user+'&pwd='+login.password
const getparam=multimedia.privacy.param.get
const setparam=multimedia.privacy.param.set
const type=multimedia.privacy.type.privacyarea6
const keyenable=multimedia.privacy.key.enable
const keyrect=multimedia.privacy.key.rect
const keyx=multimedia.privacy.key.x
const keyy=multimedia.privacy.key.y
const keyw=multimedia.privacy.key.w
const keyh=multimedia.privacy.key.h
const keyx1=multimedia.privacy.key.x1
const keyy1=multimedia.privacy.key.y1
const keyx2=multimedia.privacy.key.x2
const keyy2=multimedia.privacy.key.y2
const keyx3=multimedia.privacy.key.x3
const keyy3=multimedia.privacy.key.y3
const keyx4=multimedia.privacy.key.x4
const keyy4=multimedia.privacy.key.y4
const keycolor=multimedia.privacy.key.color

const fetchCameraState = async(param: string, type: string): Promise<iGetImageCoverApiResponse> => {
    const response = await fetch(cmd+param+type+auth)
    const cmdQuery = 'cmd="'+param+'";'

    if (response.ok) {
        const cleanedTextResponse = (await response.text())
        .replace(cmdQuery, '{"')
        .replace('response="200";', '}')
        .replace(/=/g, '":')
        .replace(/";/g, '","')
        .replace(/\s/g, '')
        .replace(/","}/g, '"}')

        const jsonData: iGetImageCoverApiResponse = JSON.parse(cleanedTextResponse)
        console.log(jsonData)
        return jsonData
    }
    throw new Error('ERROR :: Data fetching failed!')
}

const updateCameraState = async(
        param: string, type: string, value: string
    ): Promise<iPostApiResponseCode> => {
    const response = await fetch(cmd+param+type+'&enable='+value+auth)
    const cmdQuery = 'cmd="'+param+'";'

    if (response.ok) {
        const cleanedTextResponse = (await response.text())
        .replace(cmdQuery, '{')
        .replace('response="', '"code":')
        .replace('";', '}')

        const jsonData: iPostApiResponseCode = JSON.parse(cleanedTextResponse)

        // console.log(jsonData)

        return jsonData
    }
    throw new Error('ERROR :: Data fetching failed!')
}

export default function DataRequest(): React.JSX.Element {
    const [enable, setEnable] = useState('')
    const [rect, setRect] = useState('')
    const [x, setX] = useState('')
    const [y, setY] = useState('')
    const [h, setH] = useState('')
    const [w, setW] = useState('')
    const [x1, setX1] = useState('')
    const [y1, setY1] = useState('')
    const [x2, setX2] = useState('')
    const [y2, setY2] = useState('')
    const [x3, setX3] = useState('')
    const [y3, setY3] = useState('')
    const [x4, setX4] = useState('')
    const [y4, setY4] = useState('')
    const [color, setColor] = useState('')
    const {
        isLoading,
        isError,
        error,
        data: response
    } = useQuery<iGetImageCoverApiResponse, Error>({
        queryKey: ['private1params', { getparam, type }],
        queryFn: () => fetchCameraState(getparam, type),
        staleTime: 1000,
        refetchOnMount: true,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
        refetchInterval: 1000 * 10,
        retry: true,
        retryOnMount: true
    })

    if(isLoading) return (
        <Button variant="ghost" disabled>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      )

    if(isError) return (
        <Badge variant="destructive" className='mb-2'>
            {error.message}
        </Badge>
    )
    
    return (
            <>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Enable Privacy Area 6
                    </Label>
                    <Input
                        defaultValue={response?.enable}
                        onChange={(e) => setEnable(e.target.value)}
                        className="col-span-3"
                    />
                    <Button onClick={
                        () => {updateCameraState(setparam, keyenable, enable)}
                    }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Privacy Area 6 Rect
                    </Label>
                    <Input
                        defaultValue={response?.rect}
                        onChange={(e) => setRect(e.target.value)}
                        className="col-span-3"
                    />
                    <Button onClick={
                        () => {updateCameraState(setparam, keyrect, rect)}
                    }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Privacy Area 6 x
                    </Label>
                    <Input
                        defaultValue={response?.x}
                        onChange={(e) => setX(e.target.value)}
                        className="col-span-3"
                    />
                    <Button onClick={
                        () => {updateCameraState(setparam, keyx, x)}
                    }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Privacy Area 6 y
                    </Label>
                    <Input
                        defaultValue={response?.y}
                        onChange={(e) => setY(e.target.value)}
                        className="col-span-3"
                    />
                    <Button onClick={
                        () => {updateCameraState(setparam, keyy, y)}
                    }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Privacy Area 6 h
                    </Label>
                    <Input
                        defaultValue={response?.h}
                        onChange={(e) => setH(e.target.value)}
                        className="col-span-3"
                    />
                    <Button onClick={
                        () => {updateCameraState(setparam, keyh, h)}
                    }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Privacy Area 6 w
                    </Label>
                    <Input
                        defaultValue={response?.w}
                        onChange={(e) => setW(e.target.value)}
                        className="col-span-3"
                    />
                    <Button onClick={
                        () => {updateCameraState(setparam, keyw, w)}
                    }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Privacy Area 6 x1
                    </Label>
                    <Input
                        defaultValue={response?.x1}
                        onChange={(e) => setX1(e.target.value)}
                        className="col-span-3"
                    />
                    <Button onClick={
                        () => {updateCameraState(setparam, keyx1, x1)}
                    }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Privacy Area 6 y1
                    </Label>
                    <Input
                        defaultValue={response?.enable}
                        onChange={(e) => setY1(e.target.value)}
                        className="col-span-3"
                    />
                    <Button onClick={
                        () => {updateCameraState(setparam, keyy1, y1)}
                    }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Privacy Area 6 x2
                    </Label>
                    <Input
                        defaultValue={response?.enable}
                        onChange={(e) => setX2(e.target.value)}
                        className="col-span-3"
                    />
                    <Button onClick={
                        () => {updateCameraState(setparam, keyx2, x2)}
                    }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Privacy Area 6 y2
                    </Label>
                    <Input
                        defaultValue={response?.enable}
                        onChange={(e) => setY2(e.target.value)}
                        className="col-span-3"
                    />
                    <Button onClick={
                        () => {updateCameraState(setparam, keyy2, y2)}
                    }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Privacy Area 6 x3
                    </Label>
                    <Input
                        defaultValue={response?.enable}
                        onChange={(e) => setX3(e.target.value)}
                        className="col-span-3"
                    />
                    <Button onClick={
                        () => {updateCameraState(setparam, keyx3, x3)}
                    }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Privacy Area 6 y3
                    </Label>
                    <Input
                        defaultValue={response?.enable}
                        onChange={(e) => setY3(e.target.value)}
                        className="col-span-3"
                    />
                    <Button onClick={
                        () => {updateCameraState(setparam, keyy3, y3)}
                    }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Privacy Area 6 x4
                    </Label>
                    <Input
                        defaultValue={response?.enable}
                        onChange={(e) => setX4(e.target.value)}
                        className="col-span-3"
                    />
                    <Button onClick={
                        () => {updateCameraState(setparam, keyx4, x4)}
                    }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Privacy Area 6 y4
                    </Label>
                    <Input
                        defaultValue={response?.enable}
                        onChange={(e) => setY4(e.target.value)}
                        className="col-span-3"
                    />
                    <Button onClick={
                        () => {updateCameraState(setparam, keyy4, y4)}
                    }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Privacy Area 6 Color
                    </Label>
                    <Input
                        defaultValue={response?.enable}
                        onChange={(e) => setColor(e.target.value)}
                        className="col-span-3"
                    />
                    <Button onClick={
                        () => {updateCameraState(setparam, keycolor, color)}
                    }>Submit</Button>
                </div>
            </>
    )
}

// import React from 'react'
// import { useQuery, UseQueryResult } from "@tanstack/react-query"

// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { ReloadIcon } from "@radix-ui/react-icons"

// import { iGetImageCoverApiResponse } from '@/types/iMultimedia'
// import { login, multimedia } from '@/config.ts'

// const cmd='http://'+login.url+':'+login.port+'/param.cgi?cmd='
// const auth='&user='+login.user+'&pwd='+login.password
// const param=multimedia.privacy.get
// const type=multimedia.privacy.privacyarea6

// const fetchData = async(param: string): Promise<iGetImageCoverApiResponse> => {
//     // console.log(cmd+query+auth)
//     const response = await fetch(cmd+param+type+auth)
//     const cmdQuery = 'cmd="'+param+'";'

//     if (response.ok) {
//         const cleanedTextResponse = (await response.text())
//         .replace(cmdQuery, '{"')
//         .replace('response="200";', '}')
//         .replace(/=/g, '":')
//         .replace(/";/g, '","')
//         .replace(/\s/g, '')
//         .replace(/","}/g, '"}')

//         const jsonData: iGetImageCoverApiResponse = JSON.parse(cleanedTextResponse)

//         // console.log(jsonData)

//         return jsonData
//     }
//     throw new Error('ERROR :: Data fetching failed!')
// }

// export default function DataRequest(): React.JSX.Element {

//     const {
//         isLoading,
//         isError,
//         error,
//         data,
//         isSuccess
//     }: UseQueryResult<iGetImageCoverApiResponse, Error> = useQuery<iGetImageCoverApiResponse, Error>({
//         queryKey: ['private6params', { param }],
//         queryFn: () => fetchData(param),
//         staleTime: 1000 * 5,
//         refetchOnMount: true,
//         refetchOnReconnect: true,
//         refetchOnWindowFocus: true,
//         refetchInterval: 1000 * 30,
//         refetchIntervalInBackground: false,
//         retry: true,
//         retryOnMount: true,
//         // retryDelay: 1000 * 5, // default increases exponentially
//     })

//     if(isLoading) return (
//         <Button variant="ghost" disabled>
//           <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
//           Please wait
//         </Button>
//       )

//     if(isError) return (
//         <Badge variant="destructive" className='mb-2'>
//             {error.message}
//         </Badge>
//     )

//     if(isSuccess) return (
//             <>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Enable Privacy Area 6
//                     </Label>
//                     <Input id="name" value={data.enable} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Privacy Area 6 Rect
//                     </Label>
//                     <Input id="name" value={data.rect} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Privacy Area 6 X
//                     </Label>
//                     <Input id="name" value={data.x} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Privacy Area 6 Y
//                     </Label>
//                     <Input id="name" value={data.y} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Privacy Area 6 Width
//                     </Label>
//                     <Input id="name" value={data.w} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Privacy Area 6 Height
//                     </Label>
//                     <Input id="name" value={data.h} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Privacy Area 6 X1
//                     </Label>
//                     <Input id="name" value={data.x1} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Privacy Area 6 Y1
//                     </Label>
//                     <Input id="name" value={data.y1} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Privacy Area 6 X2
//                     </Label>
//                     <Input id="name" value={data.x2} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Privacy Area 6 Y2
//                     </Label>
//                     <Input id="name" value={data.y2} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Privacy Area 6 X3
//                     </Label>
//                     <Input id="name" value={data.x3} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Privacy Area 6 Y3
//                     </Label>
//                     <Input id="name" value={data.y3} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Privacy Area 6 X4
//                     </Label>
//                     <Input id="name" value={data.x4} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Privacy Area 6 Y4
//                     </Label>
//                     <Input id="name" value={data.y4} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Privacy Area 6 Color
//                     </Label>
//                     <Input id="name" value={data.color} className="col-span-3" />
//                 </div>
//             </>
//     )

//     else return <Badge variant="outline" className='mb-2'>Huh?</Badge>
// }



















