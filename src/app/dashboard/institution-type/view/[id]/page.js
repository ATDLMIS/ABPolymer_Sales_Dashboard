import InstitutionTypeView from '@/components/dashboard/view/InstitutionTypeView';
const page = ({ params }) => {
  return <InstitutionTypeView id={params.id} />;
};

export default page;
