import ProductReturnNote from "@/components/ProductReturnNote"
const page = ({params}) => {
  return (
    <ProductReturnNote id={params.id} />
  )
}

export default page