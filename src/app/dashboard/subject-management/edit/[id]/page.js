import SubjectManagementEdit from '@/components/dashboard/edit/SubjectManagementEdit';

const page = ({ params }) => {
  return <SubjectManagementEdit id={params.id} />;
};

export default page;
