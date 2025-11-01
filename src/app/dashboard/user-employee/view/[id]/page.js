import UserEmployeeView from '@/components/dashboard/view/UserEmployeeView';

const page = ({ params }) => {
  return <UserEmployeeView id={params.id} />;
};

export default page;
