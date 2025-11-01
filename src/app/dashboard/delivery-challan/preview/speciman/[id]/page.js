import ChallanSpecimanNote from "@/components/dashboard/view/ChallanSpecimanNote"

const page = ({params}) => {
  return (
    <ChallanSpecimanNote id={params.id} />
  )
}

export default page