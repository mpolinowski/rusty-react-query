import React, { useState } from 'react'
import { useQuery } from "@tanstack/react-query"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ReloadIcon } from "@radix-ui/react-icons"

import { iPostApiResponseCode } from '@/types/iGeneral'
import { iGetUserInfoApiResponse } from '@/types/iSystem'
import { login, system } from '@/config.ts'

const cmd='http://'+login.url+':'+login.port+'/param.cgi?cmd='
const auth='&user='+login.user+'&pwd='+login.password
const getparam=system.userinfo.param.get
const setparam=system.userinfo.param.set
const keyuserid=system.userinfo.key.userid
const keyusername=system.userinfo.key.username
const keyauthlevel=system.userinfo.key.authlevel
const keyenable=system.userinfo.key.enable
const keylancode=system.userinfo.key.lancode
const keyauthexpire=system.userinfo.key.authexpire

const fetchCameraState = async(param: string,): Promise<iGetUserInfoApiResponse> => {
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

        const jsonData: iGetUserInfoApiResponse = JSON.parse(cleanedTextResponse)
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
    const [userid, setUserid] = useState('')
    const [username, setUsername] = useState('')
    const [authlevel, setAuthlevel] = useState('')
    const [enable, setEnable] = useState('')
    const [lancode, setLancode] = useState('')
    const [authexpire, setAuthexpire] = useState('')
    const {
        isLoading,
        isError,
        error,
        data: response
    } = useQuery<iGetUserInfoApiResponse, Error>({
        queryKey: ['rebootflagparams', { getparam }],
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
                        User ID
                    </Label>
                        <Input
                            defaultValue={response?.at_userid}
                            onChange={(e) => setUserid(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyuserid, userid)}
                        } disabled>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Username
                    </Label>
                        <Input
                            defaultValue={response?.at_username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyusername, username)}
                        } disabled>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Enable
                    </Label>
                        <Input
                            defaultValue={response?.at_enable}
                            onChange={(e) => setEnable(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyenable, enable)}
                        } disabled>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Language Code
                    </Label>
                        <Input
                            defaultValue={response?.at_lancode}
                            onChange={(e) => setLancode(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keylancode, lancode)}
                        } disabled>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Auth Level
                    </Label>
                        <Input
                            defaultValue={response?.at_authlevel}
                            onChange={(e) => setAuthlevel(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyauthlevel, authlevel)}
                        } disabled>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Auth Expire
                    </Label>
                        <Input
                            defaultValue={response?.at_authexpire}
                            onChange={(e) => setAuthexpire(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyauthexpire, authexpire)}
                        } disabled>Submit</Button>
                </div>
        </>
    )
}