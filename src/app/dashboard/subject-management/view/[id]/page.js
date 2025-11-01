import SubjectInfoView from '@/components/dashboard/view/SubjectInfoView';

const page = ({ params }) => {
  return <SubjectInfoView id={params.id} />;
};

export default page;
