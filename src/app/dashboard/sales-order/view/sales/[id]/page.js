import SalesOrderView from "@/components/dashboard/view/SalesOrderView"
const page = ({params}) => {
  return (
    <SalesOrderView id={params.id} />
  )
}

export default page