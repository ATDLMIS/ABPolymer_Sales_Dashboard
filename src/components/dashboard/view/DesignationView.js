'use client';
import useGetData from '@/utils/useGetData';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const DesignationView = ({ id }) => {
  const { status, data } = useGetData(
    `?action=get_desig&ID=${id}`
  );

  if (status === 'pending') {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="min-w-[600px] rounded-md bg-gray-300 p-5">
        <h1 className="text-center text-xl font-semibold mb-3">
          Designation Information
        </h1>
        <div className="flex items-center gap-2">
          <h1 className="text-lg">Id:</h1>
          <h1>{data.ID}</h1>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-lg">Designation:</h1>
          <h1>{data.CategoryName}</h1>
        </div>
      </div>
    </div>
  );
};

export default DesignationView;
