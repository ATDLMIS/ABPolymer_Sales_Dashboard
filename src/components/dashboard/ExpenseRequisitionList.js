'use client';
import useGetData from '@/utils/useGetData';
import { FaEye, FaRegEdit } from 'react-icons/fa';
import Link from 'next/link';
import convertDateFormat from '@/utils/convertDateFormat';
import formatAmountWithCommas from '@/utils/formatAmountWithCommas';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


const ExpenseRequisitionList = () => {
  const { status, data } = useGetData(
    '?action=get_BDExpReqs'
  );
  if (status === 'pending') {
    return (
      <div className="text-xl font-semibold text-center py-6">Loading....</div>
    );
  }
  return (
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
                  Exp. ID
                </th>
                <th
                  scope="col"
                  className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                >
                  Exp. NO.
                </th>
                <th
                  scope="col"
                  className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                >
                  Institution
                </th>
                <th
                  scope="col"
                  className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                >
                  Date
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
              {data.length &&
                data.map(item => (
                  <tr
                    className="border-b border-neutral-200 dark:border-white/10"
                    key={item.BDExpReqID}
                  >
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                      {item.BDExpReqID}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {item.BDExpReqNo}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {item.InstitutionName}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {convertDateFormat(item.BDExpReqDate)}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {formatAmountWithCommas(Number(item.TotalAmount))}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="bg-cyan-500 p-1 inline-block rounded-md">
                        <Link
                          href={`/dashboard/expense-requisition/view/${item.BDExpReqID}`}
                        >
                          <FaEye className="text-white text-xl" />
                        </Link>
                      </span>{' '}
                      |
                      <span className="bg-amber-600 p-1 inline-block rounded-md">
                        <Link
                          href={`/dashboard/expense-requisition/edit/${item.BDExpReqID}`}
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
  );
};

export default ExpenseRequisitionList;
