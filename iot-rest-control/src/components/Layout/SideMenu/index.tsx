import {
  Card,
  CardContent
} from "@/components/ui/card"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
  
import IpConfigMenu from '@/components/API/Network/IpConfig'
import OnvifMenu from '@/components/API/Network/Onvif'
import DdnsMenu from '@/components/API/Network/DDNS'
import P2pMenu from '@/components/API/Network/P2p'
import WifiMenu from '@/components/API/Network/Wifi'

import ActionsMenu from '@/components/API/Alarm/Actions'
import AreasMenu from '@/components/API/Alarm/Areas'
import ObjectDetectionMenu from '@/components/API/Alarm/ObjectDetection'
import PushMenu from '@/components/API/Alarm/Push'
import ScheduleMenu from '@/components/API/Alarm/Schedule'

import AudioMenu from '@/components/API/Multimedia/Audio'
import VideoMenu from '@/components/API/Multimedia/Video'
import ImageMenu from '@/components/API/Multimedia/Image'
import OverlayMenu from '@/components/API/Multimedia/Overlay'
import PrivacyMenu from '@/components/API/Multimedia/Privacy'

import ImageRecMenu from '@/components/API/Recording/Images'
import VideoRecMenu from '@/components/API/Recording/Video'

import MailMenu from '@/components/API/Features/Mail'
import FTPMenu from '@/components/API/Features/FTP'
import LightMenu from '@/components/API/Features/Light'
import PTZMenu from '@/components/API/Features/PTZ'
import SDMenu from '@/components/API/Features/SD'
import WebUI from '@/components/API/Features/WebUI'

import Info from '@/components/API/System/Info'
import Time from '@/components/API/System/Time'
import Language from '@/components/API/System/Language'
import Reboot from '@/components/API/System/Reboot'
import Update from '@/components/API/System/Update'
import User from '@/components/API/System/User'

import MqttMenu from '@/components/API/Smarthome/Mqtt'
import AlarmserverMenu from '@/components/API/Smarthome/Alarmserver'
import IftttMenu from '@/components/API/Smarthome/Ifttt'
import HkMenu from '@/components/API/Smarthome/Hk'
import AlexaMenu from '@/components/API/Smarthome/Alexa'

export function SideMenu(): JSX.Element {
  
  return (
    <Card className="rounded-sm hidden lg:block">
      <CardContent>
        <Collapsible>
            <CollapsibleTrigger className='p-2 text-xl text-muted-foreground'>Network</CollapsibleTrigger>
            <CollapsibleContent className="flex flex-col">
              <IpConfigMenu />
              <OnvifMenu />
              <DdnsMenu />
              <P2pMenu />
              <WifiMenu />
            </CollapsibleContent>
        </Collapsible>
        <Collapsible>
            <CollapsibleTrigger className='p-2 text-xl text-muted-foreground'>Alarm</CollapsibleTrigger>
            <CollapsibleContent className="flex flex-col">
              <ActionsMenu />
              <AreasMenu />
              <ObjectDetectionMenu />
              <PushMenu />
              <ScheduleMenu />
            </CollapsibleContent>
        </Collapsible>
        <Collapsible>
            <CollapsibleTrigger className='p-2 text-xl text-muted-foreground'>Multimedia</CollapsibleTrigger>
            <CollapsibleContent className="flex flex-col">
              <AudioMenu />
              <VideoMenu />
              <ImageMenu />
              <OverlayMenu />
              <PrivacyMenu />
            </CollapsibleContent>
        </Collapsible>
        <Collapsible>
            <CollapsibleTrigger className='p-2 text-xl text-muted-foreground'>Recording</CollapsibleTrigger>
            <CollapsibleContent className="flex flex-col">
              <ImageRecMenu />
              <VideoRecMenu />
            </CollapsibleContent>
        </Collapsible>
        <Collapsible>
            <CollapsibleTrigger className='p-2 text-xl text-muted-foreground'>Features</CollapsibleTrigger>
            <CollapsibleContent className="flex flex-col">
              <MailMenu />
              <FTPMenu />
              <LightMenu />
              <PTZMenu />
              <SDMenu />
              <WebUI />
            </CollapsibleContent>
        </Collapsible>
        <Collapsible>
            <CollapsibleTrigger className='p-2 text-xl text-muted-foreground'>System</CollapsibleTrigger>
            <CollapsibleContent className="flex flex-col">
              <Info />
              <Time />
              <User />
              <Language />
              <Reboot />
              <Update />
            </CollapsibleContent>
        </Collapsible>
        <Collapsible>
            <CollapsibleTrigger className='p-2 text-xl text-muted-foreground'>Smarthome</CollapsibleTrigger>
            <CollapsibleContent className="flex flex-col">
              <MqttMenu />
              <AlarmserverMenu />
              <IftttMenu />
              <HkMenu />
              <AlexaMenu />
            </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}

