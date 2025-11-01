'use client';
import useGetData from '@/utils/useGetData';
import convertDateFormat from '@/utils/convertDateFormat';
import formatAmountWithCommas from '@/utils/formatAmountWithCommas';
import Link from 'next/link';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const SpecimanOrderView = ({ id }) => {
  const { status, data } = useGetData(
    `?action=get_order&SalesOrderID=${id}`
  );
  const renderApprovalSection = (label, comments, by, date) => (
    <div className="mb-3">
      <div className="flex items-center gap-2">
        <h1 className="text-lg">Date:</h1>
        <h1>{date || 'N/A'}</h1>
      </div>
      <div className="flex items-center gap-2">
        <h1 className="text-lg">{label} By:</h1>
        <h1>{by || 'N/A'}</h1>
      </div>
      <div className="flex items-center gap-2">
        <h1 className="text-lg">{label} Status:</h1>
        <h1>{comments || 'N/A'}</h1>
      </div>
    </div>
  );
  const { order, orderDetails } = data;
  if (status === 'pending') {
    return <div>Loading...</div>;
  }
  return (
    <>
    <div className="flex justify-end">
        <Link
          href={`/dashboard/sales-order/preview/speciman/${id}`}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Preview
        </Link>
      </div>
      <div className="flex justify-center">
        <div className="min-w-[600px] rounded-md bg-gray-300 p-5">
          <h1 className="text-center text-xl font-semibold mb-3">
            Speciman Order
          </h1>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Date:</h1>
            <h1>{convertDateFormat(order.OrderDate)}</h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Order No:</h1>
            <h1>{order.SalesOrderNo}</h1>
          </div>

          <div className="flex items-center gap-2">
            <h1 className="text-lg">Speciman User Name:</h1>
            <h1>{order.SpecimenUserName}</h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Total Amount:</h1>
            <h1>{formatAmountWithCommas(Number(order.TotalAmount))}</h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">status:</h1>
            <h1>{order.Status}</h1>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <div className="min-w-[600px] rounded-md bg-gray-300 p-5">
          {data.approvals.CanclledComments ? (
            <div className="mt-4">
              <h1 className="text-lg font-semibold">Cancellation Details</h1>
              <div className="flex items-center gap-2">
                <h1 className="text-lg">Date:</h1>
                <h1>{data.approvals.CancelledDate}</h1>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg">Cancelled By:</h1>
                <h1>{data.approvals.CancelledBy}</h1>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg">Comments:</h1>
                <h1>{data.approvals.CanclledComments || 'N/A'}</h1>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-center text-lg font-semibold mb-3">
                Approval Comments
              </h1>
              {data.approvals.CheckedComments &&
                renderApprovalSection(
                  'Checked',
                  data.approvals.CheckedComments,
                  data.approvals.CheckedBy,
                  data.approvals.CheckedDate
                )}
              {data.approvals.AuthComments &&
                renderApprovalSection(
                  'Authorized',
                  data.approvals.AuthComments,
                  data.approvals.AuthBy,
                  convertDateFormat(data.approvals.AuthDate.split(' ')[0])
                )}
              {data.approvals.RejectComments &&
                renderApprovalSection(
                  'Rejected',
                  data.approvals.RejectComments,
                  data.approvals.RejectBy,
                  convertDateFormat(data.approvals.RejectDate.split(' ')[0])
                )}
              {data.approvals.AppComments &&
                renderApprovalSection(
                  'Approved',
                  data.approvals.AppComments,
                  data.approvals.AppBy,
                  convertDateFormat(data.approvals.AppDate.split(' ')[0])
                )}
              {!data.approvals.CheckedComments &&
                !data.approvals.AuthComments &&
                !data.approvals.AppComments && (
                  <div className="text-center">
                    No Approval Details Available
                  </div>
                )}
            </>
          )}
        </div>
      </div>
      {orderDetails && orderDetails.length && (
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
                      {orderDetails.map(item => (
                        <tr
                          className="border-b border-neutral-200 dark:border-white/10"
                          key={item.SL}
                        >
                          <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                            {item.FinancialYear}
                          </td>
                          <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                            {item.ProductName}
                          </td>
                          <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                            {formatAmountWithCommas(Number(item.Quantity))}
                          </td>
                          <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                            {formatAmountWithCommas(Number(item.Price))}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4 flex justify-center gap-3 font-medium">
                            {formatAmountWithCommas(
                              Number(item.Price) * Number(item.Quantity)
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
  );
};

export default SpecimanOrderView;
