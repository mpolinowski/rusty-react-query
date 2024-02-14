import { useState } from 'react'

import { login } from '@/config.ts'
import { iMove, iPostApiResponseCode } from '@/types/iGeneral'

const cmd='http://'+login.url+':'+login.port+'/param.cgi?cmd='
const auth='&user='+login.user+'&pwd='+login.password
const param='ptzmove'
const cmdQuery = 'cmd="'+param+'";'
const act= {
    right: '&right=',
    left: '&left=',
    up: '&up=',
    down: '&down='
}

export const PanTilt = (props: iMove): React.JSX.Element => {
  const [status, setStatus] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [fetcherr, setFetcherr] = useState('');

  const handleClick = async () => {
    setIsLoading(true);
    console.log(cmd+param+act[props.direction]+props.distance+auth)

    try {
        const response = await fetch(cmd+param+act[props.direction]+props.distance+auth, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        })

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const cleanedTextResponse = (await response.text())
        .replace(cmdQuery, '{')
        .replace('response="', '"code":')
        .replace('";', '}')

      const jsonData: iPostApiResponseCode = JSON.parse(cleanedTextResponse)

      setStatus(jsonData);
    } catch (error: unknown) {
        if (error instanceof Error) {
            setFetcherr(error.message)
            // console.log(fetcherr)
          }
    } finally {
      setIsLoading(false)
    }
  }

  // console.log(status)

  return (
    <>
      <button onClick={handleClick}>{props.direction}{props.distance}</button>
      {isLoading && <>loading...</>}
    </>
  )
}