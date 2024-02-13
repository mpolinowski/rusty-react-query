import React, { useState } from 'react'
import { useQuery } from "@tanstack/react-query"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ReloadIcon } from "@radix-ui/react-icons"

import { iPostApiResponseCode } from '@/types/iGeneral'
import { iGetServerInfoApiResponse } from '@/types/iSystem'
import { login, system } from '@/config.ts'

const cmd='http://'+login.url+':'+login.port+'/param.cgi?cmd='
const auth='&user='+login.user+'&pwd='+login.password
const getparam=system.serverinfo.param.get
const setparam=system.serverinfo.param.set
const keymodel=system.serverinfo.key.model
const keyhardVersion=system.serverinfo.key.hardVersion
const keysysVersion=system.serverinfo.key.sysVersion
const keysoftVersion=system.serverinfo.key.softVersion
const keywebVersion=system.serverinfo.key.webVersion
const keyname=system.serverinfo.key.name
const keystartdate=system.serverinfo.key.startdate

const fetchCameraState = async(param: string,): Promise<iGetServerInfoApiResponse> => {
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

        const jsonData: iGetServerInfoApiResponse = JSON.parse(cleanedTextResponse)
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
    const [model, setModel] = useState('')
    const [hardVersion, setHardVersion] = useState('')
    const [sysVersion, setSysVersion] = useState('')
    const [softVersion, setSoftVersion] = useState('')
    const [webVersion, setWebVersion] = useState('')
    const [name, setName] = useState('')
    const [startdate, setStartdate] = useState('')
    const {
        isLoading,
        isError,
        error,
        data: response
    } = useQuery<iGetServerInfoApiResponse, Error>({
        queryKey: ['alexaparams', { getparam }],
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
                        Camera Model
                    </Label>
                        <Input
                            defaultValue={response?.model}
                            onChange={(e) => setModel(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keymodel, model)}
                        } disabled>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Hardware Version
                    </Label>
                        <Input
                            defaultValue={response?.hardVersion}
                            onChange={(e) => setHardVersion(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyhardVersion, hardVersion)}
                        } disabled>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        System Version
                    </Label>
                        <Input
                            defaultValue={response?.sysVersion}
                            onChange={(e) => setSysVersion(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keysysVersion, sysVersion)}
                        } disabled>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Software Version
                    </Label>
                        <Input
                            defaultValue={response?.softVersion}
                            onChange={(e) => setSoftVersion(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keysoftVersion, softVersion)}
                        } disabled>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Web Version
                    </Label>
                        <Input
                            defaultValue={response?.webVersion}
                            onChange={(e) => setWebVersion(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keywebVersion, webVersion)}
                        } disabled>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Camera Name
                    </Label>
                        <Input
                            defaultValue={response?.name}
                            onChange={(e) => setName(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyname, name)}
                        } disabled>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Start Date
                    </Label>
                        <Input
                            defaultValue={response?.startdate}
                            onChange={(e) => setStartdate(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keystartdate, startdate)}
                        } disabled>Submit</Button>
                </div>
            </>
    )
}