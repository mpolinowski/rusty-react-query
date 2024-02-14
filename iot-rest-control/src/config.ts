import { iLogin } from '@/types/iGeneral'

export const login: iLogin = {
    url: '192.168.2.125',
    port: 80,
    user: 'admin',
    password: '1029384756'
}

export const network = {
    ipconf: {
        param: {
            get: 'getnetattr',
            set: 'setnetattr'
        },
        key: {
            dhcpflag: '&dhcpflag=',
            ip: '&ip=',
            dnsstat: '&dnsstat=',
            netmask: '&netmask=',
            gateway: '&gateway=',
            fdnsip: '&fdnsip=',
            sdnsip: '&sdnsip=',
            networktype: '&networktype=',
            macaddress: '&macaddress=',
        }
    },
    ddns: {
        param: {
            get: 'getourddnsattr',
            set: 'setourddnsattr'
        },
        key: {
            enable: '&our_enable=',
            interval: '&our_interval=',
        }
    },
    onvif: {
        param: {
            get: 'getonvifattr',
            set: 'setonvifattr'
        },
        key: {
            enable: '&ov_enable=',
            port: '&ov_port=',
            sslport: '&ov_sslport='
        }
    },
    p2p: {
        param: {
            get: 'getp2pattr',
            set: 'setp2pattr'
        },
        key: {
            enable: '&p2p_enable=',
            portmin: '&p2p_port_min=',
            portmax: '&p2p_port_max='
        }
    },
    wifi: {
        param: {
            get: 'getwirelessattr',
            set: 'setwirelessattr'
        },
        key: {
            enable: '&wf_enable=',
            ssid: '&wf_ssid=',
            bssid: '&wf_bssid=',
            auth: '&wf_auth=',
            enc: '&wf_enc=',
            mode: '&wf_mode=',
            user: '&wf_user=',
        }
    },
    lanmac: {
        param: {
            get: 'getlanmac',
            set: 'setlanmac'
        },
        key: {
            address: '&macaddress='
        }
    },
    wifimac: {
        param: {
            get: 'getwifimac',
            set: 'setwifimac'
        },
        key: {
            address: '&macaddress='
        }
    }
}

