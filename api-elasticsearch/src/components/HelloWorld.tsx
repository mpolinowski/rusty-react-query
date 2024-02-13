import React from 'react'

import { iHelloWorld } from '@/types/interfaces'

export default function HelloWorld({ greeting }: iHelloWorld): React.JSX.Element {
    return (
        <h2 className="scroll-m-20 mb-7 text-3xl font-semibold tracking-tight first:mt-0">
          { greeting }
        </h2>
    )
}