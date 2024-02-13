import React, { useState } from 'react'
import { useQuery } from "@tanstack/react-query"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ReloadIcon } from "@radix-ui/react-icons"

import { iPostApiResponseCode } from '@/types/iGeneral'
import { iGetAlarmScheduleApiResponse } from '@/types/iAlarm'
import { login, alarm } from '@/config.ts'

const cmd='http://'+login.url+':'+login.port+'/param.cgi?cmd='
const auth='&user='+login.user+'&pwd='+login.password
const getparam=alarm.customschedule.param.get
const setparam=alarm.customschedule.param.set
const type=alarm.customschedule.type.pir
const keyweek0=alarm.customschedule.key.week0
const keyweek1=alarm.customschedule.key.week1
const keyweek2=alarm.customschedule.key.week2
const keyweek3=alarm.customschedule.key.week3
const keyweek4=alarm.customschedule.key.week4
const keyweek5=alarm.customschedule.key.week5
const keyweek6=alarm.customschedule.key.week6

const fetchCameraState = async(param: string,): Promise<iGetAlarmScheduleApiResponse> => {
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

        const jsonData: iGetAlarmScheduleApiResponse = JSON.parse(cleanedTextResponse)
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
    const [week0, setWeek0] = useState('')
    const [week1, setWeek1] = useState('')
    const [week2, setWeek2] = useState('')
    const [week3, setWeek3] = useState('')
    const [week4, setWeek4] = useState('')
    const [week5, setWeek5] = useState('')
    const [week6, setWeek6] = useState('')
    const {
        isLoading,
        isError,
        error,
        data: response
    } = useQuery<iGetAlarmScheduleApiResponse, Error>({
        queryKey: ['custshedpirparams', { getparam }],
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
                        Audio Custom Schedule Sunday (PIR)
                    </Label>
                        <Input
                            defaultValue={response?.week0}
                            onChange={(e) => setWeek0(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyweek0, week0)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Audio Custom Schedule Monday (PIR)
                    </Label>
                        <Input
                            defaultValue={response?.week1}
                            onChange={(e) => setWeek1(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyweek1, week1)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Audio Custom Schedule Tuesday (PIR)
                    </Label>
                        <Input
                            defaultValue={response?.week2}
                            onChange={(e) => setWeek2(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyweek2, week2)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Audio Custom Schedule Wednesday (PIR)
                    </Label>
                        <Input
                            defaultValue={response?.week3}
                            onChange={(e) => setWeek3(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyweek3, week3)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Audio Custom Schedule Thurday (PIR)
                    </Label>
                        <Input
                            defaultValue={response?.week4}
                            onChange={(e) => setWeek4(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyweek4, week4)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Audio Custom Schedule Friday (PIR)
                    </Label>
                        <Input
                            defaultValue={response?.week5}
                            onChange={(e) => setWeek5(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyweek5, week5)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Audio Custom Schedule Saturday (PIR)
                    </Label>
                        <Input
                            defaultValue={response?.week6}
                            onChange={(e) => setWeek6(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyweek6, week6)}
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

// import { iGetAlarmScheduleApiResponse } from '@/types/iAlarm'
// import { login, alarm } from '@/config.ts'

// const cmd='http://'+login.url+':'+login.port+'/param.cgi?cmd='
// const auth='&user='+login.user+'&pwd='+login.password
// const param=alarm.customschedule.param
// const type=alarm.customschedule.pir

// const fetchData = async(param: string): Promise<iGetAlarmScheduleApiResponse> => {
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

//         const jsonData: iGetAlarmScheduleApiResponse = JSON.parse(cleanedTextResponse)

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
//     }: UseQueryResult<iGetAlarmScheduleApiResponse, Error> = useQuery<iGetAlarmScheduleApiResponse, Error>({
//         queryKey: ['custshedpirparams', { param }],
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
//                         PIR Custom Schedule Sunday
//                     </Label>
//                     <Input id="name" value={data.week0} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         PIR Custom Schedule Monday
//                     </Label>
//                     <Input id="name" value={data.week1} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         PIR Custom Schedule Tuesday
//                     </Label>
//                     <Input id="name" value={data.week2} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         PIR Custom Schedule Wednesday
//                     </Label>
//                     <Input id="name" value={data.week3} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         PIR Custom Schedule Thurday
//                     </Label>
//                     <Input id="name" value={data.week4} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         PIR Custom Schedule Friday
//                     </Label>
//                     <Input id="name" value={data.week5} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         PIR Custom Schedule Saturday
//                     </Label>
//                     <Input id="name" value={data.week6} className="col-span-3" />
//                 </div>
//             </div>
//     )

//     else return <Badge variant="outline" className='mb-2'>Huh?</Badge>
// }



