export const alarm = {
    alarmattr: {
        param: {
            get: 'getalarmattr',
            set: 'setalarmattr'
        },
        key: {
            armed: '&armed=',
            linkpir: '&linkpir=',
            linkpirareas: '&linkpirareas=',
            linkio: '&linkio=',
            linkperif: '&linkperif=',
            linkiopir: '&linkiopir=',
            linkperson: '&linkperson=',
            linkvehicle: '&linkvehicle=',
            linkanimal: '&linkanimal='
        }
    },
    audioalarmattr: {
        param: {
            get: 'getaudioalarmattr',
            set: 'setaudioalarmattr'
        },
        key: {
            enable: '&enable=',
            threshold: '&threshold='
        }
    },
    pirattr: {
        param: {
            get: 'getpirattr',
            set: 'setpirattr'
        },
        key: {
            enable: '&enable='
        }
    },
    pirnightmode: {
        param: {
            get: 'getpirnightmode',
            set: 'setpirnightmode'
        },
        key: {
            enable: '&enable=',
            interval: '&interval='
        }
    },
    inputattr: {
        param: {
            get: 'getioattr',
            set: 'setioattr'
        },
        key: {
            enable: '&enable=',
            idle: '&idle='
        }
    },
    relayaction: {
        param: {
            get: 'getrelayaction',
            set: 'setrelayaction'
        },
        key: {
            enable: '&enable=',
            idle: '&idle=',
            interval: '&interval='
        }
    },
    alarmrecattr: {
        param: {
            get: 'getalarmrecattr',
            set: 'setalarmrecattr'
        },
        key: {
            resolution: '&resolution=',
            time: '&time=',
            pre: '&pre=',
        }
    },
    recordstatus: {
        param: {
            get: 'getrecordstatus',
            set: 'setrecordstatus'
        },
        key: {
            recstatus: '&recstatus='
        }
    },
    alarmsnapattr: {
        param: {
            get: 'getalarmsnapattr',
            set: 'setalarmsnapattr'
        },
        key: {
            resolution: '&resolution=',
        }
    },
    odattr: {
        param: {
            get: 'getodattr',
            set: 'setodattr'
        },
        key: {
            enable: '&enable='
        }
    },
    odthresh: {
        param: {
            get: 'getodthresh',
            set: 'setodthresh'
        },
        type: {
            person: '&object=person',
            vehicle: '&object=vehicle',
            animal: '&object=animal'
        },
        key: {
            enable: '&enable=',
            threshold: '&threshold=',
            minwidth: '&minwidth=',
            maxwidth: '&maxwidth=',
            minheight: '&minheight=',
            maxheight: '&maxheight=',
        }
    },
    uiodattr: {
        param: {
            get: 'getuiodattr',
            set: 'setuiodattr'
        },
        type: {
            person: '&odbox=person',
            vehicle: '&odbox=vehicle',
            animal: '&odbox=animal'
        },
        key: {
            x: '&x=',
            y: '&y='
        }
    },
    mdattr: {
        param: {
            get: 'getmdattr',
            set: 'setmdattr'
        },
        type: {
            area1: '&area=1',
            area2: '&area=2',
            area3: '&area=3',
            area4: '&area=4'
        },
        key: {
            enable: '&enable=',
            rect: '&rect=',
            s: '&s=',
            x: '&x=',
            y: '&y=',
            w: '&w=',
            h: '&h=',
            polyX: '&polyX=',
            polyY: '&polyY='
        }
    },
    mdtime: {
        param: {
            get: 'getmdtime',
            set: 'setmdtime'
        },
        key: {
            enable: '&ta_enable=',
            day: '&ta_day=',
            night: '&ta_night='
        }
    },
    pushaction: {
        param: {
            get: 'getpushaction',
            set: 'setpushaction'
        },
        key: {
            enable: '&enable=',
            interval: '&interval=',
        }
    },
    scheduleex: {
        param: {
            get: 'getscheduleex',
            set: 'setscheduleex'
        },
        type: {
            ms: '&ename=ms',
            md: '&ename=md',
            pir: '&ename=pir',
            io: '&ename=io',
            audio: '&ename=audio',
            snap: '&ename=snap'
        },
        key: {
            week0: '&week0=',
            week1: '&week1=',
            week2: '&week2=',
            week3: '&week3=',
            week4: '&week4=',
            week5: '&week5=',
            week6: '&week6='
        }
    },
    customschedule: {
        param: {
            get: 'getcustomschedule',
            set: 'setcustomschedule'
        },
        type: {
            ms: '&ename=custom_ms',
            md: '&ename=custom_md',
            pir: '&ename=custom_pir',
            io: '&ename=custom_io',
            audio: '&ename=custom_audio',
            snap: '&ename=custom_snap'
        },
        key: {
            week0: '&week0=',
            week1: '&week1=',
            week2: '&week2=',
            week3: '&week3=',
            week4: '&week4=',
            week5: '&week5=',
            week6: '&week6='
        }
    }
}

