import ClassManagementView from '@/components/dashboard/view/ClassManagementView';
const page = ({ params }) => {
  return <ClassManagementView id={params.id} />;
};

export default page;
