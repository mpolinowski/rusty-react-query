import { Range } from '@/types/iGeneral'

export interface iGetMqttApiResponse {
    mq_enable: 0 | 1
    mq_broker: 0 | 1
    mq_broker_ws: 0 | 1
    mq_broker_ws_port: number
    mq_broker_ws_portssl: number
    mq_broker_min_tls: 'tlsv1.2' | 'tlsv1.3'
    mq_host: string
    mq_port: number
    mq_portssl: number
    mq_ssl: 0 | 1
    mq_auth: 0 | 1
    mq_user: string
    mq_pass: string
    mq_insecure: 0 | 1
    mq_prefix: string
    mq_lwt: string
    mq_lwmon: string
    mq_lwmoff: string
    mq_clientid: string
    mq_qos: Range<3>
}

export interface iGetAlarmserverApiResponse {
    as_server: string
    as_port: number
    as_ssl: 0 | 1
    as_mode: 0 | 1
    as_auth: 0 | 1
    as_username: string
    as_path: string
    as_area: 0 | 1
    as_io: 0 | 1
    as_audio: 0 | 1
    as_areaio: 0 | 1
    as_activequery: 0 | 1
    as_query1: 0 | 1
    as_queryattr1: string
    as_queryval1: string
    as_query2: 0 | 1
    as_queryattr2: string
    as_queryval2: string
    as_query3: 0 | 1
    as_queryattr3: string
    as_queryval3: string
    as_query4: 0 | 1
    as_queryattr4: string
    as_queryval4: string
    as_query5: 0 | 1
    as_queryattr5: string
    as_queryval5: string
    as_insecure: 0 | 1
}

export interface iGetIftttApiResponse {
    ifttt_enable: 0 | 1
}

export interface iGetHkApiResponse {
    hk_enable: 0 | 1
    hk_log: 0 | 1
    hk_sdlog: 0 | 1
}

export interface iGetAlexaApiResponse {
    alexa_enable: 0 | 1
}