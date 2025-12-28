'use client';
import Loading from '@/components/Loading';
import convertDateFormat from '@/utils/convertDateFormat';
import formatAmountWithCommas from '@/utils/formatAmountWithCommas';
import useGetData from '@/utils/useGetData';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

/* ────────────────────────────────────────
   Reusable Components
──────────────────────────────────────── */

// Info Row
const InfoRow = ({ label, value, highlighted = false, className = '' }) => (
  <div className={`flex flex-wrap justify-between items-center py-2 ${className}`}>
    <span className="text-gray-600 font-medium text-sm">{label}</span>
    <span className={`text-sm ${highlighted ? 'font-semibold text-primary1' : 'text-gray-800'}`}>
      {value || 'N/A'}
    </span>
  </div>
);

// Status Badge
const StatusBadge = ({ status }) => {
  const colors = {
    Approved: 'bg-green-100 text-green-700 border-green-200',
    Pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Rejected: 'bg-red-100 text-red-700 border-red-200',
    Cancelled: 'bg-gray-100 text-gray-700 border-gray-200',
    'Pending Authorized': 'bg-orange-100 text-orange-700 border-orange-200',
    Completed: 'bg-blue-100 text-blue-700 border-blue-200',
  };
  return (
    <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${colors[status] || 'bg-blue-100 text-blue-700 border-blue-200'}`}>
      {status}
    </span>
  );
};

// Card
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${className}`}>
    {children}
  </div>
);

// Section Header
const SectionHeader = ({ title, className = '' }) => (
  <h2 className={`text-xl font-semibold text-gray-800 ${className}`}>{title}</h2>
);

// Approval Section
const ApprovalSection = ({ label, comments, by, date }) => (
  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
    <h3 className="text-sm font-semibold text-gray-700 pb-2 border-b mb-3">
      {label}
    </h3>
    <div className="space-y-2">
      <InfoRow label="Date" value={date} />
      <InfoRow label={`${label} By`} value={by} />
      <InfoRow label="Comments" value={comments} />
    </div>
  </div>
);

// Empty State
const EmptyState = ({ message }) => (
  <div className="text-center py-8">
    <p className="text-gray-500 font-medium">{message}</p>
  </div>
);

/* ────────────────────────────────────────
   Order Items Table
──────────────────────────────────────── */

