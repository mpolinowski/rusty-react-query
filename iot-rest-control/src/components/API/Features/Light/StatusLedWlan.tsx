import React, { useState } from 'react'
import { useQuery } from "@tanstack/react-query"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ReloadIcon } from "@radix-ui/react-icons"

import { iPostApiResponseCode } from '@/types/iGeneral'
import { iGetLightAttrApiResponse } from '@/types/iFeatures'
import { login, features } from '@/config.ts'

const cmd='http://'+login.url+':'+login.port+'/param.cgi?cmd='
const auth='&user='+login.user+'&pwd='+login.password
const getparam=features.lightattr.param.get
const setparam=features.lightattr.param.set
const type=features.lightattr.type.wifi
const keyenable=features.lightattr.key.enable

const fetchCameraState = async(param: string,): Promise<iGetLightAttrApiResponse> => {
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

        const jsonData: iGetLightAttrApiResponse = JSON.parse(cleanedTextResponse)
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
    const {
        isLoading,
        isError,
        error,
        data: response
    } = useQuery<iGetLightAttrApiResponse, Error>({
        queryKey: ['statusledwlanparams', { getparam }],
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
                        Enable PIR LED Trigger
                    </Label>
                        <Input
                            defaultValue={response?.light_enable}
                            onChange={(e) => setEnable(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyenable, enable)}
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

// import { iGetLightAttrApiResponse } from '@/types/iFeatures'
// import { login, features } from '@/config.ts'

// const cmd='http://'+login.url+':'+login.port+'/param.cgi?cmd='
// const auth='&user='+login.user+'&pwd='+login.password
// const param=features.lightattr.param
// const type=features.lightattr.wifi

// const fetchData = async(param: string): Promise<iGetLightAttrApiResponse> => {
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

//         const jsonData: iGetLightAttrApiResponse = JSON.parse(cleanedTextResponse)

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
//     }: UseQueryResult<iGetLightAttrApiResponse, Error> = useQuery<iGetLightAttrApiResponse, Error>({
//         queryKey: ['statusledwlanparams', { param }],
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
//                         Enable WLAN Status LED
//                     </Label>
//                     <Input id="name" value={data.light_enable} className="col-span-3" />
//                 </div>
//             </>
//     )

//     else return <Badge variant="outline" className='mb-2'>Huh?</Badge>
// }



















