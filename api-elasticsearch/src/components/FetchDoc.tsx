import React, { useState } from 'react'
import { useQuery, UseQueryResult } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"

import { Input } from "@/components/ui/input"

import { useDebounce } from '@/utils/hooks'
import { api } from '../../config.ts'
import { iElasticSearchResponse } from '@/types/interfaces'

const getData = async(query: string): Promise<iElasticSearchResponse> => {
    // console.log(api.url+query)
    const response = await fetch(api.url+query)
    if (response.ok) {
        return response.json()
    }
    throw new Error('ERROR :: Data fetching failed!')
}

export default function CGIDoc(): React.JSX.Element {

    const [search, setSearch] = useState('') //⁇
    const debounceSearch = useDebounce(search, 500)

    const {
        isLoading,
        isError,
        error,
        data,
        isSuccess
    }: UseQueryResult<iElasticSearchResponse, Error> = useQuery<iElasticSearchResponse, Error>({
        queryKey: ['elasticresponse', { debounceSearch }],
        queryFn: () => getData(debounceSearch),
        staleTime: 1000 * 5,
        refetchOnMount: true,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
        refetchInterval: 1000 * 60,
        refetchIntervalInBackground: false,
        retry: true,
        retryOnMount: true,
        // retryDelay: 1000 * 5, // default increases exponentially
    })

    if(isLoading) return (
        <Button variant="ghost" disabled>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      )

    if(isError) return (
        <Badge variant="destructive" className='mb-2'>
            {error.message}
        </Badge>
    )

    if(isSuccess) return (
        
      <Card>
            <CardHeader>
                <CardTitle>HTTP Rest API</CardTitle>
                <CardDescription>Search the INSTAR 2k+ CGI Interface</CardDescription>
                <br/>
                <Input
                    type='text'
                    onChange={e => (setSearch(e.target.value))}
                    value={search}
                    placeholder='Search'
                />
            </CardHeader>
            <CardContent>
                <div className="flex flex-row flex-wrap">
                {
                        data?.hits.hits.map((result) => {
                            return(
                                <Drawer key={result._id}>
                                    <DrawerTrigger>
                                        <Button className="m-2" variant="outline">
                                            {result._source.title}
                                        </Button>
                                    </DrawerTrigger>
                                    <DrawerContent>
                                        <DrawerHeader>
                                            <DrawerTitle>{result._source.cgi}</DrawerTitle>
                                            <DrawerDescription>{result._source.abstract.en}</DrawerDescription>
                                        </DrawerHeader>
                                        <DrawerFooter>
                                            <div className="grid grid-cols-2 gap-4 break-words">
                                                {result?._source.parameters.map(param => (
                                                        <ul key={param.mqtt}>
                                                            <li><strong>SET CGI: </strong>{param.cgi}</li>
                                                            <li><strong>MQTT: </strong>{param.mqtt}</li>
                                                        </ul>
                                                ))}
                                            </div>
                                            <DrawerClose>
                                                <br/>
                                                <Button variant="outline">close</Button>
                                            </DrawerClose>
                                        </DrawerFooter>
                                    </DrawerContent>
                                </Drawer>
                            )
                        })
                    }
                </div>
            </CardContent>
            <CardFooter>
                <small></small>
            </CardFooter>
        </Card>
    )

    else return <Badge variant="outline" className='mb-2'>Huh?</Badge>
}