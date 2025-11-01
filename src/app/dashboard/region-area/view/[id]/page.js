import RegionAreaView from '@/components/dashboard/view/RegionAreaView';

const page = ({ params }) => {
  return <RegionAreaView id={params.id} />;
};

export default page;
