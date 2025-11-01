import PartyManagementView from '@/components/dashboard/view/PartyManagementView';

const page = ({ params }) => {
  return <PartyManagementView id={params.id} />;
};

export default page;
