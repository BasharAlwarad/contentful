import { useState,useEffect } from 'react'
import localData from './data/data'
import {createClient} from 'contentful'

function App() {

const [data, setData] = useState([])

// const SPACE_ID="8shhe87vbcl2"
// const ACCESS_TOKEN="j2_UDfcy142Sy4qXcm5izbwKnl8KDn5tWPkZ3dW5vRM"



const client = createClient({
  space: import.meta.env.VITE_SPACE_ID,
  environment: 'master', // defaults to 'master' if not set
  accessToken: import.meta.env.VITE_ACCESS_TOKEN
  // space: SPACE_ID,
  // environment: 'master', // defaults to 'master' if not set
  // accessToken: ACCESS_TOKEN
})

const getAll = async (type="user",limit=10,skip=5) => { 
try {
  const entry= await client.getEntries({
    content_type: type,
    limit,
    skip
  })
  setData(entry?.items)  
  console.log(entry)
} catch (er) {
  console.log(er.message)
}
}

 useEffect(() => {
   getAll()
 
   return () => {
     
   }
 }, [])
 


  return (
    <>
    {
      data.map(e=>(
        <div key= {e?.fields.userId} > {e?.fields.name} </div>
      ))
    }
    </>
  )
}

export default App
