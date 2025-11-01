import ProductReceiptView from '@/components/dashboard/view/ProductReceiptView';
const page = ({ params }) => {
  return <ProductReceiptView id={params.id} />;
};

export default page;
