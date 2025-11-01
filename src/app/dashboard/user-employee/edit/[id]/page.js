import UserEmployeeEdit from '@/components/dashboard/edit/UserEmployeeEdit';
const page = ({ params }) => {
  return <UserEmployeeEdit id={params.id} />;
};

export default page;
