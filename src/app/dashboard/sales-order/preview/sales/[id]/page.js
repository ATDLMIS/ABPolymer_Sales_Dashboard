import SalesReceivedNote from '@/components/dashboard/view/SalesReceivedNote';

const page = ({ params }) => {
  return <SalesReceivedNote id={params.id} />;
};

export default page;
