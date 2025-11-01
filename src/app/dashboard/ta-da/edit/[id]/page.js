import TaDaEdit from '@/components/dashboard/edit/TaDaEdit';
const page = ({ params }) => {
  return <TaDaEdit id={params.id} />;
};

export default page;
