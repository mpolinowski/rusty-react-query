import { Range } from '@/types/iGeneral'

export interface iGetIpConfigApiResponse {
    dhcpflag: 0 | 1
    ip: string
    dnsstat: 0 | 1
    netmask: string
    gateway: string
    fdnsip: string
    sdnsip: string
    networktype: 'LAN' | 'WiFi'
    wifi: 0 | 1
    macaddress: string
}

export interface iGetMacApiResponse {
    macaddress: string
}

export interface iGetOnvifApiResponse {
    ov_enable: 0 | 1
    ov_port: number
    ov_sslport: number
}

export interface iGetDdnsApiResponse {
    our_enable: 0 | 1
    our_interval: number
}

export interface iGetP2pApiResponse {
    p2p_enable: 0 | 1
    p2p_port_min: number
    p2p_port_max: number
}

export interface iGetWifiApiResponse {
    wf_enable: 0 | 1
    wf_ssid: string
    wf_bssid: string
    wf_auth: Range<6>
    wf_enc: 0 | 1
    wf_mode: 0 | 1
    wf_user: string
}