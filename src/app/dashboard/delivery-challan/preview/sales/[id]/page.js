"use client";
import ChallanSalesNote from "@/components/dashboard/view/ChallanSalesNote"
import Loading from "@/components/Loading"
import { useRouter } from "next/navigation";
const page = ({params}) => {
const router=useRouter();
  return (
    <div className="max-w-5xl  mx-auto px-4 py-6">{
      params.id?<ChallanSalesNote id={params.id} router={router}/>:<Loading />
    }
    </div>
   
  )
}

export default page