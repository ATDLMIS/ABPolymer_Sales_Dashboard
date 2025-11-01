'use client'
import Checked from "@/components/dashboard/visit-plan-approval/Checked"
import useGetData from "@/utils/useGetData"
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const page = ({params}) => {
  const viewableData = useGetData(`?action=get_visit_entryforApproval&VisitPlanID=${params.id}`)
  return (
    <Checked viewableData={viewableData} id={params.id} />
  )
}

export default page