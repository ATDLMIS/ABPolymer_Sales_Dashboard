import RegionAreaEdit from '@/components/dashboard/edit/RegionAreaEdit';
const page = ({ params }) => {
  return <RegionAreaEdit id={params.id} />;
};

export default page;
