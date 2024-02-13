import React, { useState } from 'react'
import { useQuery } from "@tanstack/react-query"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ReloadIcon } from "@radix-ui/react-icons"

import { iPostApiResponseCode } from '@/types/iGeneral'
import { iGetSmtpApiResponse } from '@/types/iFeatures'
import { login, features } from '@/config.ts'

const cmd='http://'+login.url+':'+login.port+'/param.cgi?cmd='
const auth='&user='+login.user+'&pwd='+login.password
const getparam=features.smtp.param.get
const setparam=features.smtp.param.set
const keyserver=features.smtp.key.server
const keyport=features.smtp.key.port
const keyssl=features.smtp.key.ssl
const keyusername=features.smtp.key.username
const keyfrom=features.smtp.key.from
const keyto=features.smtp.key.to
const keysubject=features.smtp.key.subject
const keytsubject=features.smtp.key.tsubject
const keytext=features.smtp.key.text

const fetchCameraState = async(param: string,): Promise<iGetSmtpApiResponse> => {
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

        const jsonData: iGetSmtpApiResponse = JSON.parse(cleanedTextResponse)
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
    const [ssl, setSsl] = useState('')
    const [username, setUsername] = useState('')
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [subject, setSubject] = useState('')
    const [tsubject, setTsubject] = useState('')
    const [text, setText] = useState('')
    const {
        isLoading,
        isError,
        error,
        data: response
    } = useQuery<iGetSmtpApiResponse, Error>({
        queryKey: ['smtpparams', { getparam }],
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
                        Enable Email Notifications
                    </Label>
                        <Input
                            defaultValue={response?.ma_server}
                            onChange={(e) => setServer(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyserver, server)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Enable Email Notifications
                    </Label>
                        <Input
                            defaultValue={response?.ma_port}
                            onChange={(e) => setPort(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyport, port)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Enable Email Notifications
                    </Label>
                        <Input
                            defaultValue={response?.ma_ssl}
                            onChange={(e) => setSsl(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyssl, ssl)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Enable Email Notifications
                    </Label>
                        <Input
                            defaultValue={response?.ma_username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyusername, username)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Enable Email Notifications
                    </Label>
                        <Input
                            defaultValue={response?.ma_from}
                            onChange={(e) => setFrom(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyfrom, from)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Enable Email Notifications
                    </Label>
                        <Input
                            defaultValue={response?.ma_to}
                            onChange={(e) => setTo(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyto, to)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Enable Email Notifications
                    </Label>
                        <Input
                            defaultValue={response?.ma_subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keysubject, subject)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Enable Email Notifications
                    </Label>
                        <Input
                            defaultValue={response?.ma_tsubject}
                            onChange={(e) => setTsubject(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keytsubject, tsubject)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Enable Email Notifications
                    </Label>
                        <Input
                            defaultValue={response?.ma_text}
                            onChange={(e) => setText(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keytext, text)}
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

// import { iGetSmtpApiResponse } from '@/types/iFeatures'
// import { login, features } from '@/config.ts'

// const cmd='http://'+login.url+':'+login.port+'/param.cgi?cmd='
// const auth='&user='+login.user+'&pwd='+login.password
// const param=features.smtp

// const fetchData = async(param: string): Promise<iGetSmtpApiResponse> => {
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

//         const jsonData: iGetSmtpApiResponse = JSON.parse(cleanedTextResponse)

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
//     }: UseQueryResult<iGetSmtpApiResponse, Error> = useQuery<iGetSmtpApiResponse, Error>({
//         queryKey: ['smtpparams', { param }],
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
//                         SMTP Server
//                     </Label>
//                     <Input id="name" value={data.ma_server} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         SMTP Server Port
//                     </Label>
//                     <Input id="name" value={data.ma_port} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         SMTP Server Encryption
//                     </Label>
//                     <Input id="name" value={data.ma_ssl} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         SMTP Server Username
//                     </Label>
//                     <Input id="name" value={data.ma_username} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Mail Sender
//                     </Label>
//                     <Input id="name" value={data.ma_from} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Mail Receiver
//                     </Label>
//                     <Input id="name" value={data.ma_to} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Mail Subject 
//                     </Label>
//                     <Input id="name" value={data.ma_subject} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Mail Server Body
//                     </Label>
//                     <Input id="name" value={data.ma_text} className="col-span-3" />
//                 </div>
//             </>
//     )

//     else return <Badge variant="outline" className='mb-2'>Huh?</Badge>
// }



















