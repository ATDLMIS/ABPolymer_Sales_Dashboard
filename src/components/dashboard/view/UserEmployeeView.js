'use client';
import useGetData from '@/utils/useGetData';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const UserEmployeeView = ({ id }) => {
  const { status, data } = useGetData(
    `?action=get_sndUser&UserID=${id}`
  );
  console.log("user Employee",data);
  if (status === 'pending') {
    return <div>Looding...</div>;
  }
  return (
    <div className="flex justify-center">
      <div className="min-w-[600px] rounded-md bg-gray-300 p-5">
        <h1 className="text-center text-xl font-semibold mb-3">
          User Information
        </h1>
        <div className="flex items-center gap-2">
          <h1 className="text-lg">Name:</h1>
          <h1>{data.EmpName}</h1>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-lg">Username:</h1>
          <h1>{data.Username}</h1>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-lg">Email:</h1>
          <h1>{data.Email}</h1>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-lg">ID:</h1>
          <h1>{data.EmployeeID}</h1>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-lg">Phone:</h1>
          <h1>{data.Phone}</h1>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-lg">Status:</h1>
          <h1>{data.Status === 1 ? 'Active' : 'Deactive'}</h1>
        </div>
      </div>
    </div>
  );
};

export default UserEmployeeView;
