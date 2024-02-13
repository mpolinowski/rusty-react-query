import { Range } from '@/types/iGeneral'

export interface iGetAudioApiResponse {
    enable: 0 | 1
    volume: Range<101>
}

export interface iGetAudioCodecApiResponse {
    codec: string
    sample_rate: number
}

export interface iGetAudioActionApiResponse {
    enable: 0 | 1
    interval: Range<61>
    duration: Range<61>
}

export interface iGetAudioAnrApiResponse {
    aec_enable: 0 | 1
    anr_enable: 0 | 1
    anr_strength: Range<9>
}

export interface iGetVideoApiResponse {
    videomode: string
    vinorm: string
    wdrmode: 0 | 1
    wdrmodenight: 0 | 1
    maxchn: Range<4>
}

export interface iGetVideoEncApiResponse {
    profile: string
    bps: number
    fps: Range<31>
    gop: Range<121>
    brmode: 0 | 1
    imagegrade: Range<11>
    width: number
    height: number
}

export interface iGetImageApiResponse {
    saturation: Range<101>
    sharpness: Range<101>
    contrast: Range<101>
    brightness: Range<101>
    hue: Range<361>
    denoiseauto: 0 | 1
    denoise: Range<17>
    flip: 0 | 1
    mirror: 0 | 1
    flickermode: Range<3>
    flickerfreq: 50 | 55 | 60
    gauto: 0 | 1
    gmode: Range<19>
    gval: number
    vibauto: 0 | 1
    vib: Range<256>
    hdr: Range<8>
    ob: Range<26>
    obauto: 0 | 1
    isomax: Range<32>
}

export interface iGetImageModeApiResponse {
    mode: 'day' | 'night' | 'auto'
}

export interface iGetImageModeStateApiResponse {
    state: Range<3>
}

export interface iGetImageOverlayApiResponse {
    show: 0 | 1
    align: Range<4>
    x: number
    y: number
    name: string
}

export interface iGetImageCoverApiResponse {
    enable: 0 | 1
    rect: 0 | 1
    x: number
    y: number
    w: number
    h: number
    x1: number
    y1: number
    x2: number
    y2: number
    x3: number
    y3: number
    x4: number
    y4: number
    color: string
}