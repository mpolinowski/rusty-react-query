import React, { useState } from 'react'
import { useQuery } from "@tanstack/react-query"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ReloadIcon } from "@radix-ui/react-icons"

import { iPostApiResponseCode } from '@/types/iGeneral'
import { iGetOdThreshApiResponse } from '@/types/iAlarm'
import { login, alarm } from '@/config.ts'

const cmd='http://'+login.url+':'+login.port+'/param.cgi?cmd='
const auth='&user='+login.user+'&pwd='+login.password
const getparam=alarm.odthresh.param.get
const setparam=alarm.odthresh.param.set
const type=alarm.odthresh.type.person
const keyenable=alarm.odthresh.key.enable
const keythreshold=alarm.odthresh.key.threshold
const keyminwidth=alarm.odthresh.key.minwidth
const keymaxwidth=alarm.odthresh.key.maxwidth
const keyminheight=alarm.odthresh.key.minheight
const keymaxheight=alarm.odthresh.key.maxheight

const fetchCameraState = async(param: string,): Promise<iGetOdThreshApiResponse> => {
    console.log(cmd+param+type+auth)
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

        const jsonData: iGetOdThreshApiResponse = JSON.parse(cleanedTextResponse)
        console.log(jsonData)
        return jsonData
    }
    throw new Error('ERROR :: Data fetching failed!')
}

const updateCameraState = async(
        param: string, key: string, value: string
    ): Promise<iPostApiResponseCode> => {
    console.log(cmd+param+type+key+value+auth)
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
    const [threshold, setThreshold] = useState('')
    const [minwidth, setMinwidth] = useState('')
    const [maxwidth, setMaxwidth] = useState('')
    const [minheight, setMinheight] = useState('')
    const [maxheight, setMaxheight] = useState('')
    const {
        isLoading,
        isError,
        error,
        data: response
    } = useQuery<iGetOdThreshApiResponse, Error>({
        queryKey: ['odthreshpersonparams', { getparam }],
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
                        Person Animal Detection
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
                        Person Detection Threshold
                    </Label>
                        <Input
                            defaultValue={response?.threshold}
                            onChange={(e) => setThreshold(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keythreshold, threshold)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Person Detection Box Minimum Width
                    </Label>
                        <Input
                            defaultValue={response?.minwidth}
                            onChange={(e) => setMinwidth(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyminwidth, minwidth)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Person Detection Box Maximum Width
                    </Label>
                        <Input
                            defaultValue={response?.maxwidth}
                            onChange={(e) => setMaxwidth(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keymaxwidth, maxwidth)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Person Detection Box Minimum Height
                    </Label>
                        <Input
                            defaultValue={response?.minheight}
                            onChange={(e) => setMinheight(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyminheight, minheight)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Person Detection Box Maximum Height
                    </Label>
                        <Input
                            defaultValue={response?.maxheight}
                            onChange={(e) => setMaxheight(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keymaxheight, maxheight)}
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

// import { iGetOdThreshApiResponse } from '@/types/iAlarm'
// import { login, alarm } from '@/config.ts'

// const cmd='http://'+login.url+':'+login.port+'/param.cgi?cmd='
// const auth='&user='+login.user+'&pwd='+login.password
// const param=alarm.odthresh.param
// const type=alarm.odthresh.person

// const fetchData = async(param: string): Promise<iGetOdThreshApiResponse> => {
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

//         const jsonData: iGetOdThreshApiResponse = JSON.parse(cleanedTextResponse)

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
//     }: UseQueryResult<iGetOdThreshApiResponse, Error> = useQuery<iGetOdThreshApiResponse, Error>({
//         queryKey: ['odthreshpersonparams', { param }],
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
//                         Enable Person Detection
//                     </Label>
//                     <Input id="name" value={data.enable} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Person Detection Threshold
//                     </Label>
//                     <Input id="name" value={data.threshold} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Person Detection Box Minimum Width
//                     </Label>
//                     <Input id="name" value={data.minwidth} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Person Detection Box Maximum Width
//                     </Label>
//                     <Input id="name" value={data.maxwidth} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Person Detection Box Minimum Height
//                     </Label>
//                     <Input id="name" value={data.minheight} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Person Detection Box Maximum Height
//                     </Label>
//                     <Input id="name" value={data.maxheight} className="col-span-3" />
//                 </div>
//             </div>
//     )

//     else return <Badge variant="outline" className='mb-2'>Huh?</Badge>
// }



















