const ReceiptSingleView = ({ viewableData }) => {
  if (viewableData.status === 'pending') {
    return (
      <div className="text-xl font-semibold text-center py-5">Loading...</div>
    );
  }

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
        <h1 className="text-lg">{label} Comments:</h1>
        <h1>{comments || 'N/A'}</h1>
      </div>
    </div>
  );

  return (
    <>
      <div>
        <div className="flex justify-center">
          <div className="min-w-[600px] rounded-md bg-gray-200 p-5">
            <h1 className="text-center text-xl font-semibold mb-3">
              Collection Information
            </h1>
            {viewableData.data === null ? (
              <div className="text-center text-xl font-semibold py-5">
                No Data to Display
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg">Receipt Date:</h1>
                  <h1>{viewableData.data.receipt.MRDate}</h1>
                </div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg">Receipt Number:</h1>
                  <h1>{viewableData.data.receipt.MRNo}</h1>
                </div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg">Party Name:</h1>
                  <h1>{viewableData.data.receipt.PartyName}</h1>
                </div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg">Received Amount:</h1>
                  <h1>{viewableData.data.receipt.AmountReceived}</h1>
                </div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg">Payment Method:</h1>
                  <h1>{viewableData.data.receipt.PaymentMethod}</h1>
                </div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg">Payment Method Details:</h1>
                  <h1>{viewableData.data.receipt.PaymentMethodDetails}</h1>
                </div>
                {viewableData.data.receipt.PaymentMethodDetailsAcc && (
                  <div className="flex items-center gap-2">
                    <h1 className="text-lg">Account Number:</h1>
                    <h1>{viewableData.data.receipt.PaymentMethodDetailsAcc}</h1>
                  </div>
                )}
                {viewableData.data.receipt.PaymentMethodID == 4 && (
                  <>
                    <h1>Account Name: {viewableData.data.receipt.AccName}</h1>
                    <h1>
                      Account Number: {viewableData.data.receipt.AccNumber}
                    </h1>
                    <h1>
                      Cheque Number: {viewableData.data.receipt.ChequeNumber}
                    </h1>
                  </>
                )}
                {viewableData.data.receipt.Remarks && (
                  <h1>Remarks: {viewableData.data.receipt.Remarks}</h1>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-5">
        <div className="min-w-[600px] rounded-md bg-gray-300 p-5">
          {viewableData.data.Approvals.CanclledComments ? (
            <div className="mt-4">
              <h1 className="text-lg font-semibold">Cancellation Details</h1>
              <div className="flex items-center gap-2">
                <h1 className="text-lg">Cancelled By:</h1>
                <h1>{viewableData.data.Approvals.CancelledBy}</h1>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg">Date:</h1>
                <h1>{viewableData.data.Approvals.CancelledDate}</h1>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg">Comments:</h1>
                <h1>{viewableData.data.Approvals.CanclledComments || 'N/A'}</h1>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-center text-lg font-semibold mb-3">
                Approval Details
              </h1>
              {viewableData.data.Approvals.CheckedComments &&
                renderApprovalSection(
                  'Checked',
                  viewableData.data.Approvals.CheckedComments,
                  viewableData.data.Approvals.CheckedBy,
                  viewableData.data.Approvals.CheckedDate
                )}
              {viewableData.data.Approvals.AuthComments &&
                renderApprovalSection(
                  'Authorized',
                  viewableData.data.Approvals.AuthComments,
                  viewableData.data.Approvals.AuthBy,
                  viewableData.data.Approvals.AuthDate
                )}
              {viewableData.data.Approvals.RejectComments &&
                renderApprovalSection(
                  'Rejected',
                  viewableData.data.Approvals.RejectComments,
                  viewableData.data.Approvals.RejectBy,
                  viewableData.data.Approvals.RejectDate
                )}
              {viewableData.data.Approvals.AppComments &&
                renderApprovalSection(
                  'Approved',
                  viewableData.data.Approvals.AppComments,
                  viewableData.data.Approvals.AppBy,
                  viewableData.data.Approvals.AppDate
                )}
              {!viewableData.data.Approvals.CheckedComments &&
                !viewableData.data.Approvals.AuthComments &&
                !viewableData.data.Approvals.AppComments && (
                  <div className="text-center">
                    No Approval Details Available
                  </div>
                )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ReceiptSingleView;
