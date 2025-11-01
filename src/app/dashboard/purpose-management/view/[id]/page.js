import PurposeView from '@/components/dashboard/view/PurposeView';
const page = ({ params }) => {
  return <PurposeView id={params.id} />;
};

export default page;
