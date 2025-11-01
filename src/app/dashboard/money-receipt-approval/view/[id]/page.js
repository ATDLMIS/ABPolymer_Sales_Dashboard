'use client'
import axios from "axios"
import { useState, useEffect } from "react"
import ReceiptSingleView from "@/components/moneyApproval/ReceiptSingleView"
import Axios from "@/utils/axios";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const page = ({params}) => {
    const [viewableData, setViewableData] = useState({
        status: 'pending',
        data: null
    })

    console.log(viewableData)

const getData = async id => {
    const res = await Axios.get(`?action=get_moneyreceipt&MRID=${id}`)
setViewableData({
    status: 'idle',
    data: res.data
})
}

useEffect(()=>{
if(params.id){
    getData(params.id)
}
}, [params.id])

  return (
    <ReceiptSingleView viewableData={viewableData} /> 
  )
}

export default page