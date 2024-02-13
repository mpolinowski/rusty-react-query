import React, { useState } from 'react'
import { useQuery } from "@tanstack/react-query"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ReloadIcon } from "@radix-ui/react-icons"

import { iPostApiResponseCode } from '@/types/iGeneral'
import { iGetAlarmserverApiResponse } from '@/types/iSmarthome'
import { login, smarthome } from '@/config.ts'

const cmd='http://'+login.url+':'+login.port+'/param.cgi?cmd='
const auth='&user='+login.user+'&pwd='+login.password
const getparam=smarthome.as.param.get
const setparam=smarthome.as.param.set
const type=smarthome.as.type.asServer2
const keyserver=smarthome.as.key.server
const keyport=smarthome.as.key.port
const keyssl=smarthome.as.key.ssl
const keymode=smarthome.as.key.mode
const keyauth=smarthome.as.key.auth
const keyusername=smarthome.as.key.username
const keypath=smarthome.as.key.path
const keyarea=smarthome.as.key.area
const keyio=smarthome.as.key.io
const keyaudio=smarthome.as.key.audio
const keyareaio=smarthome.as.key.areaio
const keyactivequery=smarthome.as.key.activequery
const keyquery1=smarthome.as.key.query1
const keyqueryattr1=smarthome.as.key.queryattr1
const keyqueryval1=smarthome.as.key.queryval1
const keyquery2=smarthome.as.key.query2
const keyqueryattr2=smarthome.as.key.queryattr2
const keyqueryval2=smarthome.as.key.queryval2
const keyquery3=smarthome.as.key.query3
const keyqueryattr3=smarthome.as.key.queryattr3
const keyqueryval3=smarthome.as.key.queryval3
const keyquery4=smarthome.as.key.query4
const keyqueryattr4=smarthome.as.key.queryattr4
const keyqueryval4=smarthome.as.key.queryval4
const keyquery5=smarthome.as.key.query5
const keyqueryattr5=smarthome.as.key.queryattr5
const keyqueryval5=smarthome.as.key.queryval5
const keyinsecure=smarthome.as.key.insecure

const fetchCameraState = async(param: string,): Promise<iGetAlarmserverApiResponse> => {
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

        const jsonData: iGetAlarmserverApiResponse = JSON.parse(cleanedTextResponse)
        console.log(jsonData)
        return jsonData
    }
    throw new Error('ERROR :: Data fetching failed!')
}

