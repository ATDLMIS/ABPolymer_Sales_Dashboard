import RegionTypeView from '@/components/dashboard/view/RegionTypeView';

const page = ({ params }) => {
  return <RegionTypeView id={params.id} />;
};

export default page;
