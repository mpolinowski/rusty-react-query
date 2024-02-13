import React, { useState } from 'react'
import { useQuery } from "@tanstack/react-query"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ReloadIcon } from "@radix-ui/react-icons"

import { iPostApiResponseCode } from '@/types/iGeneral'
import { iGetAlarmAttrApiResponse } from '@/types/iAlarm'
import { login, alarm } from '@/config.ts'

const cmd='http://'+login.url+':'+login.port+'/param.cgi?cmd='
const auth='&user='+login.user+'&pwd='+login.password
const getparam=alarm.alarmattr.param.get
const setparam=alarm.alarmattr.param.set
const keyarmed=alarm.alarmattr.key.armed
const keylinkpir=alarm.alarmattr.key.linkpir
const keylinkpirareas=alarm.alarmattr.key.linkpirareas
const keylinkio=alarm.alarmattr.key.linkio
const keylinkperif=alarm.alarmattr.key.linkperif
const keylinkiopir=alarm.alarmattr.key.linkiopir
const keylinkperson=alarm.alarmattr.key.linkperson
const keylinkvehicle=alarm.alarmattr.key.linkvehicle
const keylinkanimal=alarm.alarmattr.key.linkanimal

const fetchCameraState = async(param: string,): Promise<iGetAlarmAttrApiResponse> => {
    console.log(cmd+param+auth)
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

        const jsonData: iGetAlarmAttrApiResponse = JSON.parse(cleanedTextResponse)
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
    const [armed, setArmed] = useState('')
    const [linkpir, setLinkpir] = useState('')
    const [linkpirareas, setLinkpirareas] = useState('')
    const [linkio, setLinkio] = useState('')
    const [linkperif, setLinkperif] = useState('')
    const [linkiopir, setLinkiopir] = useState('')
    const [linkperson, setLinkperson] = useState('')
    const [linkvehicle, setLinkvehicle] = useState('')
    const [linkanimal, setLinkanimal] = useState('')
    const {
        isLoading,
        isError,
        error,
        data: response
    } = useQuery<iGetAlarmAttrApiResponse, Error>({
        queryKey: ['alarmactionparams', { getparam }],
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
                        Enable Alarm Detection
                    </Label>
                        <Input
                            defaultValue={response?.armed}
                            onChange={(e) => setArmed(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyarmed, armed)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Link PIR Sensor
                    </Label>
                        <Input
                            defaultValue={response?.linkpir}
                            onChange={(e) => setLinkpir(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keylinkpir, linkpir)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Link PIR Sensor with Areas
                    </Label>
                        <Input
                            defaultValue={response?.linkpirareas}
                            onChange={(e) => setLinkpirareas(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keylinkpirareas, linkpirareas)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Link Motion Areas with IO
                    </Label>
                        <Input
                            defaultValue={response?.linkio}
                            onChange={(e) => setLinkio(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keylinkio, linkio)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Link PIR Sensor with IO
                    </Label>
                        <Input
                            defaultValue={response?.linkperif}
                            onChange={(e) => setLinkperif(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keylinkperif, linkperif)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Link Motion Areas and PIR Sensor with IO
                    </Label>
                        <Input
                            defaultValue={response?.linkiopir}
                            onChange={(e) => setLinkiopir(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keylinkiopir, linkiopir)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Link PIR Sensor with Person Detection
                    </Label>
                        <Input
                            defaultValue={response?.linkperson}
                            onChange={(e) => setLinkperson(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keylinkperson, linkperson)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Link PIR Sensor with Vehicle Detection
                    </Label>
                        <Input
                            defaultValue={response?.linkvehicle}
                            onChange={(e) => setLinkvehicle(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keylinkvehicle, linkvehicle)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Link PIR Sensor with Animal Detection
                    </Label>
                        <Input
                            defaultValue={response?.linkanimal}
                            onChange={(e) => setLinkanimal(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keylinkanimal, linkanimal)}
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

// import { iGetAlarmAttrApiResponse } from '@/types/iAlarm'
// import { login, alarm } from '@/config.ts'

// const cmd='http://'+login.url+':'+login.port+'/param.cgi?cmd='
// const auth='&user='+login.user+'&pwd='+login.password
// const param=alarm.alarmattr

// const fetchData = async(param: string): Promise<iGetAlarmAttrApiResponse> => {
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

//         const jsonData: iGetAlarmAttrApiResponse = JSON.parse(cleanedTextResponse)

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
//     }: UseQueryResult<iGetAlarmAttrApiResponse, Error> = useQuery<iGetAlarmAttrApiResponse, Error>({
//         queryKey: ['alarmactionparams', { param }],
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
//     // <Button variant="destructive" className='max-w-64 text-ellipsis overflow-hidden' disabled>{error.message}</Button>

//     if(isSuccess) return (
//             <div className="grid gap-4 py-4">
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Enable Alarm Detection
//                     </Label>
//                     <Input id="name" value={data.armed} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Link PIR Sensor
//                     </Label>
//                     <Input id="name" value={data.linkpir} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Link PIR Sensor with Areas
//                     </Label>
//                     <Input id="name" value={data.linkpirareas} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Link Motion Areas with IO
//                     </Label>
//                     <Input id="name" value={data.linkio} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Link PIR Sensor with IO
//                     </Label>
//                     <Input id="name" value={data.linkperif} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Link Motion Areas and PIR Sensor with IO
//                     </Label>
//                     <Input id="name" value={data.linkiopir} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Link PIR Sensor with Person Detection
//                     </Label>
//                     <Input id="name" value={data.linkperson} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Link PIR Sensor with Vehicle Detection
//                     </Label>
//                     <Input id="name" value={data.linkvehicle} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Link PIR Sensor with Animal Detection
//                     </Label>
//                     <Input id="name" value={data.linkanimal} className="col-span-3" />
//                 </div>
//             </div>
//     )

//     else return <Badge variant="outline" className='mb-2'>Huh?</Badge>
// }



















