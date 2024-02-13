import React, { useState } from 'react'
import { useQuery } from "@tanstack/react-query"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ReloadIcon } from "@radix-ui/react-icons"

import { iPostApiResponseCode } from '@/types/iGeneral'
import { iGetImageApiResponse } from '@/types/iMultimedia'
import { login, multimedia } from '@/config.ts'

const cmd='http://'+login.url+':'+login.port+'/param.cgi?cmd='
const auth='&user='+login.user+'&pwd='+login.password
const getparam=multimedia.imagenight.param.get
const setparam=multimedia.imagenight.param.set
const keySat=multimedia.imagenight.key.saturation
const keySharp=multimedia.imagenight.key.sharpness
const keyContrast=multimedia.imagenight.key.contrast
const keyBright=multimedia.imagenight.key.brightness
const keyHue=multimedia.imagenight.key.hue
const keyDnoiseAuto=multimedia.imagenight.key.denoiseauto
const keyDnoise=multimedia.imagenight.key.denoise
const keyFlip=multimedia.imagenight.key.flip
const keyMir=multimedia.imagenight.key.mirror
const keyFlickMode=multimedia.imagenight.key.flickermode
const keyFlickFrq=multimedia.imagenight.key.flickerfreq
const keyGauto=multimedia.imagenight.key.gauto
const keyGmode=multimedia.imagenight.key.gmode
const keyGval=multimedia.imagenight.key.gval
const keyVibauto=multimedia.imagenight.key.vibauto
const keyVib=multimedia.imagenight.key.vib
const keyHdr=multimedia.imagenight.key.hdr
const keyOb=multimedia.imagenight.key.ob
const keyObAuto=multimedia.imagenight.key.obauto
const keyIso=multimedia.imagenight.key.isomax

