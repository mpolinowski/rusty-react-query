import React, { useState } from 'react'
import { useQuery } from "@tanstack/react-query"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ReloadIcon } from "@radix-ui/react-icons"

import { iPostApiResponseCode } from '@/types/iGeneral'
import { iGetFtpAttrApiResponse } from '@/types/iFeatures'
import { login, features } from '@/config.ts'

const cmd='http://'+login.url+':'+login.port+'/param.cgi?cmd='
const auth='&user='+login.user+'&pwd='+login.password
const getparam=features.ftpattr.param.get
const setparam=features.ftpattr.param.set
const keyserver=features.ftpattr.key.server
const keyport=features.ftpattr.key.port
const keyusername=features.ftpattr.key.username
const keydirname=features.ftpattr.key.dirname
const keydirmode=features.ftpattr.key.dirmode
const keymode=features.ftpattr.key.mode
const keyssl=features.ftpattr.key.ssl
const keyinsecure=features.ftpattr.key.insecure

const fetchCameraState = async(param: string,): Promise<iGetFtpAttrApiResponse> => {
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

        const jsonData: iGetFtpAttrApiResponse = JSON.parse(cleanedTextResponse)
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
    const [server, setServer] = useState('')
    const [port, setPort] = useState('')
    const [username, setUsername] = useState('')
    const [dirname, setDirname] = useState('')
    const [dirmode, setDirmode] = useState('')
    const [mode, setMode] = useState('')
    const [ssl, setSsl] = useState('')
    const [insecure, setInsecure] = useState('')
    const {
        isLoading,
        isError,
        error,
        data: response
    } = useQuery<iGetFtpAttrApiResponse, Error>({
        queryKey: ['ftpparams', { getparam }],
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
                        FTP Server
                    </Label>
                        <Input
                            defaultValue={response?.ft_server}
                            onChange={(e) => setServer(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyserver, server)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        FTP Server Port
                    </Label>
                        <Input
                            defaultValue={response?.ft_port}
                            onChange={(e) => setPort(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyport, port)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        FTP Server Encryption
                    </Label>
                        <Input
                            defaultValue={response?.ft_username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyusername, username)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        FTP Server Insecure
                    </Label>
                        <Input
                            defaultValue={response?.ft_dirname}
                            onChange={(e) => setDirname(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keydirname, dirname)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        FTP Server Username
                    </Label>
                        <Input
                            defaultValue={response?.ft_dirmode}
                            onChange={(e) => setDirmode(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keydirmode, dirmode)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Mail Sender Directory
                    </Label>
                        <Input
                            defaultValue={response?.ft_mode}
                            onChange={(e) => setMode(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keymode, mode)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        FTP Server Directory Mode
                    </Label>
                        <Input
                            defaultValue={response?.ft_ssl}
                            onChange={(e) => setSsl(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyssl, ssl)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        FTP Server Mode
                    </Label>
                        <Input
                            defaultValue={response?.ft_insecure}
                            onChange={(e) => setInsecure(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyinsecure, insecure)}
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

// import { iGetFtpAttrApiResponse } from '@/types/iFeatures'
// import { login, features } from '@/config.ts'

// const cmd='http://'+login.url+':'+login.port+'/param.cgi?cmd='
// const auth='&user='+login.user+'&pwd='+login.password
// const param=features.ftpattr

// const fetchData = async(param: string): Promise<iGetFtpAttrApiResponse> => {
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

//         const jsonData: iGetFtpAttrApiResponse = JSON.parse(cleanedTextResponse)

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
//     }: UseQueryResult<iGetFtpAttrApiResponse, Error> = useQuery<iGetFtpAttrApiResponse, Error>({
//         queryKey: ['ftpparams', { param }],
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
//                         FTP Server
//                     </Label>
//                     <Input id="name" value={data.ft_server} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         FTP Server Port
//                     </Label>
//                     <Input id="name" value={data.ft_port} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         FTP Server Encryption
//                     </Label>
//                     <Input id="name" value={data.ft_ssl} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         FTP Server Insecure
//                     </Label>
//                     <Input id="name" value={data.ft_insecure} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         FTP Server Username
//                     </Label>
//                     <Input id="name" value={data.ft_username} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Mail Sender Directory
//                     </Label>
//                     <Input id="name" value={data.ft_dirname} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         FTP Server Directory Mode
//                     </Label>
//                     <Input id="name" value={data.ft_dirmode} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         FTP Server Mode
//                     </Label>
//                     <Input id="name" value={data.ft_mode} className="col-span-3" />
//                 </div>
//             </>
//     )

//     else return <Badge variant="outline" className='mb-2'>Huh?</Badge>
// }



















