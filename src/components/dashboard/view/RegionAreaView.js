'use client';
import useGetData from '@/utils/useGetData';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const RegionAreaView = ({ id }) => {
  const { status, data } = useGetData(
    `?action=get_regionview&AreaRegionID=${id}`
  );

  if (status === 'pending') {
    return <div>Loading...</div>;
  }

  const plucoutData = data[0];

  return (
    <div className="flex justify-center">
      <div className="min-w-[600px] rounded-md bg-gray-300 p-5">
        <h1 className="text-center text-xl font-semibold mb-3">
          Region Area Information
        </h1>
        <div className="flex items-center gap-2">
          <h1 className="text-lg">Area Id:</h1>
          <h1>{plucoutData.AreaID}</h1>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-lg">Area Name:</h1>
          <h1>{plucoutData.AreaName}</h1>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-lg">District Name:</h1>
          <h1>{plucoutData.DistrictName}</h1>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-lg">Division Name:</h1>
          <h1>{plucoutData.DivisionName}</h1>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-lg">Thana Name:</h1>
          <h1>{plucoutData.ThanaName}</h1>
        </div>
      </div>
    </div>
  );
};

export default RegionAreaView;
