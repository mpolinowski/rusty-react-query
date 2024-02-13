import { Range } from '@/types/iGeneral'

export interface iGetMailTimerSnapApiResponse {
    enable: 0 | 1
    interval: number
}

export interface iGetFtpSnaptimerAttrnApiResponse {
    mode: 0 | 1
    prefix: 0 | 1
    name: string
}

export interface iGetPlanRecAttrApiResponse {
    enable: 0 | 1
    chn: 11 | 12 | 13
    duration: number
}

export interface iGetManualRecAttrApiResponse {
    time: number
    resolution: 11 | 12 | 13
    pre: Range<11>
}

export interface iGetRecStatusApiResponse {
    recstatus: Range<4>
}