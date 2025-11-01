import PurposeManagementEdit from '@/components/dashboard/edit/PurposeManagementEdit';

const page = ({ params }) => {
  return <PurposeManagementEdit id={params.id} />;
};

export default page;