export const multimedia = {
    audio: {
        param: {
            get: 'getaudioattr',
            set: 'setaudioattr'
        },
        type: {
            audioin: '&type=in',
            audioout: '&type=out'
        },
        key: {
            enable: '&enable=',
            volume: '&volume='
        }
    },
    audiocodec: {
        param: {
            get: 'getaudiocodecattr',
            set: 'setaudiocodecattr'
        },
        type: {
            audioin: '&type=in',
            audioout: '&type=out'
        },
        key: {
            codec: '&codec=',
            samplerate: '&sample_rate='
        }
    },
    audioaction: {
        param: {
            get: 'getaudioaction',
            set: 'setaudioaction'
        },
        key: {
            enable: '&enable=',
            interval: '&interval=',
            duration: '&duration='
        }
    },
    audioanr: {
        param: {
            get: 'getaudioenhance',
            set: 'setaudioenhance'
        },
        key: {
            aec: '&aec_enable=',
            anr: '&anr_enable=',
            strength: '&anr_strength=',
        }
    },
    video: {
        param: {
            get: 'getvideoattr',
            set: 'setvideoattr'
        },
        key: {
            videomode: '&videomode=',
            vinorm: '&vinorm=',
            wdrmode: '&wdrmode=',
            wdrmodenight: '&wdrmodenight=',
            maxchn: '&maxchn=',
        }
    },
    videoenc: {
        param: {
            get: 'getvencattr',
            set: 'setvencattr'
        },
        type: {
            videoenc11: '&chn=11',
            videoenc12: '&chn=12',
            videoenc13: '&chn=13'
        },
        key: {
            profile: '&profile=',
            bps: '&bps=',
            fps: '&fps=',
            gop: '&gop=',
            brmode: '&brmode=',
            imagegrade: '&imagegrade=',
            width: '&width=',
            height: '&height=',
        }
    },
    image: {
        param: {
            get: 'getimageattr',
            set: 'setimageattr'
        },
        key: {
            saturation: '&saturation=',
            sharpness: '&sharpness=',
            contrast: '&contrast=',
            brightness: '&brightness=',
            hue: '&hue=',
            denoiseauto: '&denoiseauto=',
            denoise: '&denoise=',
            flip: '&flip=',
            mirror: '&mirror=',
            flickermode: '&flickermode=',
            flickerfreq: '&flickerfreq=',
            gauto: '&gauto=',
            gmode: '&gmode=',
            gval: '&gval=',
            vibauto: '&vibauto=',
            vib: '&vib=',
            hdr: '&hdr=',
            ob: '&ob=',
            obauto: '&obauto=',
            isomax: '&isomax=',
        }
    },
    imagenight: {
        param: {
            get: 'getimagenightattr',
            set: 'setimagenightattr'
        },
        key: {
            saturation: '&saturation=',
            sharpness: '&sharpness=',
            contrast: '&contrast=',
            brightness: '&brightness=',
            hue: '&hue=',
            denoiseauto: '&denoiseauto=',
            denoise: '&denoise=',
            flip: '&flip=',
            mirror: '&mirror=',
            flickermode: '&flickermode=',
            flickerfreq: '&flickerfreq=',
            gauto: '&gauto=',
            gmode: '&gmode=',
            gval: '&gval=',
            vibauto: '&vibauto=',
            vib: '&vib=',
            hdr: '&hdr=',
            ob: '&ob=',
            obauto: '&obauto=',
            isomax: '&isomax=',
        }
    },
    imagemode: {
        param: {
            get: 'getimagemode',
            set: 'setimagemode',
        },
        key: {
            mode: '&mode=',
        }
    },
    imagemodestate: {
        param: {
            get: 'getnightstate',
            set: 'setnightstate',
        },
        key: {
            state: '&state=',
        }
    },
    overlay: {
        param: {
            get: 'getoverlayattr',
            set: 'setoverlayattr',
        },
        type: {
            overlayname: '&region=1',
            overlayts: '&region=2'
        },
        key: {
            state: '&state=',
            show: '&show=',
            align: '&align=',
            x: '&x=',
            y: '&y=',
            name: '&name=',
        }
    },
    privacy: {
        param: {
            get: 'getcoverattr',
            set: 'setcoverattr'
        },
        type: {
            privacyarea1: '&area=1',
            privacyarea2: '&area=2',
            privacyarea3: '&area=3',
            privacyarea4: '&area=4',
            privacyarea5: '&area=5',
            privacyarea6: '&area=6',
            privacyarea7: '&area=7',
            privacyarea8: '&area=8'
        },
        key: {
            enable: '&enable=',
            rect: '&rect=',
            x: '&x=',
            y: '&y=',
            w: '&w=',
            h: '&h=',
            x1: '&x1=',
            y1: '&y1=',
            x2: '&x2=',
            y2: '&y2=',
            x3: '&x3=',
            y3: '&y3=',
            x4: '&x4=',
            y4: '&y4=',
            color: '&color=',
        }
    },
}

