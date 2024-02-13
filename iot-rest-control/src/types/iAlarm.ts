import { Range } from '@/types/iGeneral'

export interface iGetAlarmAttrApiResponse {
    armed: 0 | 1
    linkpir: 0 | 1
    linkpirareas: Range<16>
    linkio: 0 | 1
    linkperif: 0 | 1
    linkiopir: 0 | 1
    linkperson: 0 | 1
    linkvehicle: 0 | 1
    linkanimal: 0 | 1
}

export interface iGetAudioAlarmAttrApiResponse {
    enable: 0 | 1
    threshold: Range<11>
}

export interface iGetPirAttrApiResponse {
    enable: 0 | 1
}

export interface iGetPirNightModeApiResponse {
    enable: 0 | 1
    interval: number
}

export interface iGetInputAttrApiResponse {
    enable: 0 | 1
    idle: 0 | 1
}

export interface iGetOutputAttrApiResponse {
    enable: 0 | 1
    idle: 0 | 1
    interval: number
}

export interface iGetAlarmRecAttrApiResponse {
    resolution: 11 | 12 | 13
    time: number
    pre: Range<16>
}

export interface iGetRecStatusApiResponse {
    recstatus: Range<3>
}

export interface iGetAlarmSnapAttrApiResponse {
    resolution: 11 | 12 | 13
}

export interface iGetOdAttrApiResponse {
    enable: 0 | 1
}

export interface iGetOdThreshApiResponse {
    enable: 0 | 1
    threshold: Range<101>
    minwidth: number
    maxwidth: number
    minheight: number
    maxheight: number
}

export interface iGetOdUiAttrApiResponse {
    x: number
    y: number
}

export interface iGetMdAttrApiResponse {
    enable: 0 | 1
    rect: number
    s: number
    x: number
    y: number
    w: number
    h: number
    polyX: string
    polyY: string
}

export interface iGetMdTimeApiResponse {
    ta_enable: 0 | 1
    ta_day: number
    ta_night: number
}

export interface iGetPushActionApiResponse {
    enable: 0 | 1
    interval: Range<61>
}

export interface iGetAlarmScheduleApiResponse {
    week0: string
    week1: string
    week2: string
    week3: string
    week4: string
    week5: string
    week6: string
}