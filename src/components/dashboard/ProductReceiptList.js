'use client';
import { FaEye, FaRegEdit } from 'react-icons/fa';
import useGetData from '@/utils/useGetData';
import Link from 'next/link';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const ProductReceiptList = () => {
  const { status, data } = useGetData(
    '?action=get_ppreceipts'
  );

  console.log(data);

  if (status === 'pending') {
    return (
      <div className="text-xl font-semibold text-center py-5">Loading...</div>
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
                    Receipt Id
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Receipt No
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
                    Challan Number
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Challan Copy
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
                      key={item.ProductReceiptNo}
                    >
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                        {item.ProductReceiptID}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                        {item.ProductReceiptNo}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                        {item.ReceiptDate}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                        {item.ChallanNumber}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                        <a href={item.ChallanCopyPath} download target="_blank">
                          Download
                        </a>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 flex justify-center items-center gap-3">
                        <span className="bg-cyan-500 p-1 inline-block rounded-md">
                          <Link
                            href={`/dashboard/product-receipt/view/${item.ProductReceiptID}`}
                          >
                            <FaEye className="text-white text-xl" />
                          </Link>
                        </span>{' '}
                        |
                        <span className="bg-amber-600 p-1 inline-block rounded-md">
                          <Link
                            href={`/dashboard/product-receipt/edit/${item.ProductReceiptID}`}
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

export default ProductReceiptList;
