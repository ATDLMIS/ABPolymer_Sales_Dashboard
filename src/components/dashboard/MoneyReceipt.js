'use client';
import useGetData from '@/utils/useGetData';
import { FaEye, FaRegEdit } from 'react-icons/fa';
import Link from 'next/link';
import formatAmountWithCommas from '@/utils/formatAmountWithCommas';
import convertDateFormat from '@/utils/convertDateFormat';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


const MoneyReceipt = () => {
  const { status, data } = useGetData(
    '?action=get_moneyreceipts'
  );
  if (status === 'pending') {
    return (
      <div className="text-xl font-semibold text-center p-6">Loading...</div>
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
                    Money Receipt No.
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Receipt Date
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Amount Received
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Received Method
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Bank Name/Purpose
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
                      key={item.MRID}
                    >
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                        {item.MRNo}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                        {convertDateFormat(item.MRDate)}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                        {formatAmountWithCommas(Number(item.AmountReceived))}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                        {item.PaymentMethod}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                        {item.PaymentMethodDetails}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 flex justify-center items-center gap-3">
                        <Link
                          href={`/dashboard/money-receipt/view/${item.MRID}`}
                        >
                          <span className="bg-cyan-500 p-1 inline-block rounded-md">
                            <FaEye className="text-white text-xl" />
                          </span>{' '}
                        </Link>
                        |
                        <Link
                          href={`/dashboard/money-receipt/edit/${item.MRID}`}
                        >
                          <span className="bg-amber-600 p-1 inline-block rounded-md">
                            <FaRegEdit className="text-white text-xl" />
                          </span>{' '}
                        </Link>
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

export default MoneyReceipt;
