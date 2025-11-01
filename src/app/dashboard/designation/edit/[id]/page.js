import Designation from '@/components/dashboard/edit/Designation';
const page = ({ params }) => {
  return <Designation id={params.id} />;
};

export default page;
