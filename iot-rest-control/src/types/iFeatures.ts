import { Range } from '@/types/iGeneral'

export interface iGetSmtpApiResponse {
    ma_server: string
    ma_port: number
    ma_ssl: Range<4>
    ma_username: string
    ma_from: string
    ma_to: string
    ma_subject: string
    ma_tsubject: string
    ma_text: string
}

export interface iGetMailActionApiResponse {
    enable: 0 | 1
    interval: number
}

export interface iGetMailActionAttrApiResponse {
    snapcount: Range<11>
}

export interface iGetFtpAttrApiResponse {
    ft_server: string
    ft_port: number
    ft_username: string
    ft_dirname: string
    ft_dirmode: 0 | 1
    ft_mode: 0 | 1
    ft_ssl: Range<3>
    ft_insecure: 0 | 1
}

export interface iGetFtpActionApiResponse {
    enable: 0 | 1
    interval: number
}

export interface iGetFtpActionAttrApiResponse {
    snapcount: Range<11>
}

export interface iGetInfraredApiResponse {
    infraredstat: Range<3>
    infraredcutstat: Range<3>
    infraredtimer: 0 | 1
    infraredday: number
    infrarednight: number
}

export interface iGetLightModeApiResponse {
    mode: Range<3>
    onalarm: 0 | 1
    interval: Range<61>
    wlonalarm: 0 | 1
    wlinterval: Range<61>
    wlmute: Range<16>
}

export interface iGetLightAttrApiResponse {
    light_enable: 0 | 1
}

export interface iGetIrCtrlAttrApiResponse {
    saradc_switch_value: number
    saradc_switch_b2c_value: number
    saradc_delay_enable: 0 | 1
    saradc_delay_time: Range<61>
}

export interface iGetSaradcStateApiResponse {
    saradc_state: Range<256>
}

export interface iGetPirNightModeApiResponse {
    enable: 0 | 1
    interval: number
    wlenable: 0 | 1
    wlinterval: number
}

export interface iGetPtzTourAttrApiResponse {
    tour_index: Range<9>
    tour_interval: number
    tour_times: Range<51>
    tour_atboot: 0 | 1
}

export interface iGetPtzStateApiResponse {
    pan: Range<101>
    tilt: Range<101>
    zoom: Range<101>
    focus: Range<101>
}

export interface iGetPtzAttrApiResponse {
    selfdet: 0 | 1
    movehome: 0 | 1
    home: Range<9>
    alarmmask: 0 | 1
    gotoalarmpos: 0 | 1
    alarmpos: Range<9>
    speed: Range<11>
    mirror: 0 | 1
    flip: 0 | 1
}

export interface iGetPtzTimerPresetApiResponse {
    tp_enable: 0 | 1
    tp_index: Range<9>
    tp_interval: Range<121>
}

export interface iGetSdInfoApiResponse {
    sdstatus: 0 | 1
    sdfreespace: number
    sdtotalspace: number
}

export interface iGetSdAttrApiResponse {
    sd_autodelete: 0 | 1
    sd_rstorage_enable: 0 | 1
    sd_rstorage_duration: Range<31>
}

export interface iGetSdActionApiResponse {
    enable: 0 | 1
    interval: number
}

export interface iGetSdActionAttrApiResponse {
    snapcount: Range<11>
}

export interface iGetWizardStatusApiResponse {
    status: 0 | 1
}