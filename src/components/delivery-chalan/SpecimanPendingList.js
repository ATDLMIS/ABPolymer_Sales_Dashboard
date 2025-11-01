import React from 'react';
import useGetData from '@/utils/useGetData';
import Link from 'next/link';
import convertDateFormat from '@/utils/convertDateFormat';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const SpecimanPendingList = () => {
  const specimanOrderList = useGetData(
    '?action=get_specimenordersChallan'
  );
  if (specimanOrderList.status === 'pending') {
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
                    Sales Order ID
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Sales Order No.
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Order Date
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
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Challan Status
                  </th>

                  <th scope="col" className="px-6 py-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {specimanOrderList.data.length > 0 &&
                  specimanOrderList.data.map(item => (
                    <tr
                      className="border-b border-neutral-200 dark:border-white/10"
                      key={item.SalesOrderID}
                    >
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                        {item.SalesOrderID}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                        {item.SalesOrderNo}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                        {convertDateFormat(item.OrderDate)}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                        {item.SpecimenUserName}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                        {item.Status}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                        {item.challanstatusName}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 flex justify-center items-center gap-3">
                      <span className="inline-block rounded-md">
                          <Link
                            href={`/dashboard/delivery-challan/add-speciman/${item.SalesOrderID}`}
                          >
                            <button className="rounded-md bg-black px-4 py-2 text-white">Add Challan</button>
                          </Link>
                        </span>
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

export default SpecimanPendingList;
