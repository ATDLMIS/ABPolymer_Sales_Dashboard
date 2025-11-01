import ClassManagementEdit from '@/components/dashboard/edit/ClassManagementEdit';
const page = ({ params }) => {
  return <ClassManagementEdit id={params.id} />;
};

export default page;
