import React from 'react';
import useGetData from '@/utils/useGetData';
import Link from 'next/link';
import { FaEye, FaRegEdit } from 'react-icons/fa';
import convertDateFormat from '@/utils/convertDateFormat';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const SpecimanList = () => {
  const specOrderList = useGetData(
    '?action=get_challansSpecimen'
  );
  if (specOrderList.status === 'pending') {
    <div className="text-xl font-semibold text-center py-6">Loading...</div>;
  }
  return (
    <div className="flex flex-col">
      <div>
        <div className="inline-block max-w-full w-full pt-5">
          <div className="overflow-x-scroll">
            <table className="max-w-full w-full overflow-x-scroll border border-neutral-200 text-center text-sm font-light text-surface dark:border-white/10 dark:text-white">
              <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                <tr className="bg-text1 text-white">
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Challan ID
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Challan No.
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Challan Date
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Speciman User Name
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Status
                  </th>

                  <th scope="col" className="px-6 py-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {specOrderList.data.length > 0 &&
                  specOrderList.data.map(item => (
                    <tr
                      className="border-b border-neutral-200 dark:border-white/10"
                      key={item.ChallanID}
                    >
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                        {item.ChallanID}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                        {item.ChallanNo}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                        {convertDateFormat(item.ChallanDate)}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                        {item.EmployeeName}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                        {item.StatusName}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 flex justify-center items-center gap-3">
                        <span className="bg-cyan-500 p-1 inline-block rounded-md">
                          <Link
                            href={`/dashboard/delivery-challan/view/speciman/${item.ChallanID}`}
                          >
                            <FaEye className="text-white text-xl" />
                          </Link>
                        </span>{' '}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecimanList;
