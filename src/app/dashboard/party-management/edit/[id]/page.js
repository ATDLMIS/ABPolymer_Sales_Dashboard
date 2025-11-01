import PartyManagementEdit from '@/components/dashboard/edit/PartyManagementEdit';

const page = ({ params }) => {
  return <PartyManagementEdit id={params.id} />;
};

export default page;
