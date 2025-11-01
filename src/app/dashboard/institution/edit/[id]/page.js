import InstitutionManagementEdit from '@/components/dashboard/edit/InstitutionManagementEdit';

const page = ({ params }) => {
  return <InstitutionManagementEdit id={params.id} />;
};

export default page;
