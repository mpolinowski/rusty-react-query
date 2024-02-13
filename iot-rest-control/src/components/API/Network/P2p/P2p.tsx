import React, { useState } from 'react'
import { useQuery } from "@tanstack/react-query"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ReloadIcon } from "@radix-ui/react-icons"

import { iPostApiResponseCode } from '@/types/iGeneral'
import { iGetP2pApiResponse } from '@/types/iNetwork'
import { login, network } from '@/config.ts'

const cmd='http://'+login.url+':'+login.port+'/param.cgi?cmd='
const auth='&user='+login.user+'&pwd='+login.password
const getparam=network.p2p.param.get
const setparam=network.p2p.param.set
const keyenable=network.p2p.key.enable
const keyportmin=network.p2p.key.portmin
const keyportmax=network.p2p.key.portmax

const fetchCameraState = async(param: string,): Promise<iGetP2pApiResponse> => {
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

        const jsonData: iGetP2pApiResponse = JSON.parse(cleanedTextResponse)
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
    const [enable, setEnable] = useState('')
    const [portmin, setPortmin] = useState('')
    const [portmax, setPortmax] = useState('')
    const {
        isLoading,
        isError,
        error,
        data: response
    } = useQuery<iGetP2pApiResponse, Error>({
        queryKey: ['p2pparams', { getparam }],
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
                        Enable P2P Service
                    </Label>
                        <Input
                            defaultValue={response?.p2p_enable}
                            onChange={(e) => setEnable(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyenable, enable)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Min P2P Port
                    </Label>
                        <Input
                            defaultValue={response?.p2p_port_min}
                            onChange={(e) => setPortmin(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyportmin, portmin)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Max P2P Port
                    </Label>
                        <Input
                            defaultValue={response?.p2p_port_max}
                            onChange={(e) => setPortmax(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyportmax, portmax)}
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

// import {
//   SheetClose,
//   SheetContent,
//   SheetDescription,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
// } from "@/components/ui/sheet"

// import { iGetP2pApiResponse } from '@/types/iNetwork'
// import { login, network } from '@/config.ts'

// const cmd='http://'+login.url+':'+login.port+'/param.cgi?cmd='
// const auth='&user='+login.user+'&pwd='+login.password
// const param=network.p2p

// const fetchData = async(param: string): Promise<iGetP2pApiResponse> => {
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

//         const jsonData: iGetP2pApiResponse = JSON.parse(cleanedTextResponse)

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
//     }: UseQueryResult<iGetP2pApiResponse, Error> = useQuery<iGetP2pApiResponse, Error>({
//         queryKey: ['p2pparams', { param }],
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
//         <SheetContent className='overflow-y-auto min-w-max'>
//             <SheetHeader className='mb-7'>
//                 <SheetTitle>P2P</SheetTitle>
//                 <SheetDescription>
//                     Configure your cameras P2P parameters
//                 </SheetDescription>
//             </SheetHeader>
//             <div className="grid gap-4 py-4">
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Enable P2P Service
//                     </Label>
//                     <Input id="name" value={data.p2p_enable} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Min Port
//                     </Label>
//                     <Input id="name" value={data.p2p_port_min} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Max Port
//                     </Label>
//                     <Input id="name" value={data.p2p_port_max} className="col-span-3" />
//                 </div>
//             </div>
//             <SheetFooter>
//                 <SheetClose asChild>
//                     <Button type="submit">Save changes</Button>
//                 </SheetClose>
//             </SheetFooter>
//         </SheetContent>
//     )

//     else return <Badge variant="outline" className='mb-2'>Huh?</Badge>
// }



