const OrderItemsTable = ({ orderDetails, order }) => {
  const subtotal = orderDetails.reduce(
    (sum, item) => sum + (parseInt(item.Price) * parseInt(item.Quantity)),
    0
  );

  const discountPercentage = parseInt(order.DiscountPercentage) || 0;
  const discountAmount = parseInt(order.DiscountAmount) || 0;
  const netAmount =  parseFloat(order.NetAmount.replace(/,/g, ''))
  const approvedDiscountPercentage = parseInt(order.AppDisPercent) || 0;
     console.log('Approved Discount Percentage:', approvedDiscountPercentage);  
  const grandTotal =  parseFloat(order.GrandTotal.replace(/,/g, ''))
  // Calculate approved discount amount
 const approvedDiscountAmount = netAmount - grandTotal;

  return (
    <Card>
      <SectionHeader title="Order Items" className="mb-6" />

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full min-w-full">
          <thead>
            <tr className="bg-gray-100 text-sm text-gray-700">
              <th className="px-6 py-4 text-center font-medium w-12">SL</th>
              <th className="px-6 py-4 text-left font-medium">Product Name</th>
              <th className="px-6 py-4 text-center font-medium">Qty</th>
              <th className="px-6 py-4 text-right font-medium">Price</th>
              <th className="px-6 py-4 text-right font-medium">Total</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {orderDetails.map((item, index) => (
              <tr key={item.SalesOrderDetailID} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900 text-center">
                  {index + 1}.
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {item.ProductName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 text-center">
                  {item.Quantity}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 text-right">
                  ৳{formatAmountWithCommas(parseInt(item.Price))}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">
                  ৳{formatAmountWithCommas(parseInt(item.Price) * parseInt(item.Quantity))}
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot className="bg-gray-50">
            <tr className="border-t border-gray-200">
              <td colSpan="4" className="px-6 py-4 text-right font-semibold text-gray-700">
                Total Amount:
              </td>
              <td className="px-6 py-4 text-right font-semibold text-gray-900">
                ৳{formatAmountWithCommas(subtotal)}
              </td>
            </tr>

            {discountPercentage > 0 && (
              <tr className="border-t border-gray-200">
                <td colSpan="4" className="px-6 py-4 text-right font-semibold text-gray-700">
                  Discount ({discountPercentage}%):
                </td>
                <td className="px-6 py-4 text-right font-semibold text-red-600">
                  -৳{order?.DiscountAmount}
                </td>
              </tr>
            )}
             <tr className="border-t border-gray-200">
              <td colSpan="4" className="px-6 py-4 text-right font-semibold text-gray-700">
                Net Amount:
              </td>
              <td className="px-6 py-4 text-right font-semibold text-blue-600">
                ৳{order?.NetAmount}
              </td>
            </tr>
              {approvedDiscountPercentage > 0 && (
              <tr className="border-t border-gray-200">
                <td colSpan="4" className="px-6 py-4 text-right font-semibold text-gray-700">
                  Approved Discount( {order.AppDisPercent}%) :
                </td>
                <td className="px-6 py-4 text-right font-semibold text-purple-600">
                 ৳{parseFloat(approvedDiscountAmount).toFixed(2)}
                </td>
              </tr>
            )}

           

          

            <tr className="border-t-2 border-gray-300 bg-gray-100">
              <td colSpan="4" className="px-6 py-4 text-right font-bold text-gray-800 text-lg">
                Grand Total:
              </td>
              <td className="px-6 py-4 text-right font-bold text-green-700 text-lg">
                ৳{order?.GrandTotal}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Card>
  );
};

/* ────────────────────────────────────────
   Approval Cards
──────────────────────────────────────── */

const ApprovalHistoryCard = ({ approvals }) => {
  const hasApprovals =
    approvals.AuthComments ||
    approvals.AppComments ||
    approvals.RejectComments ||
    approvals.CancelledBy;

  return (
    <Card>
      <SectionHeader title="Approval History" className="mb-6" />

      {!hasApprovals ? (
        <EmptyState message="No Approval History Available" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {approvals.AuthComments && (
            <ApprovalSection
              label="Authorized"
              comments={approvals.AuthComments}
              by={approvals.AuthBy}
              date={convertDateFormat(approvals.AuthDate?.split(' ')[0])}
            />
          )}

          {approvals.AppComments && (
            <ApprovalSection
              label="Approved"
              comments={approvals.AppComments}
              by={approvals.AppBy}
              date={convertDateFormat(approvals.AppDate?.split(' ')[0])}
            />
          )}

          {approvals.RejectComments && (
            <ApprovalSection
              label="Rejected"
              comments={approvals.RejectComments}
              by={approvals.RejectBy}
              date={convertDateFormat(approvals.RejectDate?.split(' ')[0])}
            />
          )}

          {approvals.CancelledBy && (
            <ApprovalSection
              label="Cancelled"
              comments={approvals.CanclledComments}
              by={approvals.CancelledBy}
              date={convertDateFormat(approvals.CancelledDate?.split(' ')[0])}
            />
          )}
        </div>
      )}
    </Card>
  );
};

/* ────────────────────────────────────────
   Order Information Card - Updated Format
──────────────────────────────────────── */

const OrderInfoCard = ({ order }) => {
  // Format retailer name with code
  const retailerDisplay = order.RetailerName && order.RetailerCode 
    ? `${order.RetailerName} (${order.RetailerCode})`
    : order.RetailerName || 'N/A';

  return (
    <Card>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <SectionHeader title="Order Information" />
        <StatusBadge status={order.Status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Order Details */}
        <div className="space-y-1">
          <InfoRow 
            label="Order Date" 
            value={convertDateFormat(order.OrderDate)} 
          />
          <InfoRow 
            label="Order No" 
            value={order.SalesOrderNo} 
            highlighted 
          />
          <InfoRow 
            label="Outstanding Amount" 
            value={order.OutstandingAmount || 'N/A'}
          />
          <InfoRow 
            label="Pending Amount" 
            value={order.PendingAmount || 'N/A'} 
          />
          <InfoRow 
            label="Remaining Amount" 
            value={order.RemainingAmount || 'N/A'} 
          />
          <InfoRow 
            label="Credit Limit" 
            value={order.CreditLimit || 'N/A'} 
          />
        </div>

        {/* Right Column - Party & Retailer Details */}
        <div className="space-y-4">
          {/* Dealer Info */}
          <div className="space-y-1 border-b pb-4">
            <InfoRow 
              label="Dealer Name" 
              value={
                <span className="font-semibold">
                  {order.PartyName}
                  {order.PartyCode && <span className="text-primary1"> ({order.PartyCode})</span>}
                </span>
              } 
              highlighted 
              className="border-b-0"
            />
            <InfoRow 
              label="Address" 
              value={order.Address} 
              className="border-b-0"
            />
            <InfoRow 
              label="Contact Number" 
              value={order.ContactNumber} 
              className="border-b-0"
            />
          </div>

          {/* Distribution Points / Retailer Info */}
         {
          order.RetailerID&&(
             <div className="space-y-1">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Distribution Points:</h3>
            <InfoRow 
              label="Retailer Name" 
              value={order.RetailerName}
              className="border-b-0"
            />
            <InfoRow 
              label="Address" 
              value={order.RetailerAddress || order.Address} 
              className="border-b-0"
            />
            <InfoRow 
              label="Address" 
              value={order.RetailerAddress || order.Address} 
              className="border-b-0"
            />
            <InfoRow 
              label="Contact Number" 
              value={order.ContactPhone1 || order.ContactNumber} 
              className="border-b-0"
            />
          </div>
          )
         }
        </div>
      </div>
    </Card>
  );
};

/* ────────────────────────────────────────
   Main Page
──────────────────────────────────────── */

const SalesOrderView = ({ id }) => {
  const { status, data } = useGetData(`?action=get_order&SalesOrderID=${id}`);
  const { order, orderDetails, approvals } = data || {};

  if (status === 'pending') return <Loading />;

  if (!order)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-semibold text-gray-600 mb-2">Order Not Found</div>
          <p className="text-gray-500">The requested sales order could not be found.</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sales Order Details</h1>
            <p className="text-gray-600 mt-1">Complete information about the sales order</p>
          </div>

          {/* <Link
            href={`/dashboard/sales-order/preview/sales/${id}`}
            className="inline-flex items-center px-6 py-3 bg-primary1 text-white font-medium rounded-lg hover:bg-primary1/90 transition-colors duration-200 shadow-sm"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Preview Order
          </Link> */}
        </div>

        {/* Content Grid */}
        <div className="space-y-6">
          <OrderInfoCard order={order} />
          
          {orderDetails?.length > 0 && (
            <OrderItemsTable
              orderDetails={orderDetails}
              order={order}
            />
          )}

          <ApprovalHistoryCard approvals={approvals} />
        </div>
      </div>
    </div>
  );
};

export default SalesOrderView;