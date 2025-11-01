'use client';
import useGetData from '@/utils/useGetData';
import Image from 'next/image';
import Link from 'next/link';
import formatAmountWithCommas from '@/utils/formatAmountWithCommas';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const ProductReceiptView = ({ id }) => {
  const { status, data } = useGetData(
    `?action=get_ppreceiptall&ProductReceiptID=${id}`
  );

  console.log(data);

  if (status === 'pending') {
    return (
      <div className="text-xl font-semibold text-center py-5">Loading...</div>
    );
  }
  return (
    <>
      <div className="flex justify-end">
        <Link href={`/dashboard/product-receipt/preview/${id}`}>
          <button className="bg-primary1 text-white px-4 py-2 rounded hover:bg-blue-600">
            Preview
          </button>
        </Link>
      </div>
      <div className="flex justify-center">
        <div className="min-w-[600px] rounded-md bg-gray-300 p-5">
          <h1 className="text-center text-xl font-semibold mb-3">
            Receipt Details
          </h1>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Receipt No:</h1>
            <h1>{data.receipt.ProductReceiptNo}</h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Receipt Date:</h1>
            <h1>{data.receipt.ReceiptDate}</h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Binding Party ID:</h1>
            <h1>{data.receipt.BindingPartyID}</h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Binding Party Name:</h1>
            <h1>{data.receipt.BindingPartyName}</h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Challan Number:</h1>
            <h1>{data.receipt.ChallanNumber}</h1>
          </div>
        </div>
      </div>
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
                    Financial Year
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Product Type
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Product Name
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Qty
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.details.length &&
                  data.details.map(item => (
                    <tr className="border-b border-neutral-200 dark:border-white/10">
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                        {item.FinancialYearName}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                        {item.ProductCategoryName}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                        {item.ProductName}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                        {formatAmountWithCommas(Number(item.Quantity))}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                        {formatAmountWithCommas(Number(item.Rate))}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                        {formatAmountWithCommas(Number(item.Total))}
                      </td>
                    </tr>
                  ))}
                <tr className="border-b border-neutral-200 dark:border-white/10">
                  <td
                    className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10"
                    colSpan="4"
                  ></td>
                  <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                    Total
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 flex justify-center gap-3 font-medium">
                    {formatAmountWithCommas(
                      data.details.reduce(
                        (accumulator, currentValue) =>
                          accumulator + Number(currentValue.Total),
                        0
                      )
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* <div className="flex justify-center py-5">
        {data?.receipt?.ChallanCopyPath ? (
          <Image
            src={data?.receipt?.ChallanCopyPath}
            alt="cover page"
            width={500}
            height={500}
          />
        ) : (
          ''
        )}
      </div> */}
    </>
  );
};

export default ProductReceiptView;
