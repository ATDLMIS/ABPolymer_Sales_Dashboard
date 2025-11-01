import InstitutionManagementView from '@/components/dashboard/view/InstitutionManagementView';
const page = ({ params }) => {
  return <InstitutionManagementView id={params.id} />;
};

export default page;
