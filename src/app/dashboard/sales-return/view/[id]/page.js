import ProductReturnView from "@/components/dashboard/view/ProductReturnView"
const page = ({params}) => {

  return (
    <ProductReturnView id={params.id} />
  )
}

export default page