import Link from 'next/link';
import convertDateFormat from "@/utils/convertDateFormat"
import formatAmountWithCommas from "@/utils/formatAmountWithCommas"

const PendingList = ({ pendingData, type }) => {
  if (!pendingData || pendingData?.status === 'pending') {
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
                    {type === 'speciman' ? 'Employee Name' : 'Party Name'}
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
                    Approval Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {pendingData.data.length ? (
                  pendingData.data.map(item => (
                    <tr
                      className="border-b border-neutral-200 dark:border-white/10"
                      key={item.SalesOrderID}
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
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                        {type === 'speciman'
                          ? item.SpecimenUserName
                          : item.partyname}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                        {formatAmountWithCommas(Number(item.TotalAmount))}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                        {item.Status}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 flex justify-center gap-3">
                        {item.status === 1 ? (
                          <Link
                            href={
                              type === 'sales'
                                ? `/dashboard/sales-order-approval/authorization/sales/${item.SalesOrderID}`
                                : `/dashboard/sales-order-approval/authorization/speciman/${item.SalesOrderID}`
                            }
                          >
                            <button className="bg-gray-300 px-1 py-[2px]">
                              Authorization approval
                            </button>
                          </Link>
                        ) : (
                          <Link
                            href={
                              type === 'sales'
                                ? `/dashboard/sales-order-approval/approval/sales/${item.SalesOrderID}`
                                : `/dashboard/sales-order-approval/approval/speciman/${item.SalesOrderID}`
                            }
                          >
                            <button className="bg-gray-300 px-1 py-[2px]">
                              Approval
                            </button>
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <div className="text-center text-xl font-semibold">
                    No Data to Display
                  </div>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingList;