const fetchCameraState = async(param: string,): Promise<iGetImageApiResponse> => {
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

        const jsonData: iGetImageApiResponse = JSON.parse(cleanedTextResponse)
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
    const [sat, setSat] = useState('')
    const [sharp, setSharp] = useState('')
    const [contrast, setContrast] = useState('')
    const [brightness, setBrightness] = useState('')
    const [hue, setHue] = useState('')
    const [dnoiseauto, setDnoiseauto] = useState('')
    const [dnoise, setDnoise] = useState('')
    const [flip, setFlip] = useState('')
    const [mirror, setMirror] = useState('')
    const [flickmode, setFlickmode] = useState('')
    const [flickfrq, setFlickfrq] = useState('')
    const [gauto, setGauto] = useState('')
    const [gmode, setGmode] = useState('')
    const [gval, setGval] = useState('')
    const [vibauto, setVibauto] = useState('')
    const [vib, setVib] = useState('')
    const [hdr, setHdr] = useState('')
    const [ob, setOb] = useState('')
    const [obauto, setObAuto] = useState('')
    const [iso, setIso] = useState('')

    const {
        isLoading,
        isError,
        error,
        data: response
    } = useQuery<iGetImageApiResponse, Error>({
        queryKey: ['imagenightparams', { getparam }],
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
                        Night Image Saturation
                    </Label>
                        <Input
                            defaultValue={response?.saturation}
                            onChange={(e) => setSat(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keySat, sat)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Night Image Sharpness 
                    </Label>
                        <Input
                            defaultValue={response?.sharpness}
                            onChange={(e) => setSharp(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keySharp, sharp)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Night Image Contrast 
                    </Label>
                        <Input
                            defaultValue={response?.contrast}
                            onChange={(e) => setContrast(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyContrast, contrast)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Night Image Brightness 
                    </Label>
                        <Input
                            defaultValue={response?.brightness}
                            onChange={(e) => setBrightness(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyBright, brightness)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Night Image Hue 
                    </Label>
                        <Input
                            defaultValue={response?.hue}
                            onChange={(e) => setHue(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyHue, hue)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Night Auto Denoise 
                    </Label>
                        <Input
                            defaultValue={response?.denoiseauto}
                            onChange={(e) => setDnoiseauto(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyDnoiseAuto, dnoiseauto)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Night Denoise 
                    </Label>
                        <Input
                            defaultValue={response?.denoise}
                            onChange={(e) => setDnoise(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyDnoise, dnoise)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Night Image Flip
                    </Label>
                        <Input
                            defaultValue={response?.flip}
                            onChange={(e) => setFlip(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyFlip, flip)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Night Image Mirror 
                    </Label>
                        <Input
                            defaultValue={response?.mirror}
                            onChange={(e) => setMirror(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyMir, mirror)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Night De-Flicker Mode
                    </Label>
                        <Input
                            defaultValue={response?.flickermode}
                            onChange={(e) => setFlickmode(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyFlickMode, flickmode)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Night De-Flicker Frequency 
                    </Label>
                        <Input
                            defaultValue={response?.flickerfreq}
                            onChange={(e) => setFlickfrq(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyFlickFrq, flickfrq)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Night Auto Gamma 
                    </Label>
                        <Input
                            defaultValue={response?.gauto}
                            onChange={(e) => setGauto(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyGauto, gauto)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Night Gamma Mode 
                    </Label>
                        <Input
                            defaultValue={response?.gmode}
                            onChange={(e) => setGmode(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyGmode, gmode)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Night Gamma Value
                    </Label>
                        <Input
                            defaultValue={response?.gval}
                            onChange={(e) => setGval(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyGval, gval)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Night Auto Vibrancy 
                    </Label>
                        <Input
                            defaultValue={response?.vibauto}
                            onChange={(e) => setVibauto(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyVibauto, vibauto)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Night Vibrancy 
                    </Label>
                        <Input
                            defaultValue={response?.vib}
                            onChange={(e) => setVib(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyVib, vib)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Night HDR 
                    </Label>
                        <Input
                            defaultValue={response?.hdr}
                            onChange={(e) => setHdr(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyHdr, hdr)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Night Blacklevel 
                    </Label>
                        <Input
                            defaultValue={response?.ob}
                            onChange={(e) => setOb(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyOb, ob)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Night Auto Blacklevel 
                    </Label>
                        <Input
                            defaultValue={response?.obauto}
                            onChange={(e) => setObAuto(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyObAuto, obauto)}
                        }>Submit</Button>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="name" className="text-left min-w-40">
                        Night Maximum ISO 
                    </Label>
                        <Input
                            defaultValue={response?.isomax}
                            onChange={(e) => setIso(e.target.value)}
                            className="col-span-3"
                        />
                        <Button onClick={
                            () => {updateCameraState(setparam, keyIso, iso)}
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

// import { iGetImageApiResponse } from '@/types/iMultimedia'
// import { login, multimedia } from '@/config.ts'

// const cmd='http://'+login.url+':'+login.port+'/param.cgi?cmd='
// const auth='&user='+login.user+'&pwd='+login.password
// const param=multimedia.imagenight

// const fetchData = async(param: string): Promise<iGetImageApiResponse> => {
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

//         const jsonData: iGetImageApiResponse = JSON.parse(cleanedTextResponse)

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
//     }: UseQueryResult<iGetImageApiResponse, Error> = useQuery<iGetImageApiResponse, Error>({
//         queryKey: ['imagenightparams', { param }],
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
//                         Saturation (Night)
//                     </Label>
//                     <Input id="name" value={data.saturation} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Sharpness (Night)
//                     </Label>
//                     <Input id="name" value={data.sharpness} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Contrast (Night)
//                     </Label>
//                     <Input id="name" value={data.contrast} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Brightness (Night)
//                     </Label>
//                     <Input id="name" value={data.brightness} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Hue (Night)
//                     </Label>
//                     <Input id="name" value={data.hue} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Auto Denoise (Night)
//                     </Label>
//                     <Input id="name" value={data.denoiseauto} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Denoise Level (Night)
//                     </Label>
//                     <Input id="name" value={data.denoise} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Flip Image (Night)
//                     </Label>
//                     <Input id="name" value={data.flip} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Mirror Image (Night)
//                     </Label>
//                     <Input id="name" value={data.mirror} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Deflicker Mode (Night)
//                     </Label>
//                     <Input id="name" value={data.flickermode} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Deflicker Frequency (Night)
//                     </Label>
//                     <Input id="name" value={data.flickerfreq} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Auto Gamma (Night)
//                     </Label>
//                     <Input id="name" value={data.gauto} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Gamma Stength (Night)
//                     </Label>
//                     <Input id="name" value={data.gmode} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Gamma Level (Night)
//                     </Label>
//                     <Input id="name" value={data.gval} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Auto Vibrancy (Night)
//                     </Label>
//                     <Input id="name" value={data.vibauto} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Vibrancy (Night)
//                     </Label>
//                     <Input id="name" value={data.vib} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         WDR Strength (Night)
//                     </Label>
//                     <Input id="name" value={data.hdr} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Blacklevel (Night)
//                     </Label>
//                     <Input id="name" value={data.ob} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Auto Blacklevel (Night)
//                     </Label>
//                     <Input id="name" value={data.obauto} className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-left min-w-40">
//                         Max ISO (Night)
//                     </Label>
//                     <Input id="name" value={data.isomax} className="col-span-3" />
//                 </div>
//             </>
//     )

//     else return <Badge variant="outline" className='mb-2'>Huh?</Badge>
// }



















