import useGetData from "@/utils/useGetData"
import Link from "next/link"
import convertDateFormat from "@/utils/convertDateFormat"
import formatAmountWithCommas from "@/utils/formatAmountWithCommas"
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const SalesPendingList = () => {
    const {status, data} = useGetData('?action=get_salesordersInvoice')
    if(status === 'pending'){
        return <div className="text-xl fonr-semibold text-center py-3">Loading...</div>
    }
    console.log(data)
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
                        SL
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
                       Challan No
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
                       Total Amount
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
                    {data.length > 0 && data.map(item => (
                      <tr
                        className="border-b border-neutral-200 dark:border-white/10"
                        key={item.SL}
                      >
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.SL}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.SalesOrderNo}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {convertDateFormat(item.OrderDate)}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                          {item.partyname}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                          {item.ChallanNo}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                          {convertDateFormat(item.ChallanDate.date.split(' ')[0])}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                          {formatAmountWithCommas(Number(item.TotalAmount))}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                          {item.challanstatusName}
                        </td>
    
                        <td className="whitespace-nowrap px-6 py-4 flex justify-center items-center gap-3">
                          <Link href={`/dashboard/invoice-bill/add/sales/${item.ChallanID}`}>
                            <button className="px-4 py-2 bg-black text-white rounded-md">Add Invoice</button>
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
  )
}

export default SalesPendingList