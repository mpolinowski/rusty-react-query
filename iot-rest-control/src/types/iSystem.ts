import { Range } from '@/types/iGeneral'

export interface iGetServerInfoApiResponse {
    model: string
    hardVersion: string
    sysVersion: number
    softVersion: string
    webVersion: string
    name: string
    startdate: string
}

export interface iGetServerTimeApiResponse {
    timezone: string
    time: number
}

export interface iGetUserInfoApiResponse {
    at_userid: number
    at_username: string
    at_authlevel: number
    at_enable: 0 | 1
    at_lancode: 'de' | 'en' | 'fr' | 'cn' | 'pl'
    at_authexpire: number
}

export interface iGetVendorInfoApiResponse {
    product: string
    series: string
    vendor: string
}

export interface iGetDevInfoApiResponse {
    serialno: number
    product: string
    hardVersion: string
}

export interface iGetTimerRebootApiResponse {
    sr_enable: 0 | 1
    sr_day: Range<7>
    sr_time: number
}

export interface iGetRebootFlagApiResponse {
    rebootflag: 0 | 1
}

export interface iGetLanguageApiResponse {
    lancode: 'de' | 'en' | 'fr' | 'cn' | 'pl'
}

export interface iGetCameraModeApiResponse {
    mode: string
}

export interface iGetLatestVersionApiResponse {
    available: 0 | 1
    current_version: number
    latest_version: number
}

export interface iGetHwClockApiResponse {
    hwclock: 0 | 1
}

export interface iGetServerLogApiResponse {
    log: string
}

export interface iGetServerTimeApiResponse {
    timezone: string
    time: number
}