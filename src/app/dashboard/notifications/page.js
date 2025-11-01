'use client'
import useGetData from "@/utils/useGetData"
import Link from "next/link"
import { useEffect, useState } from "react";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const page = () => {
    const [userID, setUserID] = useState(null);
  
    useEffect(() => {
      const storedUserID = localStorage.getItem("UserID") || "defaultID";
      setUserID(storedUserID);
    }, []);

    const {status, data} = useGetData(`?action=get_all_notifications&UserID=${userID}`)
    if(status === 'pending'){
        return <div className="text-xl font-semibold text-center py-6">Loading...</div>
    }
  return (
    <div>
        {data.length > 0 ? <div>{
            data.map(item => (
                <Link href={`/dashboard/notifications/view/${item.sndNotificationsID}`} key={item.sndNotificationsID} className="bg-gray-200 rounded-md p-2 my-2 block">
                    <div>
                        <h1>{item.NotificationTitle}</h1>
                         <p className="text-red-400">{item.No_of_Notifications} new</p>
                    </div>
                </Link>
            ))
        }</div> : <div>No Notification</div>}
    </div>
  )
}

export default page