export const features = {
    smtp: {
        param: {
            get: 'getsmtpattr',
            set: 'setsmtpattr',
        },
        key: {
            server: '&ma_server=',
            port: '&ma_port=',
            ssl: '&ma_ssl=',
            username: '&ma_username=',
            from: '&ma_from=',
            to: '&ma_to=',
            subject: '&ma_subject=',
            tsubject: '&ma_tsubject=',
            text: '&ma_text='
        }
    },
    mailaction: {
        param: {
            get: 'getmaaction',
            set: 'setmaaction',
        },
        key: {
            enable: '&enable=',
            interval: '&interval='
        }
    },
    mailactionattr: {
        param: {
            get: 'getmaactionattr',
            set: 'setmaactionattr',
        },
        key: {
            snapcount: '&snapcount='
        }
    },
    ftpattr: {
        param: {
            get: 'getftpattr',
            set: 'setftpattr',
        },
        key: {
            server: '&ft_server=',
            port: '&ft_port=',
            username: '&ft_username=',
            dirname: '&ft_dirname=',
            dirmode: '&ft_dirmode=',
            mode: '&ft_mode=',
            ssl: '&ft_ssl=',
            insecure: '&ft_insecure='
        }
    },
    ftpaction: {
        param: {
            get: 'getftpaction',
            set: 'setftpaction',
        },
        type: {
            snap: '&type=snap',
            timersnap: '&type=timersnap',
            rec: '&type=rec'
        },
        key: {
            enable: '&enable=',
            interval: '&interval='
        }
    },
    ftpactionattr: {
        param: {
            get: 'getftpactionattr',
            set: 'setftpactionattr',
        },
        key: {
            snapcount: '&snapcount='
        }
    },
    infrared: {
        param: {
            get: 'getinfrared',
            set: 'setinfrared',
        },
        key: {
            infraredstat: '&infraredstat=',
            infraredcutstat: '&infraredcutstat=',
            infraredtimer: '&infraredtimer=',
            infraredday: '&infraredday=',
            infrarednight: '&infrarednight='
        }
    },
    lightmode: {
        param: {
            get: 'getlightmode',
            set: 'setlightmode',
        },
        key: {
            mode: '&mode=',
            onalarm: '&onalarm=',
            interval: '&interval=',
            wlonalarm: '&wlonalarm=',
            wlinterval: '&wlinterval=',
            wlmute: '&wlmute=',
        }
    },
    lightattr: {
        param: {
            get: 'getlightattr',
            set: 'setlightattr',
        },
        type: {
            wifi: '&index=1',
            power: '&index=2'
        },
        key: {
            enable: '&light_enable='
        }
    },
    irctrlattr: {
        param: {
            get: 'getirctrlattr',
            set: 'setirctrlattr',
        },
        key: {
            switch: '&saradc_switch_value=',
            switchb2c: '&saradc_switch_b2c_value=',
            delay: '&saradc_delay_enable=',
            delaytime: '&saradc_delay_time='
        }
    },
    saradcstate: {
        param: {
            get: 'getsaradcstate',
            set: 'setsaradcstate',
        },
        key: {
            state: '&saradc_state='
        }
    },
    pirnightmode: {
        param: {
            get: 'getpirnightmode',
            set: 'setpirnightmode',
        },
        key: {
            enable: '&enable=',
            interval: '&interval=',
            wlenable: '&wlenable=',
            wlinterval: '&wlinterval='
        }
    },
    ptztourattr: {
        param: {
            get: 'getptztourattr',
            set: 'setptztourattr',
        },
        key: {
            index: '&tour_index=',
            interval: '&tour_interval=',
            times: '&tour_times=',
            atboot: '&tour_atboot='
        }
    },
    ptzstate: {
        param: {
            get: 'getptzstate',
            set: 'setptzstate',
        },
        key: {
            pan: '&pan=',
            tilt: '&tilt=',
            zoom: '&zoom=',
            focus: '&focus='
        }
    },
    ptzattr: {
        param: {
            get: 'getptzattr',
            set: 'setptzattr',
        },
        key: {
            selfdet: '&selfdet=',
            movehome: '&movehome=',
            home: '&home=',
            alarmmask: '&alarmmask=',
            gotoalarmpos: '&gotoalarmpos=',
            alarmpos: '&alarmpos=',
            speed: '&speed=',
            mirror: '&mirror=',
            flip: '&flip='
        }
    },
    ptztimerpreset: {
        param: {
            get: 'getptztimerpreset',
            set: 'setptztimerpreset',
        },
        key: {
            enable: '&tp_enable=',
            index: '&tp_index=',
            interval: '&tp_interval='
        }
    },
    sdinfo: {
        param: {
            get: 'getsdinfo',
            set: 'setsdinfo',
        },
        key: {
            sdstatus: '&sdstatus=',
            sdfreespace: '&sdfreespace=',
            sdtotalspace: '&sdtotalspace='
        }
    },
    sdattr: {
        param: {
            get: 'getsdattr',
            set: 'setsdattr',
        },
        key: {
            autodelete: '&sd_autodelete=',
            enable: '&sd_rstorage_enable=',
            duration: '&sd_rstorage_duration='
        }
    },
    sdaction: {
        param: {
            get: 'getsdaction',
            set: 'setsdaction',
        },
        type: {
            rec: '&type=rec',
            snap: '&type=snap',
            timedsnap: '&type=timedsnap'
        },
        key: {
            enable: '&enable=',
            interval: '&interval='
        }
    },
    sdactionattr: {
        param: {
            get: 'getsdactionattr',
            set: 'setsdactionattr',
        },
        key: {
            snapcount: '&snapcount='
        }
    },
    wizardstatus: {
        param: {
            get: 'getwizardstatus',
            set: 'setwizardstatus',
        },
        key: {
            status: '&status='
        }
    }
}

