import PartyManagementDocumentAdd from '@/components/PartyManagementDocumentAdd';
const page = ({ params }) => {
  return <PartyManagementDocumentAdd id={params.id} />;
};

export default page;
