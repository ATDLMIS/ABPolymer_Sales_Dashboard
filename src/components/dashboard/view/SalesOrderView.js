'use client';
import Loading from '@/components/Loading';
import convertDateFormat from '@/utils/convertDateFormat';
import formatAmountWithCommas from '@/utils/formatAmountWithCommas';
import useGetData from '@/utils/useGetData';
import Link from 'next/link';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

/* ────────────────────────────────────────
   Reusable Components
──────────────────────────────────────── */

// Info Row
const InfoRow = ({ label, value, highlighted = false }) => (
  <div className="flex flex-wrap justify-between items-center py-2 border-b last:border-b-0 border-gray-200">
    <span className="text-gray-500 font-medium">{label}</span>
    <span className={`${highlighted ? 'font-semibold text-primary1' : 'text-gray-800'}`}>
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
  };
  return (
    <span className={`px-4 py-1 rounded-full text-sm font-semibold border ${colors[status] || 'bg-blue-100 text-blue-700 border-blue-200'}`}>
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
const SectionHeader = ({ title }) => (
  <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
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
   Order Items Table With Retailer Grouping
──────────────────────────────────────── */

const RetailerInfo = ({ retailer }) => (
  <tr className="bg-blue-50">
    <td colSpan="4" className="px-6 py-3 text-sm font-semibold text-blue-800">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>Retailer: {retailer.RetailerName} ({retailer.RetailerCode})</div>
        {/* <div>Contact Person Name: {retailer.ContactPersonName}</div> */}
        <div>Address: {retailer.Address}</div>
        <div>Phone: {retailer.ContactPhone1}</div>
      </div>
    </td>
  </tr>
);

const DealerInfo = ({ dealerName }) => (
  <tr className="bg-green-50">
    <td colSpan="4" className="px-6 py-3 text-sm font-semibold text-green-700">
      Dealer: {dealerName}
    </td>
  </tr>
);

const OrderItemsTable = ({ orderDetails, totalAmount, partyName }) => {
  const grouped = orderDetails.reduce((acc, item) => {
    const key = item.OutletID || 'dealer';
    acc[key] = acc[key] || { retailer: null, items: [] };

    if (item.OutletID) {
      acc[key].retailer = {
        RetailerName: item.RetailerName,
        RetailerCode: item.RetailerCode,
        Address: item.Address,
        ContactPhone1: item.ContactPhone1
      };
    }
    acc[key].items.push(item);
    return acc;
  }, {});

  const subtotal = orderDetails.reduce(
    (sum, item) => sum + item.Price * item.Quantity,
    0
  );

  const formattedTotal = Number(totalAmount?.replace(/,/g, ''));
  const discount = subtotal - formattedTotal;

  return (
    <Card>
      <SectionHeader title="Order Items" />

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 text-sm text-gray-700">
              <th className="px-6 py-3 text-left">Product</th>
              <th className="px-6 py-3 text-right">Qty</th>
              <th className="px-6 py-3 text-right">Price</th>
              <th className="px-6 py-3 text-right">Total</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {Object.entries(grouped).map(([key, group]) => (
              <>
                {group.retailer ? (
                  <RetailerInfo retailer={group.retailer} />
                ) : (
                  <DealerInfo dealerName={partyName} />
                )}

                {group.items.map((item) => (
                  <tr key={item.SalesOrderDetailID} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-sm">{item.ProductName}</td>
                    <td className="px-6 py-3 text-sm text-right">
                      {item.Quantity}
                    </td>
                    <td className="px-6 py-3 text-sm text-right">
                      {item.Price}
                    </td>
                    <td className="px-6 py-3 text-sm font-semibold text-right">
                      {item.Price * item.Quantity}
                    </td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>

          <tfoot>
            <tr className="bg-gray-100 font-semibold">
              <td colSpan="3" className="px-6 py-3 text-right">Sub Total:</td>
              <td className="px-6 py-3 text-right">
                {subtotal}
              </td>
            </tr>

            {discount > 0 && (
              <tr className="bg-gray-100 font-semibold text-red-600">
                <td colSpan="3" className="px-6 py-3 text-right">Discount:</td>
                <td className="px-6 py-3 text-right">
                  {discount}
                </td>
              </tr>
            )}

            <tr className="bg-gray-200 font-bold">
              <td colSpan="3" className="px-6 py-3 text-right">Grand Total:</td>
              <td className="px-6 py-3 text-right text-green-700 text-lg">
                {totalAmount}
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
      <SectionHeader title="Approval History" />

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
   Order Information Card
──────────────────────────────────────── */

const OrderInfoCard = ({ order }) => (
  <Card>
    <div className="flex justify-between items-center mb-6">
      <SectionHeader title="Order Information" />
      <StatusBadge status={order.Status} />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
         <InfoRow label="Order Date" value={convertDateFormat(order.OrderDate)} />
        <InfoRow label="Order No" value={order.SalesOrderNo} highlighted /> 
        <InfoRow label="Status" value={order.Status} />
        <InfoRow label="Approval Status" value={order.AppStatus} />
        <InfoRow label="Total Amount" value={order.TotalAmount} highlighted />
      </div>
      <div className="space-y-2">
        <InfoRow label="Party Name" value={order.PartyName} />
        <InfoRow label="Address" value={order.Address} />
        <InfoRow label="Contact Number" value={order.ContactNumber} />
      </div>

      
    </div>
  </Card>
);

/* ────────────────────────────────────────
   Main Page
──────────────────────────────────────── */

const SalesOrderView = ({ id }) => {
  const { status, data } = useGetData(`?action=get_order&SalesOrderID=${id}`);
  const { order, orderDetails, approvals } = data || {};
  if (status === 'pending') return <Loading />;

  if (!order)
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <EmptyState message="Order not found" />
      </div>
    );

  return (
    <div className=" max-w-6xl ">

      {/* Page Header */}
      <div className="flex justify-between items-center ">
        <h1 className="text-3xl font-bold text-gray-800">Sales Order Details</h1>

        <Link
          href={`/dashboard/sales-order/preview/sales/${id}`}
          className="px-6 py-2 bg-primary1 text-white rounded-lg shadow hover:bg-primary1/90"
        >
          Preview
        </Link>
      </div>

      <div className="mt-3">
        <OrderInfoCard order={order} />
      </div>

     <div className="m-3">
       {orderDetails?.length > 0 && (
        <OrderItemsTable
          orderDetails={orderDetails}
          totalAmount={order.TotalAmount}
          partyName={order.PartyName}
        />
      )}
     </div>

      <div className="m-3">
        <ApprovalHistoryCard approvals={approvals} />
      </div>
    </div>
  );
};

export default SalesOrderView;
