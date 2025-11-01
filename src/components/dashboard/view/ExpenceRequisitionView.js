'use client';
import useGetData from '@/utils/useGetData';
import convertDateFormat from '@/utils/convertDateFormat';
import formatAmountWithCommas from '@/utils/formatAmountWithCommas';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const ExpenceRequisitionView = ({ id }) => {
  const { status, data } = useGetData(
    `?action=get_BDExpReqAll&BDExpReqID=${id}`
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

  if (status === 'pending') {
    return (
      <div className="text-center text-xl font-semibold py-6">Loading...</div>
    );
  }

  return (
    <div>
      <div className="max-w-xl bg-gray-200 mx-auto rounded-md p-3 my-5">
      <h1>Date: {convertDateFormat(data.BDExpReq.BDExpReqDate)}</h1>
        <h1>BD Exp Req No: {data.BDExpReq.BDExpReqNo}</h1>
        <h1>Institution Type: {data.BDExpReq.InstitutionTypeName}</h1>
        <h1>Institution Name: {data.BDExpReq.InstitutionName}</h1>
        <h1>Total Amount: {formatAmountWithCommas(Number(data.BDExpReq.TotalAmount))}</h1>
      </div>

      <div className="flex justify-center mt-5">
        <div className="min-w-[600px] rounded-md bg-gray-300 p-5">
          {data.BDExpReqApprovals.CanclledComments ? (
            <div className="mt-4">
              <h1 className="text-lg font-semibold">Cancellation Details</h1>
              <div className="flex items-center gap-2">
                <h1 className="text-lg">Cancelled By:</h1>
                <h1>{data.BDExpReqApprovals.CancelledBy}</h1>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg">Date:</h1>
                <h1>{data.BDExpReqApprovals.CancelledDate}</h1>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg">Comments:</h1>
                <h1>{data.BDExpReqApprovals.CanclledComments || 'N/A'}</h1>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-center text-lg font-semibold mb-3">
                Approval Comments
              </h1>
              {data.BDExpReqApprovals.CheckedComments &&
                renderApprovalSection(
                  'Checked',
                  data.BDExpReqApprovals.CheckedComments,
                  data.BDExpReqApprovals.CheckedBy,
                  convertDateFormat(data.BDExpReqApprovals.CheckedDate.split(' ')[0])
                )}
              {data.BDExpReqApprovals.AuthComments &&
                renderApprovalSection(
                  'Authorized',
                  data.BDExpReqApprovals.AuthComments,
                  data.BDExpReqApprovals.AuthBy,
                  convertDateFormat(data.BDExpReqApprovals.AuthDate.split(' ')[0])
                )}
              {data.BDExpReqApprovals.AppComments &&
                renderApprovalSection(
                  'Approved',
                  data.BDExpReqApprovals.AppComments,
                  data.BDExpReqApprovals.AppBy,
                  convertDateFormat(data.BDExpReqApprovals.AppDate.split(' ')[0])
                )}
              {data.BDExpReqApprovals.RejectComments &&
                renderApprovalSection(
                  'Rejected',
                  data.BDExpReqApprovals.RejectComments,
                  data.BDExpReqApprovals.RejectBy,
                  convertDateFormat(data.BDExpReqApprovals.RejectDate.split(' ')[0])
                )}
              {!data.BDExpReqApprovals.CheckedComments &&
                !data.BDExpReqApprovals.AuthComments &&
                !data.BDExpReqApprovals.AppComments && (
                  <div className="text-center">
                    No Approval Details Available
                  </div>
                )}
            </>
          )}
        </div>
      </div>

      <div className="overflow-x-scroll">
        <div className="inline-block max-w-full w-full pt-5">
          <div>
            <table className="max-w-full w-full border border-neutral-200 text-center text-sm font-light text-surface dark:border-white/10 dark:text-white">
              <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                <tr className="bg-text1 text-white">
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
                    Total Student
                  </th>

                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.BDExpReqDetails.length &&
                  data.BDExpReqDetails.map(item => (
                    <tr
                      className="border-b border-neutral-200 dark:border-white/10"
                      key={item.SL}
                    >
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
                        {formatAmountWithCommas(Number(item.StudentsCount))}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                        {formatAmountWithCommas(Number(item.DonationAmount))}
                      </td>
                    </tr>
                  ))}
                <tr className="border-b border-neutral-200 dark:border-white/10">
                  <td
                    className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10"
                    colSpan="5"
                  ></td>
                  <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                    Total
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 flex justify-center gap-3 font-medium">
                    {data.BDExpReqDetails.length &&
                      formatAmountWithCommas(data.BDExpReqDetails.reduce(
                        (accumulator, currentValue) =>
                          accumulator + Number(currentValue.DonationAmount),
                        0
                      ))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenceRequisitionView;
