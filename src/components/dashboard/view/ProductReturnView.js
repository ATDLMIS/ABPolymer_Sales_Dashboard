'use client'
import useGetData from '@/utils/useGetData';
import convertDateFormat from '@/utils/convertDateFormat';
import formatAmountWithCommas from '@/utils/formatAmountWithCommas';
import Link from 'next/link';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const ProductReturnView = ({id}) => {
    const returnData = useGetData(`?action=get_Returnall&ProductReturnID=${id}`)
    if(returnData.status === 'pending'){
        return <div className='text-xl font-semibold text-center py-6'>Loading...</div>
    }
  return (
    <>
    <div className="flex justify-end">
        <Link
          href={`/dashboard/sales-return/preview/${id}`}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Preview
        </Link>
    </div>
        <div className="flex justify-center">
        <div className="min-w-[600px] rounded-md bg-gray-300 p-5">
          <h1 className="text-center text-xl font-semibold mb-3">
            Product Return
          </h1>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Date:</h1>
            <h1>{convertDateFormat(returnData.data.receipt.ReturnDate)}</h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Product Return No:</h1>
            <h1>{returnData.data.receipt.ProductReturnNo}</h1>
          </div>

          <div className="flex items-center gap-2">
            <h1 className="text-lg">Party Name:</h1>
            <h1>{returnData.data.receipt.PartyName}</h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Created By:</h1>
            <h1>{returnData.data.receipt.CreatedBy}</h1>
          </div>
        </div>
      </div>

      {returnData.data.details.length > 0 && (
        <div className="inline-block max-w-full w-full pt-5">
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
                          Financial Year
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
                          Quantity
                        </th>
                        <th
                          scope="col"
                          className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                        >
                          Price
                        </th>

                        <th scope="col" className="px-6 py-4">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {returnData.data.details.map(item => (
                        <tr
                          className="border-b border-neutral-200 dark:border-white/10"
                          key={item.SL}
                        >
                          <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                            {item.FinancialYearName}
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

                          <td className="whitespace-nowrap px-6 py-4 flex justify-center gap-3 font-medium">
                            {formatAmountWithCommas(
                              Number(item.Rate) * Number(item.Quantity)
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProductReturnView