import DesignationView from '@/components/dashboard/view/DesignationView';
const page = ({ params }) => {
  console.log(params.id);
  return <DesignationView id={params.id} />;
};

export default page;
