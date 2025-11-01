"use client"

import ViewSingle from "@/components/salesApproval/ViewSingle"
import {useState, useEffect} from 'react'
import Axios from "@/utils/axios";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const page = ({params}) => {
    const [viewableData, setViewableData] = useState({
        status: 'pending',
        data: null
    })

    console.log(viewableData)
   const getData = async id => {
const res = await Axios.get(`?action=get_order&SalesOrderID=${id}`)
setViewableData({
    status: 'idle',
    data: res.data.order ? res.data : null
})
   }

useEffect(() => {
    if(params.id){
        getData(params.id)
    }
}, [params])

  return (
    <ViewSingle viewableData={viewableData} />
  )
}

export default page