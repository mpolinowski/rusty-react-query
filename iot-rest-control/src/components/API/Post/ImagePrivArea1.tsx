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
const getparam=multimedia.privacy.get
const setparam=multimedia.privacy.set
const type=multimedia.privacy.privacyarea1

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

        console.log(cleanedTextResponse)

        const jsonData: iPostApiResponseCode = JSON.parse(cleanedTextResponse)

        console.log(jsonData)

        return jsonData
    }
    throw new Error('ERROR :: Data fetching failed!')
}

export default function DataRequest(): React.JSX.Element {
    const [value, setValue] = useState('')
    const {
        isLoading,
        isError,
        error,
        data: response
    } = useQuery<iGetImageCoverApiResponse, Error>({
        queryKey: ['private1params', { getparam, type }],
        queryFn: () => fetchCameraState(getparam, type),
        staleTime: 1000 * 5,
        refetchOnMount: true,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
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
                        Enable Privacy Area 1
                    </Label>
                    <Input
                        defaultValue={response?.enable}
                        onChange={(e) => setValue(e.target.value)}
                        className="col-span-3"
                    />
                    <Button onClick={
                        () => {updateCameraState(setparam, type, value)}
                    }>Submit</Button>
                </div>
            </>
    )
}



















