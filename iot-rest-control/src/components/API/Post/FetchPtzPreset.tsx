import React, { useState } from 'react'
import { useQuery, UseQueryResult } from "@tanstack/react-query"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { ReloadIcon } from "@radix-ui/react-icons"

import { login } from '@/config.ts'
import { iPostApiResponseCode } from '@/types/iGeneral'

const cmd='http://'+login.url+':'+login.port+'/param.cgi?cmd='
const auth='&user='+login.user+'&pwd='+login.password
const param='getptzpreset'
const act='&act=goto&index='

const fetchData = async(param: string, position: string): Promise<iPostApiResponseCode> => {
    // console.log(cmd+param+act+position+auth)
    const response = await fetch(cmd+param+act+position+auth)
    const cmdQuery = 'cmd="'+param+'";'

    if (response.ok) {
        const cleanedTextResponse = (await response.text())
        .replace(cmdQuery, '{')
        .replace('response="', '"code":')
        .replace('";', '}')

        // console.log(cleanedTextResponse)

        const jsonData: iPostApiResponseCode = JSON.parse(cleanedTextResponse)

        // console.log(jsonData)

        return jsonData
    }
    throw new Error('ERROR :: Data fetching failed!')
}

export default function GoTo(): React.JSX.Element {

    const [position, setPosition] = useState('')

    const {
        isLoading,
        isError,
        error
    }: UseQueryResult<iPostApiResponseCode, Error> = useQuery<iPostApiResponseCode, Error>({
        queryKey: ['ptzpresetparams', { param, position }],
        queryFn: () => fetchData(param, position),
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

    return (
        <>
            <DropdownMenu>
            <DropdownMenuTrigger>Presets</DropdownMenuTrigger>
            <DropdownMenuContent className='flex items-center flex-col'>
                <DropdownMenuLabel>Preset Positions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Button
                    variant='ghost'
                    className='w-full'
                    onClick={() => {setPosition('1')}}>Position 1</Button>
                <Button
                    variant='ghost'
                    className='w-full'
                    onClick={() => {setPosition('2')}}>Position 2</Button>
                <Button
                    variant='ghost'
                    className='w-full'
                    onClick={() => {setPosition('3')}}>Position 3</Button>
                <Button
                    variant='ghost'
                    className='w-full'
                    onClick={() => {setPosition('4')}}>Position 4</Button>
                <Button
                    variant='ghost'
                    className='w-full'
                    onClick={() => {setPosition('5')}}>Position 5</Button>
                <Button
                    variant='ghost'
                    className='w-full'
                    onClick={() => {setPosition('6')}}>Position 6</Button>
                <Button
                    variant='ghost'
                    className='w-full'
                    onClick={() => {setPosition('7')}}>Position 7</Button>
                <Button
                    variant='ghost'
                    className='w-full'
                    onClick={() => {setPosition('8')}}>Position 8</Button>
            </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}



















