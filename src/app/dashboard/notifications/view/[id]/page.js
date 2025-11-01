'use client'
import useGetData from "@/utils/useGetData"
import Link from "next/link"
import {useState, useEffect} from 'react'
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const page = ({params}) => {
    const {status, data} = useGetData(`?action=get_notifications&UserID=501&sndNotificationsID=${params.id}`)
    const generateLinkHref = id => {
        switch (id){
            case 3:
                return "/dashboard/expense-approval";
            case 8:
                return "/dashboard/money-receipt-approval";
            case 2:
                return "/dashboard/sales-order-approval";
            case 1:
                return "/dashboard/visit-approval";
            default:
                return "/dashboard"
        }
    }

    if(status === 'pending'){
        return <div className="text-xl font-semibold text-center py-6">Loading...</div>
    }

  return (
    <div>
        {data.length > 0 ? <div>
            {data.map((item, index) =>(
                    <div key={index} className="bg-gray-200 rounded-md p-2 my-2">
                        <h1 className="text-xl font-semibold py-2">{item.NotificationTitle}</h1>
                        <p className="pb-3">{item.NotificationStatusMeans}</p>
                        <Link href={generateLinkHref(Number(params.id))} className="bg-blue-400 rounded-md px-3 py-2 inline-block text-white">Go TO Page</Link>
                    </div>
            ))}
        </div> : <div>No Notification To Display</div>}
    </div>
  )
}

export default page