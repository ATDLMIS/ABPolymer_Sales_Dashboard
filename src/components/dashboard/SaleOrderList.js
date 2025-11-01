'use client';
import { FaEye, FaRegEdit } from 'react-icons/fa';
import Link from 'next/link';
import useGetData from '@/utils/useGetData';
import convertDateFormat from '@/utils/convertDateFormat';
import formatAmountWithCommas from '@/utils/formatAmountWithCommas';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const SaleOrderList = () => {
  const { status, data } = useGetData(
    '?action=get_salesorders'
  );

  if (status === 'pending') {
    return (
      <div className="text-xl font-semibold text-center py-6">Loading...</div>
    );
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
                    Order ID
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Sales Order No
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
                    Party Name
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
                    Log User Name
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Total Amount
                  </th>

                  <th scope="col" className="px-6 py-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 &&
                  data.map(item => (
                    <tr
                      className="border-b border-neutral-200 dark:border-white/10"
                      key={item.salesOrderId}
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
                        {item.partyname}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                        {item.Status}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                        {item.logUserName}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                        {formatAmountWithCommas(Number(item.TotalAmount))}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 flex justify-center items-center gap-3">
                        <span className="bg-cyan-500 p-1 inline-block rounded-md">
                          <Link
                            href={`/dashboard/sales-order/view/sales/${item.SalesOrderID}`}
                          >
                            <FaEye className="text-white text-xl" />
                          </Link>
                        </span>{' '}
                        |
                        <span className="bg-amber-600 p-1 inline-block rounded-md">
                          <Link
                            href={`/dashboard/sales-order/edit/sales/${item.SalesOrderID}`}
                          >
                            <FaRegEdit className="text-white text-xl" />
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

export default SaleOrderList;
