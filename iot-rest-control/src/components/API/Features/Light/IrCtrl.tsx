import React, { useState } from 'react'
import { useQuery } from "@tanstack/react-query"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ReloadIcon } from "@radix-ui/react-icons"

import { iPostApiResponseCode } from '@/types/iGeneral'
import { iGetInfraredApiResponse } from '@/types/iFeatures'
import { login, features } from '@/config.ts'

const cmd='http://'+login.url+':'+login.port+'/param.cgi?cmd='
const auth='&user='+login.user+'&pwd='+login.password
const getparam=features.infrared.param.get
const setparam=features.infrared.param.set
const keyinfraredstat=features.infrared.key.infraredstat
const keyinfraredcutstat=features.infrared.key.infraredcutstat
const kedyinfraredtimer=features.infrared.key.infraredtimer
const keyinfraredday=features.infrared.key.infraredday
const keyinfrarednight=features.infrared.key.infrarednight

const fetchCameraState = async(param: string,): Promise<iGetInfraredApiResponse> => {
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

        const jsonData: iGetInfraredApiResponse = JSON.parse(cleanedTextResponse)
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
    const [infraredstat, setInfraredstat] = useState('')
    const [infraredcutstat, setInfraredcutstat] = useState('')
    const [infraredtimer, setInfraredtimer] = useState('')
    const [infraredday, setInfraredday] = useState('')
    const [infrarednight, setInfrarednight] = useState('')
    const {
        isLoading,
        isError,
        error,
        data: response
    } = useQuery<iGetInfraredApiResponse, Error>({
        queryKey: ['irctrlparams', { getparam }],
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
                        IR LED Status
                    </Label>
                        <Input
                            defaultValue={response?.infraredstat}
                            onChange={(e) => setInfraredstat(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyinfraredstat, infraredstat)}
                        }>Submit</Button>
                </div>
               <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        IRcut Filter
                    </Label>
                        <Input
                            defaultValue={response?.infraredcutstat}
                            onChange={(e) => setInfraredcutstat(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyinfraredcutstat, infraredcutstat)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        IR LED Schedule
                    </Label>
                        <Input
                            defaultValue={response?.infraredtimer}
                            onChange={(e) => setInfraredtimer(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, kedyinfraredtimer, infraredtimer)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        IR LED Day Schedule
                    </Label>
                        <Input
                            defaultValue={response?.infraredday}
                            onChange={(e) => setInfraredday(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyinfraredday, infraredday)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        IR LED Night Schedule
                    </Label>
                        <Input
                            defaultValue={response?.infrarednight}
                            onChange={(e) => setInfrarednight(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyinfrarednight, infrarednight)}
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

// import { iGetInfraredApiResponse } from '@/types/iFeatures'
// import { login, features } from '@/config.ts'

// const cmd='http://'+login.url+':'+login.port+'/param.cgi?cmd='
// const auth='&user='+login.user+'&pwd='+login.password
// const param=features.infrared

// const fetchData = async(param: string): Promise<iGetInfraredApiResponse> => {
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

//         const jsonData: iGetInfraredApiResponse = JSON.parse(cleanedTextResponse)

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
//     }: UseQueryResult<iGetInfraredApiResponse, Error> = useQuery<iGetInfraredApiResponse, Error>({
//         queryKey: ['irctrlparams', { param }],
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
//                         IR LED Status
//                     </Label>
//                     <Input id="name" value={data.infraredstat} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         IRcut Filter
//                     </Label>
//                     <Input id="name" value={data.infraredcutstat} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         IR LED Schedule
//                     </Label>
//                     <Input id="name" value={data.infraredtimer} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         IR LED Day Schedule
//                     </Label>
//                     <Input id="name" value={data.infraredday} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         IR LED Night Schedule
//                     </Label>
//                     <Input id="name" value={data.infrarednight} className="col-span-3" />
//                 </div>
//             </>
//     )

//     else return <Badge variant="outline" className='mb-2'>Huh?</Badge>
// }



















