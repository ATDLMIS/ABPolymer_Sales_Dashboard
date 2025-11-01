import TaDaView from '@/components/dashboard/view/TaDaView';
const page = ({ params }) => {
  return <TaDaView id={params.id} />;
};

export default page;
