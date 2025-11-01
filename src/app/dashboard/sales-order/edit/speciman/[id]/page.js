import SpecimanOrderEdit from '@/components/dashboard/edit/SpecimanOrderEdit';
const page = ({params}) => {

  return <SpecimanOrderEdit id={params.id} />;
}

export default page