import GoodsReceivedNote from '@/components/dashboard/view/GoodsReceivedNote';

const page = ({ params }) => {
  return (
    <div>
      <GoodsReceivedNote id={params.id} />
    </div>
  );
};

export default page;
