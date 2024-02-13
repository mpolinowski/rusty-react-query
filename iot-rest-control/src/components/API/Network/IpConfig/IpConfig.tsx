import React, { useState } from 'react'
import { useQuery } from "@tanstack/react-query"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ReloadIcon } from "@radix-ui/react-icons"

import { iPostApiResponseCode } from '@/types/iGeneral'
import { iGetIpConfigApiResponse } from '@/types/iNetwork'
import { login, network } from '@/config.ts'

const cmd='http://'+login.url+':'+login.port+'/param.cgi?cmd='
const auth='&user='+login.user+'&pwd='+login.password
const getparam=network.ipconf.param.get
const setparam=network.ipconf.param.set
const keydhcpflag=network.ipconf.key.dhcpflag
const keyip=network.ipconf.key.ip
const keydnsstat=network.ipconf.key.dnsstat
const keynetmask=network.ipconf.key.netmask
const keygateway=network.ipconf.key.gateway
const keyfdnsip=network.ipconf.key.fdnsip
const keysdnsip=network.ipconf.key.sdnsip
const keynetworktype=network.ipconf.key.networktype
const keymacaddress=network.ipconf.key.macaddress

const fetchCameraState = async(param: string,): Promise<iGetIpConfigApiResponse> => {
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

        const jsonData: iGetIpConfigApiResponse = JSON.parse(cleanedTextResponse)
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
    const [dhcpflag, setDhcpflag] = useState('')
    const [ip, setIp] = useState('')
    const [dnsstat, setDnsstat] = useState('')
    const [netmask, setNetmask] = useState('')
    const [gateway, setGateway] = useState('')
    const [fdnsip, setFdnsip] = useState('')
    const [sdnsip, setSdnsip] = useState('')
    const [networktype, setNetworktype] = useState('')
    const [macaddress, setMacaddress] = useState('')
    const {
        isLoading,
        isError,
        error,
        data: response
    } = useQuery<iGetIpConfigApiResponse, Error>({
        queryKey: ['ipconfparams', { getparam }],
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
                        DHCP Service
                    </Label>
                        <Input
                            defaultValue={response?.dhcpflag}
                            onChange={(e) => setDhcpflag(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keydhcpflag, dhcpflag)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        IP Address
                    </Label>
                        <Input
                            defaultValue={response?.ip}
                            onChange={(e) => setIp(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyip, ip)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        DNS Status
                    </Label>
                        <Input
                            defaultValue={response?.dnsstat}
                            onChange={(e) => setDnsstat(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keydnsstat, dnsstat)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Network Mask
                    </Label>
                        <Input
                            defaultValue={response?.netmask}
                            onChange={(e) => setNetmask(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keynetmask, netmask)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Gateway
                    </Label>
                        <Input
                            defaultValue={response?.gateway}
                            onChange={(e) => setGateway(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keygateway, gateway)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Primary DNS Server
                    </Label>
                        <Input
                            defaultValue={response?.fdnsip}
                            onChange={(e) => setFdnsip(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyfdnsip, fdnsip)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Secondary DNS Server
                    </Label>
                        <Input
                            defaultValue={response?.sdnsip}
                            onChange={(e) => setSdnsip(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keysdnsip, sdnsip)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Network Type
                    </Label>
                        <Input
                            defaultValue={response?.networktype}
                            onChange={(e) => setNetworktype(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keynetworktype, networktype)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2 mb-3">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Active MAC Address
                    </Label>
                        <Input
                            defaultValue={response?.macaddress}
                            onChange={(e) => setMacaddress(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keymacaddress, macaddress)}
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

// import { iGetIpConfigApiResponse } from '@/types/iNetwork'
// import { login, network } from '@/config.ts'

// const cmd='http://'+login.url+':'+login.port+'/param.cgi?cmd='
// const auth='&user='+login.user+'&pwd='+login.password
// const param=network.ipconf

// const fetchData = async(param: string): Promise<iGetIpConfigApiResponse> => {
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

//         const jsonData: iGetIpConfigApiResponse = JSON.parse(cleanedTextResponse)

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
//     }: UseQueryResult<iGetIpConfigApiResponse, Error> = useQuery<iGetIpConfigApiResponse, Error>({
//         queryKey: ['ipconfparams', { param }],
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
//             <div className="grid gap-4 py-4">
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         DHCP Service
//                     </Label>
//                     <Input id="name" value={data.dhcpflag} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Camera IP
//                     </Label>
//                     <Input id="name" value={data.ip} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         DNS Status
//                     </Label>
//                     <Input id="name" value={data.dnsstat} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Network Mask
//                     </Label>
//                     <Input id="name" value={data.netmask} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Gateway
//                     </Label>
//                     <Input id="name" value={data.gateway} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Primary DNS Server
//                     </Label>
//                     <Input id="name" value={data.fdnsip} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Secondary DNS Server
//                     </Label>
//                     <Input id="name" value={data.sdnsip} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="username" className="text-right">
//                         Network Type
//                     </Label>
//                     <Input id="username" value={data.networktype} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="username" className="text-right">
//                         Active MAC Address
//                     </Label>
//                     <Input id="username" value={data.macaddress} className="col-span-3" />
//                 </div>
//             </div>
//     )

//     else return <Badge variant="outline" className='mb-2'>Huh?</Badge>
// }



















