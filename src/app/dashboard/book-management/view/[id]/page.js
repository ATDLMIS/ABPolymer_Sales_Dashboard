import BookManagementView from '@/components/dashboard/view/BookManagementView';
const page = ({ params }) => {
  return <BookManagementView id={params.id} />;
};

export default page;
