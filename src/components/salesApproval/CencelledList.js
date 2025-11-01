import Link from "next/link"
import convertDateFormat from "@/utils/convertDateFormat"
import formatAmountWithCommas from "@/utils/formatAmountWithCommas"

const CencelledList = ({CancelledData, type}) => {
    if(!CancelledData||CancelledData?.status === 'pending'){
        return <div className="text-xl font-semibold text-center py-5">Loading...</div>
    }
  return (
    <>
        <h1 className="text-2xl capitalize mb-2">Cencelled List</h1>
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
                    >{type === 'sales' ? 'Party Name' : "Specimen Name"}  
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
                      Approval Status
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {CancelledData.data.length ? CancelledData.data.map(item =>(
                    <tr className="border-b border-neutral-200 dark:border-white/10" key={item.SalesOrderID}>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                      {item.SL}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                      {item.SalesOrderNo}
                    </td>

                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                      {convertDateFormat(item.OrderDate)}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                     {type === "sales" ? item.partyname : item.SpecimenUserName }
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                      {formatAmountWithCommas(Number(item.TotalAmount))}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                      {item.Status}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 flex justify-center gap-3">
                    <Link href={type === 'sales' ? `/dashboard/sales-order-approval/view/sales-view/${item.SalesOrderID}`: `/dashboard/sales-order-approval/view/speciman-view/${item.SalesOrderID}`}>
                      <button className="bg-gray-300 px-1 py-[2px]">
                        View
                      </button>
                    </Link>

                    </td>
                  </tr>
                  )) : <div className="text-center text-xl font-semibold">No Data to Display</div>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CencelledList