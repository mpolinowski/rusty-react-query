import React, { useState } from 'react'
import { useQuery } from "@tanstack/react-query"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ReloadIcon } from "@radix-ui/react-icons"

import { iPostApiResponseCode } from '@/types/iGeneral'
import { iGetPtzAttrApiResponse } from '@/types/iFeatures'
import { login, features } from '@/config.ts'

const cmd='http://'+login.url+':'+login.port+'/param.cgi?cmd='
const auth='&user='+login.user+'&pwd='+login.password
const getparam=features.ptzattr.param.get
const setparam=features.ptzattr.param.set
const keyselfdet=features.ptzattr.key.selfdet
const keymovehome=features.ptzattr.key.movehome
const keyhome=features.ptzattr.key.home
const keyalarmmask=features.ptzattr.key.alarmmask
const keygotoalarmpos=features.ptzattr.key.gotoalarmpos
const keyalarmpos=features.ptzattr.key.alarmpos
const keyspeed=features.ptzattr.key.speed
const keymirror=features.ptzattr.key.mirror
const keyflip=features.ptzattr.key.flip

const fetchCameraState = async(param: string,): Promise<iGetPtzAttrApiResponse> => {
    const response = await fetch(cmd+param+auth)
    const cmdQuery = 'cmd="'+param+'";'

    if (response.ok) {
        const cleanedTextResponse = (await response.text())
        .replace(cmdQuery, '{"')
        .replace('response="200";', '}')
        .replace(/=/g, '":')
        .replace(/";/g, '","')
        .replace(/\s/g, '')
        .replace(/","}/g, '"}')

        const jsonData: iGetPtzAttrApiResponse = JSON.parse(cleanedTextResponse)
        console.log(jsonData)
        return jsonData
    }
    throw new Error('ERROR :: Data fetching failed!')
}

const updateCameraState = async(
        param: string, key: string, value: string
    ): Promise<iPostApiResponseCode> => {
    console.log(cmd+param+key+value+auth)
    const response = await fetch(cmd+param+key+value+auth)
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
    const [selfdet, setSelfdet] = useState('')
    const [movehome, setMovehome] = useState('')
    const [home, setHome] = useState('')
    const [alarmmask, setAlarmmask] = useState('')
    const [gotoalarmpos, setGotoalarmpos] = useState('')
    const [alarmpos, setAlarmpos] = useState('')
    const [speed, setSpeed] = useState('')
    const [mirror, setMirror] = useState('')
    const [flip, setFlip] = useState('')
    const {
        isLoading,
        isError,
        error,
        data: response
    } = useQuery<iGetPtzAttrApiResponse, Error>({
        queryKey: ['ptzparams', { getparam }],
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
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        PTZ Calibration
                    </Label>
                        <Input
                            defaultValue={response?.selfdet}
                            onChange={(e) => setSelfdet(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyselfdet, selfdet)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        PTZ Move to Home
                    </Label>
                        <Input
                            defaultValue={response?.movehome}
                            onChange={(e) => setMovehome(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keymovehome, movehome)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        PTZ Home Position
                    </Label>
                        <Input
                            defaultValue={response?.home}
                            onChange={(e) => setHome(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyhome, home)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        PTZ Mute Alarm
                    </Label>
                        <Input
                            defaultValue={response?.alarmmask}
                            onChange={(e) => setAlarmmask(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyalarmmask, alarmmask)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        PTZ Enable Alarm Position
                    </Label>
                        <Input
                            defaultValue={response?.gotoalarmpos}
                            onChange={(e) => setGotoalarmpos(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keygotoalarmpos, gotoalarmpos)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        PTZ Alarm Position
                    </Label>
                        <Input
                            defaultValue={response?.alarmpos}
                            onChange={(e) => setAlarmpos(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyalarmpos, alarmpos)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        PTZ Speed
                    </Label>
                        <Input
                            defaultValue={response?.speed}
                            onChange={(e) => setSpeed(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyspeed, speed)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Mirror PTZ
                    </Label>
                        <Input
                            defaultValue={response?.mirror}
                            onChange={(e) => setMirror(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keymirror, mirror)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Flip PTZ
                    </Label>
                        <Input
                            defaultValue={response?.flip}
                            onChange={(e) => setFlip(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyflip, flip)}
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

// import { iGetPtzAttrApiResponse } from '@/types/iFeatures'
// import { login, features } from '@/config.ts'

// const cmd='http://'+login.url+':'+login.port+'/param.cgi?cmd='
// const auth='&user='+login.user+'&pwd='+login.password
// const param=features.ptzattr

// const fetchData = async(param: string): Promise<iGetPtzAttrApiResponse> => {
//     // console.log(cmd+query+auth)
//     const response = await fetch(cmd+param+auth)
//     const cmdQuery = 'cmd="'+param+'";'

//     if (response.ok) {
//         const cleanedTextResponse = (await response.text())
//         .replace(cmdQuery, '{"')
//         .replace('response="200";', '}')
//         .replace(/=/g, '":')
//         .replace(/";/g, '","')
//         .replace(/\s/g, '')
//         .replace(/","}/g, '"}')

//         const jsonData: iGetPtzAttrApiResponse = JSON.parse(cleanedTextResponse)

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
//     }: UseQueryResult<iGetPtzAttrApiResponse, Error> = useQuery<iGetPtzAttrApiResponse, Error>({
//         queryKey: ['ptzparams', { param }],
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
//                         PTZ Calibration
//                     </Label>
//                     <Input id="name" value={data.selfdet} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         PTZ Move to Home
//                     </Label>
//                     <Input id="name" value={data.movehome} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         PTZ Home Position
//                     </Label>
//                     <Input id="name" value={data.home} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         PTZ Mute Alarm
//                     </Label>
//                     <Input id="name" value={data.alarmmask} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         PTZ Enable Alarm Position
//                     </Label>
//                     <Input id="name" value={data.gotoalarmpos} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         PTZ Alarm Position
//                     </Label>
//                     <Input id="name" value={data.alarmpos} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         PTZ Speed
//                     </Label>
//                     <Input id="name" value={data.speed} className="col-span-3" />
//                 </div>
//             </>
//     )

//     else return <Badge variant="outline" className='mb-2'>Huh?</Badge>
// }



















