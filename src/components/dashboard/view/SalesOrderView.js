'use client';
import useGetData from '@/utils/useGetData';
import convertDateFormat from '@/utils/convertDateFormat';
import formatAmountWithCommas from '@/utils/formatAmountWithCommas';
import Link from 'next/link';
import Loading from '@/components/Loading';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Reusable Components

// Info Row Component
export const InfoRow = ({ label, value, highlighted = false }) => (
  <div className="flex justify-between items-center py-2.5 border-b border-gray-200 last:border-0">
    <span className="text-gray-600 font-medium">{label}:</span>
    <span className={`${highlighted ? 'font-semibold text-green-600' : 'text-gray-900'}`}>
      {value || 'N/A'}
    </span>
  </div>
);

// Status Badge Component
const StatusBadge = ({ status }) => {
  const statusColors = {
    'complete': 'bg-green-100 text-green-800 border-green-200',
    'Pending Authorized': 'bg-green-100 text-green-800 border-green-200',
    'rejected': 'bg-red-100 text-red-800 border-red-200',
    'cancelled': 'bg-gray-100 text-gray-800 border-gray-200',
  };
  
  const colorClass = statusColors[status] || 'bg-green-100 text-green-800 border-green-200';
  
  return (
    <span className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${colorClass}`}>
      {status}
    </span>
  );
};

// Card Container Component
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-md border border-gray-200 ${className}`}>
    {children}
  </div>
);

// Card Header Component
const CardHeader = ({ title, children }) => (
  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    {children}
  </div>
);

// Approval Section Component
const ApprovalSection = ({ label, comments, by, date }) => (
  <div className="bg-white p-4 rounded-lg border border-gray-200 mb-3">
    <h3 className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b border-gray-200">
      {label}
    </h3>
    <div className="space-y-2">
      <InfoRow label="Date" value={date} />
      <InfoRow label={`${label} By`} value={by} />
      <InfoRow label="Comments" value={comments} />
    </div>
  </div>
);