const updateCameraState = async(
        param: string, key: string, value: string
    ): Promise<iPostApiResponseCode> => {
    console.log(cmd+param+type+key+value+auth)
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
    const [server, setServer] = useState('')
    const [port, setPort] = useState('')
    const [ssl, setSsl] = useState('')
    const [mode, setMode] = useState('')
    const [auth, setAuth] = useState('')
    const [username, setUsername] = useState('')
    const [path, setPath] = useState('')
    const [area, setArea] = useState('')
    const [io, setIo] = useState('')
    const [audio, setAudio] = useState('')
    const [areaio, setAreaio] = useState('')
    const [activequery, setActivequery] = useState('')
    const [query1, setQuery1] = useState('')
    const [queryattr1, setQueryattr1] = useState('')
    const [queryval1, setQueryval1] = useState('')
    const [query2, setQuery2] = useState('')
    const [queryattr2, setQueryattr2] = useState('')
    const [queryval2, setQueryval2] = useState('')
    const [query3, setQuery3] = useState('')
    const [queryattr3, setQueryattr3] = useState('')
    const [queryval3, setQueryval3] = useState('')
    const [query4, setQuery4] = useState('')
    const [queryattr4, setQueryattr4] = useState('')
    const [queryval4, setQueryval4] = useState('')
    const [query5, setQuery5] = useState('')
    const [queryattr5, setQueryattr5] = useState('')
    const [queryval5, setQueryval5] = useState('')
    const [insecure, setInsecure] = useState('')
    const {
        isLoading,
        isError,
        error,
        data: response
    } = useQuery<iGetAlarmserverApiResponse, Error>({
        queryKey: ['alarmserverparams1', { getparam }],
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
                <div className="flex mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Enable 2nd Alarmserver
                    </Label>
                        <Input
                            defaultValue={response?.as_server}
                            onChange={(e) => setServer(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyserver, server)}
                        }>Submit</Button>
                </div>
                <div className="flex mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Alarmserver Port
                    </Label>
                        <Input
                            defaultValue={response?.as_port}
                            onChange={(e) => setPort(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyport, port)}
                        }>Submit</Button>
                </div>
                <div className="flex mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Enable TLS Encryption
                    </Label>
                        <Input
                            defaultValue={response?.as_ssl}
                            onChange={(e) => setSsl(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyssl, ssl)}
                        }>Submit</Button>
                </div>
                <div className="flex mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Alarmserver Modus
                    </Label>
                        <Input
                            defaultValue={response?.as_mode}
                            onChange={(e) => setMode(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keymode, mode)}
                        }>Submit</Button>
                </div>
                <div className="flex mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Alarmserver Authentication
                    </Label>
                        <Input
                            defaultValue={response?.as_auth}
                            onChange={(e) => setAuth(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyauth, auth)}
                        }>Submit</Button>
                </div>
                <div className="flex mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Alarmserver Username
                    </Label>
                        <Input
                            defaultValue={response?.as_username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyusername, username)}
                        }>Submit</Button>
                </div>
                <div className="flex mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Webhook Path
                    </Label>
                        <Input
                            defaultValue={response?.as_path}
                            onChange={(e) => setPath(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keypath, path)}
                        }>Submit</Button>
                </div>
                <div className="flex mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Couple Detection Areas
                    </Label>
                        <Input
                            defaultValue={response?.as_area}
                            onChange={(e) => setArea(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyarea, area)}
                        }>Submit</Button>
                </div>
                <div className="flex mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Couple Alarm I/O
                    </Label>
                        <Input
                            defaultValue={response?.as_io}
                            onChange={(e) => setIo(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyio, io)}
                        }>Submit</Button>
                </div>
                <div className="flex mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Couple Audio Detection
                    </Label>
                        <Input
                            defaultValue={response?.as_audio}
                            onChange={(e) => setAudio(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyaudio, audio)}
                        }>Submit</Button>
                </div>
                <div className="flex mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Couple Areas & IO
                    </Label>
                        <Input
                            defaultValue={response?.as_areaio}
                            onChange={(e) => setAreaio(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyareaio, areaio)}
                        }>Submit</Button>
                </div>
                <div className="flex mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Activate Query 1
                    </Label>
                        <Input
                            defaultValue={response?.as_activequery}
                            onChange={(e) => setActivequery(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyactivequery, activequery)}
                        }>Submit</Button>
                </div>
                <div className="flex mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Enable Query 1
                    </Label>
                        <Input
                            defaultValue={response?.as_query1}
                            onChange={(e) => setQuery1(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyquery1, query1)}
                        }>Submit</Button>
                </div>
                <div className="flex mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Query 1 Parameter
                    </Label>
                        <Input
                            defaultValue={response?.as_queryattr1}
                            onChange={(e) => setQueryattr1(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyqueryattr1, queryattr1)}
                        }>Submit</Button>
                </div>
                <div className="flex mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Query 1 Value
                    </Label>
                        <Input
                            defaultValue={response?.as_queryval1}
                            onChange={(e) => setQueryval1(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyqueryval1, queryval1)}
                        }>Submit</Button>
                </div>
                <div className="flex mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Enable Query 2
                    </Label>
                        <Input
                            defaultValue={response?.as_query2}
                            onChange={(e) => setQuery2(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyquery2, query2)}
                        }>Submit</Button>
                </div>
                <div className="flex mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Query 2 Parameter
                    </Label>
                        <Input
                            defaultValue={response?.as_queryattr2}
                            onChange={(e) => setQueryattr2(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyqueryattr2, queryattr2)}
                        }>Submit</Button>
                </div>
                <div className="flex mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Query 2 Value
                    </Label>
                        <Input
                            defaultValue={response?.as_queryval2}
                            onChange={(e) => setQueryval2(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyqueryval2, queryval2)}
                        }>Submit</Button>
                </div>
                <div className="flex mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Enable Query 3
                    </Label>
                        <Input
                            defaultValue={response?.as_query3}
                            onChange={(e) => setQuery3(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyquery3, query3)}
                        }>Submit</Button>
                </div>
                <div className="flex mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Query 3 Parameter
                    </Label>
                        <Input
                            defaultValue={response?.as_queryattr3}
                            onChange={(e) => setQueryattr3(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyqueryattr3, queryattr3)}
                        }>Submit</Button>
                </div>
                <div className="flex mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Query 3 Value
                    </Label>
                        <Input
                            defaultValue={response?.as_queryval3}
                            onChange={(e) => setQueryval3(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyqueryval3, queryval3)}
                        }>Submit</Button>
                </div>
                <div className="flex mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Enable Query 4
                    </Label>
                        <Input
                            defaultValue={response?.as_query4}
                            onChange={(e) => setQuery4(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyquery4, query4)}
                        }>Submit</Button>
                </div>
                <div className="flex mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Query 4 Parameter
                    </Label>
                        <Input
                            defaultValue={response?.as_queryattr4}
                            onChange={(e) => setQueryattr4(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyqueryattr4, queryattr4)}
                        }>Submit</Button>
                </div>
                <div className="flex mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Query 4 Value
                    </Label>
                        <Input
                            defaultValue={response?.as_queryval4}
                            onChange={(e) => setQueryval4(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyqueryval4, queryval4)}
                        }>Submit</Button>
                </div>
                <div className="flex mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Enable Query 5
                    </Label>
                        <Input
                            defaultValue={response?.as_query5}
                            onChange={(e) => setQuery5(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyquery5, query5)}
                        }>Submit</Button>
                </div>
                <div className="flex mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Query 5 Parameter
                    </Label>
                        <Input
                            defaultValue={response?.as_queryattr5}
                            onChange={(e) => setQueryattr5(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyqueryattr5, queryattr5)}
                        }>Submit</Button>
                </div>
                <div className="flex mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Query 5 Value
                    </Label>
                        <Input
                            defaultValue={response?.as_queryval5}
                            onChange={(e) => setQueryval5(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyqueryval5, queryval5)}
                        }>Submit</Button>
                </div>
                <div className="flex mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Installation Wizard
                    </Label>
                        <Input
                            defaultValue={response?.as_insecure}
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

