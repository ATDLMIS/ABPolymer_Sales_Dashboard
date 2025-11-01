import convertDateFormat from '@/utils/convertDateFormat'

const Comments = ({Approvals}) => {
    const renderApprovalSection = (label, comments, by, date) => (
        <div className="mb-3">
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Date:</h1>
            <h1>{convertDateFormat(date.split(' ')[0]) || 'N/A'}</h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">{label} By:</h1>
            <h1>{by || 'N/A'}</h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">{label} Comments:</h1>
            <h1>{comments || 'N/A'}</h1>
          </div>
        </div>
      );
  return (
    <div className="flex justify-center mt-5">
        <div className="min-w-[600px] rounded-md bg-gray-300 p-5">
          {Approvals.CanclledComments ? (
            <div className="mt-4">
              <h1 className="text-lg font-semibold">Cancellation Details</h1>
              <div className="flex items-center gap-2">
                <h1 className="text-lg">Cancelled By:</h1>
                <h1>{Approvals.CancelledBy}</h1>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg">Date:</h1>
                <h1>{Approvals.CancelledDate}</h1>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg">Comments:</h1>
                <h1>{Approvals.CanclledComments || 'N/A'}</h1>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-center text-lg font-semibold mb-3">
                Approval Details
              </h1>
              {Approvals.CheckedComments &&
                renderApprovalSection(
                  'Checked',
                  Approvals.CheckedComments,
                  Approvals.CheckedBy,
                  Approvals.CheckedDate
                )}
              {Approvals.AuthComments &&
                renderApprovalSection(
                  'Authorized',
                  Approvals.AuthComments,
                  Approvals.AuthBy,
                  Approvals.AuthDate
                )}
              {Approvals.RejectComments &&
                renderApprovalSection(
                  'Rejected',
                  Approvals.RejectComments,
                  Approvals.RejectBy,
                  Approvals.RejectDate
                )}
              {Approvals.AppComments &&
                renderApprovalSection(
                  'Approved',
                  Approvals.AppComments,
                  Approvals.AppBy,
                  Approvals.AppDate
                )}
              {!Approvals.CheckedComments &&
                !Approvals.AuthComments &&
                !Approvals.AppComments && (
                  <div className="text-center">
                    No Approval Details Available
                  </div>
                )}
            </>
          )}
        </div>
      </div>
  )
}

export default Comments