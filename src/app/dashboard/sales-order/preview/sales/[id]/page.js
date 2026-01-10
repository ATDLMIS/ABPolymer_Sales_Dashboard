import SalesReceivedNote from '@/components/dashboard/view/SalesReceivedNote';

const page = ({ params }) => {
  return(
  <>
   <div className="max-w-5xl  mx-auto px-4 py-6">{
      params.id?<SalesReceivedNote id={params.id} />:<Loading />
    }</div>
  </>
  )
 
};

export default page;
