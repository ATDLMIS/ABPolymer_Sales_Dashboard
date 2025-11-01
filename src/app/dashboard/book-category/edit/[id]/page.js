import BookCategoryEdit from '@/components/dashboard/edit/BookCategoryEdit';

const page = ({ params }) => {
  return <BookCategoryEdit id={params.id} />;
};

export default page;
