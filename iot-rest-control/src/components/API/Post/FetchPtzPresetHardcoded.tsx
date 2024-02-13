import React from 'react'
import { useQuery, UseQueryResult } from "@tanstack/react-query"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"

import { login } from '@/config.ts'
import { iPostApiResponseCode } from '@/types/iGeneral'

const cmd='http://'+login.url+':'+login.port+'/param.cgi?cmd='
const auth='&user='+login.user+'&pwd='+login.password
const param='getptzpreset'
const act='&act=goto&index='
const value='1'

const fetchData = async(param: string, value: string): Promise<iPostApiResponseCode> => {
    console.log(cmd+param+act+value+auth)
    const response = await fetch(cmd+param+act+value+auth)
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

export default function GoTo(): React.JSX.Element {

    const {
        isLoading,
        isError,
        error,
        data: response,
        isSuccess
    }: UseQueryResult<iPostApiResponseCode, Error> = useQuery<iPostApiResponseCode, Error>({
        queryKey: ['ptzpresetparams', { param, value }],
        queryFn: () => fetchData(param, value),
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        retry: false,
        retryOnMount: false,
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

    if(isSuccess) return <p>Response Code: {response?.code}</p>

    else return <Badge variant="outline" className='mb-2'>Huh?</Badge>
}



















