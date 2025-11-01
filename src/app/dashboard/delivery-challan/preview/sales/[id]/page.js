import ChallanSalesNote from "@/components/dashboard/view/ChallanSalesNote"
const page = ({params}) => {
  return (
    <ChallanSalesNote id={params.id} />
  )
}

export default page