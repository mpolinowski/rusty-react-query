import React from 'react'
import { useQuery } from "@tanstack/react-query"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ReloadIcon } from "@radix-ui/react-icons"

// import { iGetServerLogApiResponse } from '@/types/iSystem'
import { login, system } from '@/config.ts'

const cmd='http://'+login.url+':'+login.port+'/param.cgi?cmd='
const auth='&user='+login.user+'&pwd='+login.password
const getparam=system.syslog.param.get

const fetchCameraState = async(param: string,): Promise<string> => {
    console.log(cmd+param+auth)
    const response = await fetch(cmd+param+auth)
    const cmdQuery = 'cmd="'+param+'";'

    if (response.ok) {
        const cleanedTextResponse = (await response.text())
        .replace(cmdQuery, '')
        .replace('response="200";', '')
        .replace('log="', '')
        .replace('";', '' )
        // .replace(cmdQuery, '{"')
        // .replace('response="200";', '}')
        // .replace(/=/g, '":')
        // .replace(/";/g, '","')
        // .replace(/\s/g, '')
        // .replace(/","}/g, '"}')
        console.log(cleanedTextResponse)

        // const jsonData: iGetServerLogApiResponse = JSON.parse(cleanedTextResponse)
        // console.log(jsonData)
        return cleanedTextResponse
    }
    throw new Error('ERROR :: Data fetching failed!')
}

export function SysLog(): React.JSX.Element {
    const {
        isLoading,
        isError,
        error,
        data: response
    } = useQuery<string, Error>({
        queryKey: ['syslogparams', { getparam }],
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
                    {/* <Label htmlFor="name" className="text-left min-w-40">
                        System Log
                    </Label>
                    <Textarea placeholder={response} /> */}
                    <ScrollArea className="whitespace-pre text-left h-[300px] w-full rounded-md border mt-4 p-4">
                        <h3>Event log:</h3>
                        {response}
                    </ScrollArea>
                </div>
            </>
    )
}