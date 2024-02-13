import { NavBar } from '@/components/NavBar'
import HelloWorld from '@/components/HelloWorld'
import CGIDoc from '@/components/FetchDoc'

import '@/styles/App.css'

export default function App(): JSX.Element {
  
  return (
    <>
      <NavBar />
      <br/><br/>
      <HelloWorld greeting='React-Query Elasticsearch Client' />

      <CGIDoc />
    </>
  )
}