export const smarthome = {
    mqtt: {
        param: {
            get: 'getmqttattr',
            set: 'setmqttattr',
        },
        key: {
            enable: '&mq_enable=',
            broker: '&mq_broker=',
            broker_ws: '&mq_broker_ws=',
            broker_ws_port: '&mq_broker_ws_port=',
            broker_ws_portssl: '&mq_broker_ws_portssl=',
            broker_min_tls: '&mq_broker_min_tls=',
            host: '&mq_host=',
            port: '&mq_port=',
            portssl: '&mq_portssl=',
            ssl: '&mq_ssl=',
            auth: '&mq_auth=',
            user: '&mq_user=',
            password: '&mq_pass=',
            insecure: '&mq_insecure=',
            prefix: '&mq_prefix=',
            lwt: '&mq_lwt=',
            lwmon: '&mq_lwmon=',
            lwmoff: '&mq_lwmoff=',
            clientid: '&mq_clientid=',
            qos: '&mq_qos='
        }
    },
    as: {
        param: {
            get: 'getasattr',
            set: 'setasattr',
        },
        type: {
            asServer1: '&as_index=1',
            asServer2: '&as_index=2',
            asServer3: '&as_index=3'
        },
        key: {
            server: '&as_server=',
            port: '&as_port=',
            ssl: '&as_ssl=',
            mode: '&as_mode=',
            auth: '&as_auth=',
            username: '&as_username=',
            path: '&as_path=',
            area: '&as_area=',
            io: '&as_io=',
            audio: '&as_audio=',
            areaio: '&as_areaio=',
            activequery: '&as_activequery=',
            query1: '&as_query1=',
            queryattr1: '&as_queryattr1=',
            queryval1: '&as_queryval1=',
            query2: '&as_query2=',
            queryattr2: '&as_queryattr2=',
            queryval2: '&as_queryval2=',
            query3: '&as_query3=',
            queryattr3: '&as_queryattr3=',
            queryval3: '&as_queryval3=',
            query4: '&as_query4=',
            queryattr4: '&as_queryattr4=',
            queryval4: '&as_queryval4=',
            query5: '&as_query5=',
            queryattr5: '&as_queryattr5=',
            queryval5: '&as_queryval5=',
            insecure: '&as_insecure='
        }
    },
    ifttt: {
        param: {
            get: 'getiftttattr',
            set: 'setiftttattr',
        },
        key: {
            enable: '&ifttt_enable=',
        }
    },
    hk: {
        param: {
            get: 'gethkattr',
            set: 'sethkattr',
        },
        key: {
            enable: '&hk_enable=',
            log: '&hk_log=',
            sdlog: '&hk_sdlog='
        }
    },
    alexa: {
        param: {
            get: 'getalexaattr',
            set: 'setalexaattr',
        },
        key: {
            enable: '&alexa_enable='
        }
    }
}

