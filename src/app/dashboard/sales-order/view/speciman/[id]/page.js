import SpecimanOrderView from "@/components/dashboard/view/SpecimanOrderView"

const page = ({params}) => {
  return (
    <SpecimanOrderView id={params.id} />
  )
}

export default page