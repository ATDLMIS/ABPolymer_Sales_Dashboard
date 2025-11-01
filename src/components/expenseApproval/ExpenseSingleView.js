"use client"
import convertDateFormat from '@/utils/convertDateFormat';
import formatAmountWithCommas from '@/utils/formatAmountWithCommas';

const ExpenseSingleView = ({ viewableData }) => {
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
  if (viewableData.status === 'pending') {
    return (
      <div className="text-xl font-semibold text-center py-5">Loading...</div>
    );
  }
  return (
    <>
      <div>
        <div className="flex justify-center">
      <div className="min-w-[600px] rounded-md bg-gray-300 p-5">
        <h1 className="text-center text-xl font-semibold mb-3">
        Business Development Requisition Approval
        </h1>
        {viewableData.data === null ? <div className="text-center text-xl font-semibold py-5">No Data to Display</div> : <>
          <div className="flex items-center gap-2">
          <h1 className="text-lg">Date:</h1>
          <h1>{convertDateFormat(viewableData.data.BDExpReq.BDExpReqDate)}</h1>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-lg">BD Exp Req No:</h1>
          <h1>{viewableData.data.BDExpReq.BDExpReqNo}</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <h1 className="text-lg">Institute Type:</h1>
          <h1>{viewableData.data.BDExpReq.InstitutionTypeName}</h1>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-lg">Institute Name:</h1>
          <h1>{viewableData.data.BDExpReq.InstitutionName}</h1>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-lg">Total Amount:</h1>
          <h1>{formatAmountWithCommas(Number(viewableData.data.BDExpReq.TotalAmount))}</h1>
        </div>
        </>}
      </div>
    </div>
    </div>

    <div className="flex justify-center mt-5">
        <div className="min-w-[600px] rounded-md bg-gray-300 p-5">
          {viewableData.data.BDExpReqApprovals.CanclledComments ? (
            <div className="mt-4">
              <h1 className="text-lg font-semibold">Cancellation Details</h1>
              <div className="flex items-center gap-2">
                <h1 className="text-lg">Date:</h1>
                <h1>{convertDateFormat(viewableData.data.BDExpReqApprovals.CancelledDate.split(' ')[0])}</h1>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg">Cancelled By:</h1>
                <h1>{viewableData.data.BDExpReqApprovals.CancelledBy}</h1>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg">Status:</h1>
                <h1>{viewableData.data.BDExpReqApprovals.CanclledComments || 'N/A'}</h1>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-center text-lg font-semibold mb-3">
                Approval Details
              </h1>
              {viewableData.data.BDExpReqApprovals.CheckedComments &&
                renderApprovalSection(
                  'Checked',
                  viewableData.data.BDExpReqApprovals.CheckedComments,
                  viewableData.data.BDExpReqApprovals.CheckedBy,
                  convertDateFormat(viewableData.data.BDExpReqApprovals.CheckedDate.split(' ')[0])
                )}
              {viewableData.data.BDExpReqApprovals.AuthComments &&
                renderApprovalSection(
                  'Authorized',
                  viewableData.data.BDExpReqApprovals.AuthComments,
                  viewableData.data.BDExpReqApprovals.AuthBy,
                  convertDateFormat(viewableData.data.BDExpReqApprovals.AuthDate.split(' ')[0])
                )}
              {viewableData.data.BDExpReqApprovals.RejectComments &&
                renderApprovalSection(
                  'Rejected',
                  viewableData.data.BDExpReqApprovals.RejectComments,
                  viewableData.data.BDExpReqApprovals.RejectBy,
                  convertDateFormat(viewableData.data.BDExpReqApprovals.RejectDate.split(' ')[0])
                )}
              {viewableData.data.BDExpReqApprovals.AppComments &&
                renderApprovalSection(
                  'Approved',
                  viewableData.data.BDExpReqApprovals.AppComments,
                  viewableData.data.BDExpReqApprovals.AppBy,
                  convertDateFormat(viewableData.data.BDExpReqApprovals.AppDate.split(' ')[0])
                )}
              {!viewableData.data.BDExpReqApprovals.CheckedComments &&
                !viewableData.data.BDExpReqApprovals.AuthComments &&
                !viewableData.data.BDExpReqApprovals.AppComments && (
                  <div className="text-center">
                    No Approval Details Available
                  </div>
                )}
            </>
          )}
        </div>
      </div>

      {/* table start */}
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
                      Teacher Name
                    </th>
                    <th
                      scope="col"
                      className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                    >
                      Designation
                    </th>
                    <th
                      scope="col"
                      className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                    >
                      Mobile
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
                      Students Count
                    </th>

                    <th scope="col" className="px-6 py-4">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {viewableData.data.BDExpReqDetails.length ? (
                    viewableData.data.BDExpReqDetails.map(item => (
                      <tr
                        className="border-b border-neutral-200 dark:border-white/10"
                        key={item.SL}
                      >
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.SL}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.TeacherName}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.Designation}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.ContactPhone}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.BooksGroup}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.ProductName}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.StudentsCount}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 flex justify-center gap-3">
                          {item.DonationAmount}
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
    </>
  );
};

export default ExpenseSingleView;
