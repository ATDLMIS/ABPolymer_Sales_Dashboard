import ProductReceiptEdit from "@/components/dashboard/edit/ProductReceiptEdit"
const page = ({params}) => {    
  return (
    <ProductReceiptEdit id={params.id} />
  )
}

export default page