import PartyManagementAreaAdd from '@/components/PartyManagementAreaAdd';
const page = ({ params }) => {
  return <PartyManagementAreaAdd id={params.id} />;
};

export default page;
