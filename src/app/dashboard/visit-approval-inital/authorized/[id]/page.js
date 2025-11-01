'use client'
import Authorized from '@/components/dashboard/visit-plan-approval/Authorized'
import useGetData from "@/utils/useGetData"
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const page = ({params}) => {
  const viewableData = useGetData(`?action=get_visit_entryforApproval&VisitPlanID=${params.id}`)
  return (
    <Authorized viewableData={viewableData} id={params.id} />
  )
}

export default page