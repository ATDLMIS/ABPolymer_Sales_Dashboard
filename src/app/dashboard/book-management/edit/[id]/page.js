import BookManagementEdit from '@/components/dashboard/edit/BookManagementEdit';
const page = ({ params }) => {
  return <BookManagementEdit id={params.id} />;
};

export default page;
