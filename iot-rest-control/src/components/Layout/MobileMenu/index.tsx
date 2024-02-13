import {
    CardTitle,
} from "@/components/ui/card"

import {
    Menubar
} from "@/components/ui/menubar"

import { AlarmMenu } from '@/components/Layout/MobileMenu/AlarmMenu'
import { NetworkMenu } from '@/components/Layout/MobileMenu/NetworkMenu'
import { FeaturesMenu } from '@/components/Layout/MobileMenu/FeaturesMenu'
import { MultimediaMenu } from '@/components/Layout/MobileMenu/MultimediaMenu'
import { SmarthomeMenu } from '@/components/Layout/MobileMenu/SmarthomeMenu'

export function MobileMenu(): JSX.Element {
    return (
        <Menubar className="flex lg:hidden rounded-sm mb-2">
            <CardTitle className="px-5">Front Camera</CardTitle>
            <AlarmMenu />
            <NetworkMenu />
            <FeaturesMenu />
            <MultimediaMenu />
            <SmarthomeMenu />
        </Menubar>
    )
}