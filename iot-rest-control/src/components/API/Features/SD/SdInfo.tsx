import React, { useState } from 'react'
import { useQuery } from "@tanstack/react-query"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ReloadIcon } from "@radix-ui/react-icons"

import { iPostApiResponseCode } from '@/types/iGeneral'
import { iGetSdInfoApiResponse } from '@/types/iFeatures'
import { login, features } from '@/config.ts'

const cmd='http://'+login.url+':'+login.port+'/param.cgi?cmd='
const auth='&user='+login.user+'&pwd='+login.password
const getparam=features.sdinfo.param.get
const setparam=features.sdinfo.param.set
const keysdstatus=features.sdinfo.key.sdstatus
const keysdfreespace=features.sdinfo.key.sdfreespace
const keysdtotalspace=features.sdinfo.key.sdtotalspace

const fetchCameraState = async(param: string,): Promise<iGetSdInfoApiResponse> => {
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

        const jsonData: iGetSdInfoApiResponse = JSON.parse(cleanedTextResponse)
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
    const [sdstatus, setSdstatus] = useState('')
    const [sdfreespace, setSdfreespace] = useState('')
    const [sdtotalspace, setSdtotalspace] = useState('')
    const {
        isLoading,
        isError,
        error,
        data: response
    } = useQuery<iGetSdInfoApiResponse, Error>({
        queryKey: ['sdinfo', { getparam }],
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
                        SD Card Status
                    </Label>
                        <Input
                            defaultValue={response?.sdstatus}
                            onChange={(e) => setSdstatus(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keysdstatus, sdstatus)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        SD Card Freespace
                    </Label>
                        <Input
                            defaultValue={response?.sdfreespace}
                            onChange={(e) => setSdfreespace(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keysdfreespace, sdfreespace)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        SD Card Total Space
                    </Label>
                        <Input
                            defaultValue={response?.sdtotalspace}
                            onChange={(e) => setSdtotalspace(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keysdtotalspace, sdtotalspace)}
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

// import { iGetSdInfoApiResponse } from '@/types/iFeatures'
// import { login, features } from '@/config.ts'

// const cmd='http://'+login.url+':'+login.port+'/param.cgi?cmd='
// const auth='&user='+login.user+'&pwd='+login.password
// const param=features.sdinfo

// const fetchData = async(param: string): Promise<iGetSdInfoApiResponse> => {
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

//         const jsonData: iGetSdInfoApiResponse = JSON.parse(cleanedTextResponse)

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
//     }: UseQueryResult<iGetSdInfoApiResponse, Error> = useQuery<iGetSdInfoApiResponse, Error>({
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
//                         SD Card Status
//                     </Label>
//                     <Input id="name" value={data.sdstatus} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         SD Card Freespace
//                     </Label>
//                     <Input id="name" value={data.sdfreespace} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         SD Card Total Space
//                     </Label>
//                     <Input id="name" value={data.sdtotalspace} className="col-span-3" />
//                 </div>
//             </>
//     )

//     else return <Badge variant="outline" className='mb-2'>Huh?</Badge>
// }



















