'use client';
import useGetData from '@/utils/useGetData';
import Image from 'next/image';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const InstitutionManagementView = ({ id }) => {
  const { status, data } = useGetData(
    `?action=get_institution&institutionID=${id}`
  );
  console.log(data);

  if (status === 'pending') {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div>
        {data.InstitutionScanImageURL && (
          <div className="flex justify-center pb-3">
            <Image
              src={data.InstitutionScanImageURL}
              width={500}
              height={500}
              alt="Institution Photo"
            />
          </div>
        )}
      </div>
      <div className="flex justify-center">
        <div className="min-w-[600px] rounded-md bg-gray-300 p-5">
          <h1 className="text-center text-xl font-semibold mb-3">
            Institution Management Details
          </h1>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Id:</h1>
            <h1>{data.InstitutionID}</h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Institution Name:</h1>
            <h1>{data.InstitutionName}</h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Institution EIIN:</h1>
            <h1>{data.EIINNo}</h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Total Students:</h1>
            <h1>{data.TotalStudents}</h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Address:</h1>
            <h1>{data.Address}</h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Contact Person Name:</h1>
            <h1>{data.ContactPersonName}</h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Contact Number:</h1>
            <h1>{data.ContactPhone}</h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">status:</h1>
            <h1>{data.status ? 'Active' : 'Deactive'}</h1>
          </div>
        </div>
      </div>
      {data.details.length && (
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block max-w-full w-full pt-5">
              <div className="overflow-hidden">
                <table className="max-w-full w-full border border-neutral-200 text-center text-sm font-light text-surface dark:border-white/10 dark:text-white">
                  <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                    <tr className="bg-text1 text-white">
                      <th
                        scope="col"
                        className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                      >
                        Teacher Name
                      </th>
                      <th
                        scope="col"
                        className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                      >
                        Designation
                      </th>
                      <th
                        scope="col"
                        className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                      >
                        Mobile Number
                      </th>
                      <th
                        scope="col"
                        className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                      >
                        Class Name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Subject Name
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.details.map(item => (
                      <tr
                        className="border-b border-neutral-200 dark:border-white/10"
                        key={item.id}
                      >
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.TeacherName}
                        </td>

                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.Designation}
                        </td>

                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.ContactPhone}
                        </td>

                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.ClassName}
                        </td>

                        <td className="whitespace-nowrap px-6 py-4 flex justify-center items-end h-full gap-3">
                          {item.SubjectName}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InstitutionManagementView;