export const recording = {
    mailtimersnap: {
        param: {
            get: 'getmatimersnap',
            set: 'setmatimersnap',
        },
        key: {
            enable: '&enable=',
            interval: '&interval='
        }
    },
    ftpsnaptimerattr: {
        param: {
            get: 'getsnaptimerftpattr',
            set: 'setsnaptimerftpattr',
        },
        key: {
            mode: '&mode=',
            prefix: '&prefix=',
            name: '&name='
        }
    },
    planrecattr: {
        param: {
            get: 'getplanrecattr',
            set: 'setplanrecattr',
        },
        key: {
            enable: '&enable=',
            chn: '&chn=',
            duration: '&duration='
        }
    },
    manualrecattr: {
        param: {
            get: 'getmanualrecattr',
            set: 'setmanualrecattr',
        },
        key: {
            time: '&time=',
            resolution: '&resolution=',
            pre: '&pre='
        }
    },
    recordstatus: {
        param: {
            get: 'getrecordstatus',
            set: 'setrecordstatus',
        },
        key: {
            recstatus: '&recstatus='
        }
    },
}

export const system = {
    serverinfo: {
        param: {
            get: 'getserverinfo',
            set: 'setserverinfo',
        },
        key: {
            model: '&model=',
            hardVersion: '&hardVersion=',
            sysVersion: '&sysVersion=',
            softVersion: '&softVersion=',
            webVersion: '&webVersion=',
            name: '&name=',
            startdate: '&startdate=',
        }
    },
    servertime: {
        param: {
            get: 'getservertime',
            set: 'setservertime',
        },
        key: {
            timezone: '&timezone=',
            time: '&time='
        }
    },
    latestversioninfo: {
        param: {
            get: 'getlatestversioninfo',
            set: 'setlatestversioninfo',
        },
        key: {
            available: '&available=',
            current: '&current_version=',
            latest: '&latest_version=',
        }
    },
    userinfo: {
        param: {
            get: 'getuserinfo',
            set: 'setuserinfo',
        },
        key: {
            userid: '&at_userid=',
            username: '&at_username=',
            authlevel: '&at_authlevel=',
            enable: '&at_enable=',
            lancode: '&at_lancode=',
            authexpire: '&at_authexpire=',
        }
    },
    vendorinfo: {
        param: {
            get: 'getvendorinfo',
            set: 'setvendorinfo',
        },
        key: {
            product: '&product=',
            series: '&series=',
            vendor: '&vendor=',
        }
    },
    devinfo: {
        param: {
            get: 'getdevinfo',
            set: 'setdevinfo',
        },
        key: {
            serialno: '&serialno=',
            product: '&product=',
            hardVersion: '&hardVersion=',
        }
    },
    rebootflag: {
        param: {
            get: 'getrebootflag',
            set: 'setrebootflag',
        },
        key: {
            flag: '&rebootflag='
        }
    },
    timerreboot: {
        param: {
            get: 'gettimerreboot',
            set: 'settimerreboot',
        },
        key: {
            enable: '&sr_enable=',
            day: '&sr_day=',
            time: '&sr_time='
        }
    },
    language: {
        param: {
            get: 'getlanguage',
            set: 'setlanguage',
        },
        key: {
            lancode: '&lancode=',
        }
    },
    factorymode: {
        param: {
            get: 'getmode',
            set: 'setmode',
        },
        key: {
            mode: '&mode=',
        }
    },
    hwstate: {
        param: {
            get: 'gethwstate',
            set: 'sethwstate',
        },
        key: {
            hwclock: '&hwclock=',
        }
    },
    syslog: {
        param: {
            get: 'getsyslog',
            set: 'setsyslog',
        },
        key: {
            log: '&log='
        }
    }
}