// import {
//   SheetClose,
//   SheetContent,
//   SheetDescription,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
// } from "@/components/ui/sheet"

// import { iGetAlarmserverApiResponse } from '@/types/iSmarthome'
// import { login, smarthome } from '@/config.ts'

// const cmd='http://'+login.url+':'+login.port+'/param.cgi?cmd='
// const auth='&user='+login.user+'&pwd='+login.password
// const param=smarthome.as.param
// const server=smarthome.as.asServer1

// const fetchData = async(param: string): Promise<iGetAlarmserverApiResponse> => {
//     // console.log(cmd+query+auth)
//     const response = await fetch(cmd+param+server+auth)
//     const cmdQuery = 'cmd="'+param+'";'

//     if (response.ok) {
//         const cleanedTextResponse = (await response.text())
//         .replace(cmdQuery, '{"')
//         .replace('response="200";', '}')
//         .replace(/=/g, '":')
//         .replace(/";/g, '","')
//         .replace(/\s/g, '')
//         .replace(/","}/g, '"}')

//         const jsonData: iGetAlarmserverApiResponse = JSON.parse(cleanedTextResponse)

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
//     }: UseQueryResult<iGetAlarmserverApiResponse, Error> = useQuery<iGetAlarmserverApiResponse, Error>({
//         queryKey: ['alarmserverparams', { param }],
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
//         <SheetContent className='overflow-y-auto min-w-max'>
//             <SheetHeader className='mb-7'>
//                 <SheetTitle>Alarmserver</SheetTitle>
//                 <SheetDescription>
//                     Configure your cameras Alarmserver parameters
//                 </SheetDescription>
//             </SheetHeader>
//             <div className="grid gap-4 py-4">
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Enable 1st Alarmserver
//                     </Label>
//                     <Input id="name" value={data.as_server} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Alarmserver Port
//                     </Label>
//                     <Input id="name" value={data.as_port} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Enable TLS Encryption
//                     </Label>
//                     <Input id="name" value={data.as_ssl} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Alarmserver Modus
//                     </Label>
//                     <Input id="name" value={data.as_mode} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Alarmserver Authentication
//                     </Label>
//                     <Input id="name" value={data.as_auth} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Alarmserver Username
//                     </Label>
//                     <Input id="name" value={data.as_username} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Webhook Path
//                     </Label>
//                     <Input id="name" value={data.as_path} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="username" className="text-right">
//                         Couple Detection Areas
//                     </Label>
//                     <Input id="username" value={data.as_area} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="username" className="text-right">
//                         Couple Alarm I/O
//                     </Label>
//                     <Input id="username" value={data.as_io} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="username" className="text-right">
//                         Couple Audio Detection
//                     </Label>
//                     <Input id="username" value={data.as_audio} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="username" className="text-right">
//                         Couple Areas & IO
//                     </Label>
//                     <Input id="username" value={data.as_areaio} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Activate Query 1
//                     </Label>
//                     <Input id="name" value={data.as_activequery} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Query 1
//                     </Label>
//                     <Input id="name" value={data.as_query1} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Query 1 Parameter
//                     </Label>
//                     <Input id="name" value={data.as_queryattr1} className="col-span-3" />
//                 </div>
//             </div>
//             <SheetFooter>
//                 <SheetClose asChild>
//                     <Button type="submit">Save changes</Button>
//                 </SheetClose>
//             </SheetFooter>
//         </SheetContent>
//     )

//     else return <Badge variant="outline" className='mb-2'>Huh?</Badge>
// }



















