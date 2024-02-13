import React, { useState } from 'react'
import { useQuery } from "@tanstack/react-query"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ReloadIcon } from "@radix-ui/react-icons"

import { iPostApiResponseCode } from '@/types/iGeneral'
import { iGetMqttApiResponse } from '@/types/iSmarthome'
import { login, smarthome } from '@/config.ts'

const cmd='http://'+login.url+':'+login.port+'/param.cgi?cmd='
const auth='&user='+login.user+'&pwd='+login.password
const getparam=smarthome.mqtt.param.get
const setparam=smarthome.mqtt.param.set
const keyenable=smarthome.mqtt.key.enable
const keybroker=smarthome.mqtt.key.broker
const keybroker_ws=smarthome.mqtt.key.broker_ws
const keybroker_ws_port=smarthome.mqtt.key.broker_ws_port
const keybroker_ws_portssl=smarthome.mqtt.key.broker_ws_portssl
const keybroker_min_tls=smarthome.mqtt.key.broker_min_tls
const keyhost=smarthome.mqtt.key.host
const keyport=smarthome.mqtt.key.port
const keyportssl=smarthome.mqtt.key.portssl
const keyssl=smarthome.mqtt.key.ssl
const keyauth=smarthome.mqtt.key.auth
const keyuser=smarthome.mqtt.key.user
const keypassword=smarthome.mqtt.key.password
const keyinsecure=smarthome.mqtt.key.insecure
const keyprefix=smarthome.mqtt.key.prefix
const keylwt=smarthome.mqtt.key.lwt
const keylwmon=smarthome.mqtt.key.lwmon
const keylwmoff=smarthome.mqtt.key.lwmoff
const keyclientid=smarthome.mqtt.key.clientid
const keyqos=smarthome.mqtt.key.qos