// Empty State Component
const EmptyState = ({ message, icon = true }) => (
  <div className="text-center py-8 text-gray-500">
    {icon && (
      <svg className="w-16 h-16 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )}
    <p className="font-medium">{message}</p>
  </div>
);



// Order Info Card Component
 const OrderInfoCard = ({ order }) => (
  <Card className="p-6 mb-6">
    <CardHeader title="Order Information">
      <StatusBadge status={order.Status} />
    </CardHeader>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-1">
        <InfoRow label="Order Date" value={convertDateFormat(order.OrderDate)} />
        <InfoRow label="Order No" value={order.SalesOrderNo} highlighted />
        <InfoRow label="Party Name" value={order.PartyName} highlighted />
        {/* <InfoRow label="Discount" value={order.DiscountPercentage} /> */}
        <InfoRow label="Discount Amount" value={order.DiscountAmount} />
        <InfoRow label="Net Amount" value={order.NetAmount} />
      </div>
      <div className="space-y-1">
          <InfoRow label="Outstanding Balance" value={order.Outstanding} />
           <InfoRow label="Order Pending" value={order.OrderPending} />
        <InfoRow label="Total Deliveryed Amount" value={order.TotalDeliveredAmount} />
        <InfoRow label="Total Collection" value={order.TotalCollection} />
          <InfoRow label="Total Amount" value={order?.TotalAmount} highlighted />
      </div>
    </div>
  </Card>
);

// Cancellation Card Component
const CancellationCard = ({ approvals }) => (
  <Card className="p-6 mb-6">
    <div className="flex items-center gap-2 mb-4">
      <span className="text-lg font-semibold text-red-600">⚠</span>
      <h2 className="text-xl font-semibold text-red-600">Cancellation Details</h2>
    </div>
    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
      <div className="space-y-2">
        <InfoRow label="Cancelled Date" value={approvals.CancelledDate} />
        <InfoRow label="Cancelled By" value={approvals.CancelledBy} />
        <InfoRow label="Cancellation Reason" value={approvals.CanclledComments} />
      </div>
    </div>
  </Card>
);

// Approval History Card Component
const ApprovalHistoryCard = ({ approvals }) => {
  const hasApprovals = approvals.CheckedComments ||
                       approvals.AuthComments ||
                       approvals.AppComments ||
                       approvals.RejectComments;

  return (
    <Card className="p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Approval History</h2>
      
      {!hasApprovals ? (
        <EmptyState message="No Approval Details Available" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {approvals.CheckedComments && (
            <ApprovalSection
              label="Checked"
              comments={approvals.CheckedComments}
              by={approvals.CheckedBy}
              date={convertDateFormat(approvals.CheckedDate.split(' ')[0])}
            />
          )}
          {approvals.AuthComments && (
            <ApprovalSection
              label="Authorized"
              comments={approvals.AuthComments}
              by={approvals.AuthBy}
              date={convertDateFormat(approvals.AuthDate.split(' ')[0])}
            />
          )}
          {approvals.RejectComments && (
            <ApprovalSection
              label="Rejected"
              comments={approvals.RejectComments}
              by={approvals.RejectBy}
              date={convertDateFormat(approvals.RejectDate.split(' ')[0])}
            />
          )}
          {approvals.AppComments && (
            <ApprovalSection
              label="Approved"
              comments={approvals.AppComments}
              by={approvals.AppBy}
              date={convertDateFormat(approvals.AppDate.split(' ')[0])}
            />
          )}
        </div>
      )}
    </Card>
  );
};

// Table Header Component
const TableHeader = ({ columns }) => (
  <thead>
    <tr className="bg-gray-50 border-b border-gray-200">
      {columns.map((column, index) => (
        <th 
          key={index}
          className={`px-6 py-4 text-sm font-semibold text-gray-700 ${column.align || 'text-left'}`}
        >
          {column.label}
        </th>
      ))}
    </tr>
  </thead>
);

// Order Items Table Component
const OrderItemsTable = ({ orderDetails, totalAmount }) => {
  const columns = [
    { label: 'Product Code', align: 'text-left' },
    { label: 'Product Name', align: 'text-left' },
    { label: 'Quantity', align: 'text-right' },
    { label: 'Price', align: 'text-right' },
    { label: 'Total', align: 'text-right' },
  ];

  return (
    <Card className="overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Order Items</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <TableHeader columns={columns} />
          <tbody className="divide-y divide-gray-200">
            {orderDetails.map((item, index) => (
              <tr
                key={item.SL}
                className={`hover:bg-gray-50 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                }`}
              >
                <td className="px-6 py-4 text-sm text-gray-700">
                  {item.ProductCode}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  {item.ProductName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 text-right">
                  {formatAmountWithCommas(Number(item.Quantity))}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 text-right">
                  {formatAmountWithCommas(Number(item.Price))}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">
                  {formatAmountWithCommas(
                    Number(item.Price) * Number(item.Quantity)
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-100 border-t-2 border-gray-300">
              <td colSpan="4" className="px-6 py-4 text-right text-sm font-bold text-gray-700">
                Grand Total:
              </td>
              <td className="px-6 py-4 text-right text-lg font-bold text-green-600">
                {totalAmount}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Card>
  );
};

// Page Header Component
const PageHeader = ({ title, children }) => (
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
    {children}
  </div>
);

// Main Component
const SalesOrderView = ({ id }) => {
  const { status, data } = useGetData(
    `?action=get_order&SalesOrderID=${id}`
  );
  console.log("SalesOrder", data);

  const { order, orderDetails } = data;

  if (status === 'pending') {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <PageHeader title="Sales Order Details">
        <Link
          href={`/dashboard/sales-order/preview/sales/${id}`}
          className="bg-primary1 text-white font-medium px-3 py-1 rounded-lg shadow-md transition-colors duration-200 flex items-center gap-2"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          Preview
        </Link>
      
      </PageHeader>

      {order && <OrderInfoCard order={order} />}

      {data.approvals.CanclledComments ? (
        <CancellationCard approvals={data.approvals} />
      ) : (
        <ApprovalHistoryCard approvals={data.approvals} />
      )}

      {orderDetails && orderDetails.length > 0 && (
        <OrderItemsTable 
          orderDetails={orderDetails} 
          totalAmount={order?.TotalAmount} 
        />
      )}
    </div>
  );
};

export default SalesOrderView;