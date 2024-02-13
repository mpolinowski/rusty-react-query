import React, { useState } from 'react'
import { useQuery } from "@tanstack/react-query"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ReloadIcon } from "@radix-ui/react-icons"

import { iPostApiResponseCode } from '@/types/iGeneral'
import { iGetMdAttrApiResponse } from '@/types/iAlarm'
import { login, alarm } from '@/config.ts'

const cmd='http://'+login.url+':'+login.port+'/param.cgi?cmd='
const auth='&user='+login.user+'&pwd='+login.password
const getparam=alarm.mdattr.param.get
const setparam=alarm.mdattr.param.set
const type=alarm.mdattr.type.area3
const keyenable=alarm.mdattr.key.enable
const keyrect=alarm.mdattr.key.rect
const keys=alarm.mdattr.key.s
const keyx=alarm.mdattr.key.x
const keyy=alarm.mdattr.key.y
const keyw=alarm.mdattr.key.w
const keyh=alarm.mdattr.key.h
const keypolyX=alarm.mdattr.key.polyX
const keypolyY=alarm.mdattr.key.polyY

const fetchCameraState = async(param: string,): Promise<iGetMdAttrApiResponse> => {
    console.log(cmd+param+auth)
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

        const jsonData: iGetMdAttrApiResponse = JSON.parse(cleanedTextResponse)
        console.log(jsonData)
        return jsonData
    }
    throw new Error('ERROR :: Data fetching failed!')
}

const updateCameraState = async(
        param: string, key: string, value: string
    ): Promise<iPostApiResponseCode> => {
    console.log(cmd+param+key+value+auth)
    const response = await fetch(cmd+param+type+key+value+auth)
    const cmdQuery = 'cmd="'+param+'";'

    if (response.ok) {
        const cleanedTextResponse = (await response.text())
        .replace(cmdQuery, '{')
        .replace('response="', '"code":')
        .replace('";', '}')

        const jsonData: iPostApiResponseCode = JSON.parse(cleanedTextResponse)

        console.log(jsonData)

        return jsonData
    }
    throw new Error('ERROR :: Data fetching failed!')
}

export default function DataRequest(): React.JSX.Element {
    const [enable, setEnable] = useState('')
    const [rect, setRect] = useState('')
    const [s, setS] = useState('')
    const [x, setX] = useState('')
    const [y, setY] = useState('')
    const [h, setH] = useState('')
    const [w, setW] = useState('')
    const [polyX, setPolyX] = useState('')
    const [polyY, setPolyY] = useState('')
    const {
        isLoading,
        isError,
        error,
        data: response
    } = useQuery<iGetMdAttrApiResponse, Error>({
        queryKey: ['area3params', { getparam }],
        queryFn: () => fetchCameraState(getparam),
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
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Enable Detection Area 3
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
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Area 3 X Coordinates
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
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Area 3 X Coordinates
                    </Label>
                        <Input
                            defaultValue={response?.s}
                            onChange={(e) => setS(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keys, s)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Area 3 Sensitivity
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
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Area 3 Rect
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
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Area 3 X
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
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Area 3 Y
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
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Area 3 H
                    </Label>
                        <Input
                            defaultValue={response?.polyX}
                            onChange={(e) => setPolyX(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keypolyX, polyX)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Area 3 W
                    </Label>
                        <Input
                            defaultValue={response?.polyY}
                            onChange={(e) => setPolyY(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keypolyY, polyY)}
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

// import { iGetMdAttrApiResponse } from '@/types/iAlarm'
// import { login, alarm } from '@/config.ts'

// const cmd='http://'+login.url+':'+login.port+'/param.cgi?cmd='
// const auth='&user='+login.user+'&pwd='+login.password
// const param=alarm.mdattr.param
// const type=alarm.mdattr.area1

// const fetchData = async(param: string): Promise<iGetMdAttrApiResponse> => {
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

//         const jsonData: iGetMdAttrApiResponse = JSON.parse(cleanedTextResponse)

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
//     }: UseQueryResult<iGetMdAttrApiResponse, Error> = useQuery<iGetMdAttrApiResponse, Error>({
//         queryKey: ['area3params', { param }],
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
//             <div className="grid gap-4 py-4">
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Enable Detection Area 3
//                     </Label>
//                     <Input id="name" value={data.enable} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Area 3 X Coordinates
//                     </Label>
//                     <Input id="name" value={data.polyX} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Area 3 X Coordinates
//                     </Label>
//                     <Input id="name" value={data.polyY} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Area 3 Sensitivity
//                     </Label>
//                     <Input id="name" value={data.s} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Area 3 Rect
//                     </Label>
//                     <Input id="name" value={data.rect} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Area 3 X
//                     </Label>
//                     <Input id="name" value={data.x} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Area 3 Y
//                     </Label>
//                     <Input id="name" value={data.y} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Area 3 H
//                     </Label>
//                     <Input id="name" value={data.h} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Area 3 W
//                     </Label>
//                     <Input id="name" value={data.w} className="col-span-3" />
//                 </div>
//             </div>
//     )

//     else return <Badge variant="outline" className='mb-2'>Huh?</Badge>
// }



