const fetchCameraState = async(param: string,): Promise<iGetMqttApiResponse> => {
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

        const jsonData: iGetMqttApiResponse = JSON.parse(cleanedTextResponse)
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
    const [enable, setEnable] = useState('')
    const [broker, setBroker] = useState('')
    const [broker_ws, setBroker_ws] = useState('')
    const [broker_ws_port, setBroker_ws_port] = useState('')
    const [broker_ws_portssl, setBroker_ws_portssl] = useState('')
    const [broker_min_tls, setBroker_min_tls] = useState('')
    const [port, setPort] = useState('')
    const [host, setHost] = useState('')
    const [portssl, setPortssl] = useState('')
    const [ssl, setSsl] = useState('')
    const [auth, setAuth] = useState('')
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [insecure, setInsecure] = useState('')
    const [prefix, setPrefix] = useState('')
    const [lwt, setLwt] = useState('')
    const [lwmon, setLwmon] = useState('')
    const [lwmoff, setLwmoff] = useState('')
    const [clientid, setClientid] = useState('')
    const [qos, setQos] = useState('')
    const {
        isLoading,
        isError,
        error,
        data: response
    } = useQuery<iGetMqttApiResponse, Error>({
        queryKey: ['mqttparams', { getparam }],
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
                        Enable MQTT
                    </Label>
                        <Input
                            defaultValue={response?.mq_enable}
                            onChange={(e) => setEnable(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyenable, enable)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Use External Broker
                    </Label>
                        <Input
                            defaultValue={response?.mq_broker}
                            onChange={(e) => setBroker(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keybroker, broker)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Enable Websocket Support
                    </Label>
                        <Input
                            defaultValue={response?.mq_broker_ws}
                            onChange={(e) => setBroker_ws(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keybroker_ws, broker_ws)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Broker WS Port
                    </Label>
                        <Input
                            defaultValue={response?.mq_broker_ws_port}
                            onChange={(e) => setBroker_ws_port(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keybroker_ws_port, broker_ws_port)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Broker WS TLS Port
                    </Label>
                        <Input
                            defaultValue={response?.mq_broker_ws_portssl}
                            onChange={(e) => setBroker_ws_portssl(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keybroker_ws_portssl, broker_ws_portssl)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Minimum TLS Version
                    </Label>
                        <Input
                            defaultValue={response?.mq_broker_min_tls}
                            onChange={(e) => setBroker_min_tls(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keybroker_min_tls, broker_min_tls)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Broker IP
                    </Label>
                        <Input
                            defaultValue={response?.mq_host}
                            onChange={(e) => setHost(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyhost, host)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Broker Port
                    </Label>
                        <Input
                            defaultValue={response?.mq_port}
                            onChange={(e) => setPort(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyport, port)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Broker TLS Port
                    </Label>
                        <Input
                            defaultValue={response?.mq_portssl}
                            onChange={(e) => setPortssl(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyportssl, portssl)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Enable TLS Encryption
                    </Label>
                        <Input
                            defaultValue={response?.mq_ssl}
                            onChange={(e) => setSsl(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyssl, ssl)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Enable Client Authentication
                    </Label>
                        <Input
                            defaultValue={response?.mq_auth}
                            onChange={(e) => setAuth(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyauth, auth)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        MQTT Client Username
                    </Label>
                        <Input
                            defaultValue={response?.mq_user}
                            onChange={(e) => setUser(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyuser, user)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        MQTT Client Password
                    </Label>
                        <Input
                            defaultValue={response?.mq_pass}
                            onChange={(e) => setPassword(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keypassword, password)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Verify TLS Certificate
                    </Label>
                        <Input
                            defaultValue={response?.mq_insecure}
                            onChange={(e) => setInsecure(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyinsecure, insecure)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        MQTT Client Prefix
                    </Label>
                        <Input
                            defaultValue={response?.mq_prefix}
                            onChange={(e) => setPrefix(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyprefix, prefix)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        MQTT Client LWT
                    </Label>
                        <Input
                            defaultValue={response?.mq_lwt}
                            onChange={(e) => setLwt(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keylwt, lwt)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        MQTT Client LWT Online
                    </Label>
                        <Input
                            defaultValue={response?.mq_lwmon}
                            onChange={(e) => setLwmon(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keylwmon, lwmon)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        MQTT Client LWT Offline
                    </Label>
                        <Input
                            defaultValue={response?.mq_lwmoff}
                            onChange={(e) => setLwmoff(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keylwmoff, lwmoff)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        MQTT Client ID
                    </Label>
                        <Input
                            defaultValue={response?.mq_clientid}
                            onChange={(e) => setClientid(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyclientid, clientid)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        MQTT QoS
                    </Label>
                        <Input
                            defaultValue={response?.mq_qos}
                            onChange={(e) => setQos(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyqos, qos)}
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

// import { iGetMqttApiResponse } from '@/types/iSmarthome'
// import { login, smarthome } from '@/config.ts'

// const cmd='http://'+login.url+':'+login.port+'/param.cgi?cmd='
// const auth='&user='+login.user+'&pwd='+login.password
// const param=smarthome.mqtt

// const fetchData = async(param: string): Promise<iGetMqttApiResponse> => {
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

//         const jsonData: iGetMqttApiResponse = JSON.parse(cleanedTextResponse)

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
//     }: UseQueryResult<iGetMqttApiResponse, Error> = useQuery<iGetMqttApiResponse, Error>({
//         queryKey: ['mqttparams', { param }],
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
//                 <SheetTitle>MQTT</SheetTitle>
//                 <SheetDescription>
//                     Configure your cameras MQTT parameters
//                 </SheetDescription>
//             </SheetHeader>
//             <div className="grid gap-4 py-4">
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Enable MQTT
//                     </Label>
//                     <Input id="name" value={data.mq_enable} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Enable Websocket Support
//                     </Label>
//                     <Input id="name" value={data.mq_broker_ws} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Use External Broker
//                     </Label>
//                     <Input id="name" value={data.mq_broker} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Broker IP
//                     </Label>
//                     <Input id="name" value={data.mq_host} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Enable TLS Encryption
//                     </Label>
//                     <Input id="name" value={data.mq_ssl} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Minimum TLS Version
//                     </Label>
//                     <Input id="name" value={data.mq_broker_min_tls} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Verify TLS Certificate
//                     </Label>
//                     <Input id="name" value={data.mq_insecure} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="username" className="text-right">
//                         Broker Port
//                     </Label>
//                     <Input id="username" value={data.mq_port} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="username" className="text-right">
//                         Broker TLS Port
//                     </Label>
//                     <Input id="username" value={data.mq_portssl} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="username" className="text-right">
//                         Broker WS Port
//                     </Label>
//                     <Input id="username" value={data.mq_broker_ws_port} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="username" className="text-right">
//                         Broker WS TLS Port
//                     </Label>
//                     <Input id="username" value={data.mq_broker_ws_portssl} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         MQTT QoS
//                     </Label>
//                     <Input id="name" value={data.mq_qos} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         MQTT Client ID
//                     </Label>
//                     <Input id="name" value={data.mq_clientid} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Enable Client Authentication
//                     </Label>
//                     <Input id="name" value={data.mq_auth} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         MQTT Client Username
//                     </Label>
//                     <Input id="name" value={data.mq_user} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         MQTT Client Password
//                     </Label>
//                     <Input id="name" value="*****" className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         MQTT Client Prefix
//                     </Label>
//                     <Input id="name" value={data.mq_prefix} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         MQTT Client LWT
//                     </Label>
//                     <Input id="name" value={data.mq_lwt} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         MQTT Client LWT Online
//                     </Label>
//                     <Input id="name" value={data.mq_lwmon} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         MQTT Client LWT Offline
//                     </Label>
//                     <Input id="name" value={data.mq_lwmoff} className="col-span-3" />
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



















