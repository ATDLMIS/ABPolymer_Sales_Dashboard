import BookCategoryView from '@/components/dashboard/view/BookCategoryView';
const page = ({ params }) => {
  return <BookCategoryView id={params.id} />;
};

export default page;
