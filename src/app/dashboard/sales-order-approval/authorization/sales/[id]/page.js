"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import convertDateFormat from "@/utils/convertDateFormat";
import formatAmountWithCommas from "@/utils/formatAmountWithCommas";
import useGetData from "@/utils/useGetData";
import Axios from "@/utils/axios";
import Loading from "@/components/Loading";
import Link from "next/link";
import { useSession } from "next-auth/react";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

/* ────────────────────────────────────────
   Reusable Components
──────────────────────────────────────── */

// Info Row
const InfoRow = ({ label, value, highlighted = false, className = '' }) => (
  <div className={`flex flex-wrap justify-between items-center py-2 border-b last:border-b-0 border-gray-200 ${className}`}>
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
    (sum, item) => sum + (parseFloat(item.Price) * parseInt(item.Quantity)),
    0
  );

  const discountPercentage = parseFloat(order?.DiscountPercentage) || 0;
  const discountAmount = parseFloat(order?.DiscountAmount?.replace(/,/g, '')) || 0;
  const netAmount = parseFloat(order?.NetAmount?.replace(/,/g, '')) || subtotal - discountAmount;

  return (
    <Card>
      <SectionHeader title="Order Items" className="mb-6" />
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full min-w-full">
          <thead>
            <tr className="bg-gray-100 text-sm text-gray-700">
              <th className="px-6 py-4 text-left font-medium">Product Name</th>
              <th className="px-6 py-4 text-right font-medium">Qty</th>
              <th className="px-6 py-4 text-right font-medium">Price</th>
              <th className="px-6 py-4 text-right font-medium">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orderDetails.map((item) => (
              <tr key={item.SL} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900">
                  {item.ProductName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 text-right">
                  {item.Quantity}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 text-right">
                  ৳{formatAmountWithCommas(parseFloat(item.Price))}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">
                  ৳{formatAmountWithCommas(parseFloat(item.Price) * parseInt(item.Quantity))}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr className="border-t border-gray-200">
              <td colSpan="3" className="px-6 py-4 text-right font-semibold text-gray-700">
                Total Amount:
              </td>
              <td className="px-6 py-4 text-right font-semibold text-gray-900">
                ৳{formatAmountWithCommas(subtotal)}
              </td>
            </tr>
            {discountPercentage > 0 && (
              <tr className="border-t border-gray-200">
                <td colSpan="3" className="px-6 py-4 text-right font-semibold text-gray-700">
                  Discount ({discountPercentage}%):
                </td>
                <td className="px-6 py-4 text-right font-semibold text-red-600">
                  -৳{formatAmountWithCommas(discountAmount)}
                </td>
              </tr>
            )}
            <tr className="border-t-2 border-gray-300 bg-gray-100">
              <td colSpan="3" className="px-6 py-4 text-right font-bold text-gray-800 text-lg">
                Net Amount:
              </td>
              <td className="px-6 py-4 text-right font-bold text-green-700 text-lg">
                ৳{formatAmountWithCommas(netAmount)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Card>
  );
};

/* ────────────────────────────────────────
   Approval History Card
──────────────────────────────────────── */

const ApprovalHistoryCard = ({ approvals }) => {
  const hasApprovals =
    approvals?.AuthComments ||
    approvals?.AppComments ||
    approvals?.RejectComments ||
    approvals?.CancelledBy;

  return (
    <Card>
      <SectionHeader title="Approval History" className="mb-6" />
      {!hasApprovals ? (
        <EmptyState message="No Approval History Available" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {approvals?.AuthComments && (
            <ApprovalSection
              label="Authorized"
              comments={approvals.AuthComments}
              by={approvals.AuthBy}
              date={convertDateFormat(approvals.AuthDate?.split(' ')[0])}
            />
          )}
          {approvals?.AppComments && (
            <ApprovalSection
              label="Approved"
              comments={approvals.AppComments}
              by={approvals.AppBy}
              date={convertDateFormat(approvals.AppDate?.split(' ')[0])}
            />
          )}
          {approvals?.RejectComments && (
            <ApprovalSection
              label="Rejected"
              comments={approvals.RejectComments}
              by={approvals.RejectBy}
              date={convertDateFormat(approvals.RejectDate?.split(' ')[0])}
            />
          )}
          {approvals?.CancelledBy && (
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

const OrderInfoCard = ({ order }) => {
  const partyCode = order?.PartyCode || (order?.PartyName && order.PartyName.match(/\(([^)]+)\)/)?.[1]);

  return (
    <Card>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <SectionHeader title="Order Information" />
        <StatusBadge status={order?.Status || "Pending Authorization"} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-1">
          <InfoRow 
            label="Order Date" 
            value={convertDateFormat(order?.OrderDate)} 
          />
          <InfoRow 
            label="Order No" 
            value={order?.SalesOrderNo} 
            highlighted 
          />
          <InfoRow 
            label="Total Amount" 
            value={`৳${formatAmountWithCommas(parseFloat(order?.TotalAmount?.replace(/,/g, '')) || 0)}`} 
          />
          <InfoRow 
            label="Outstanding" 
            value={`৳${formatAmountWithCommas(parseFloat(order?.Outstanding?.replace(/,/g, '')) || 0)}`} 
          />
        </div>
        <div className="space-y-1">
          <InfoRow 
            label="Party Name" 
            value={
              <span className="font-semibold">
                {order?.PartyName?.replace(/\([^)]*\)/, '')?.trim()}
                {partyCode && <span className="text-primary1"> ({partyCode})</span>}
              </span>
            } 
            highlighted 
          />
          <InfoRow 
            label="Address" 
            value={order?.Address} 
            className="border-b-0"
          />
          <div className="py-2 border-b border-gray-200">
            <span className="text-gray-600 font-medium text-sm block mb-1">Contact Number</span>
            <span className="text-gray-800 text-sm">{order?.ContactNumber}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

/* ────────────────────────────────────────
   Demand Info Card
──────────────────────────────────────── */

const DemandInfoCard = ({ demandInfo }) => {
  if (!demandInfo?.length) return null;

  return (
    <Card>
      <SectionHeader title="Demand Information" className="mb-6" />
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full min-w-full">
          <thead>
            <tr className="bg-blue-600 text-white text-sm">
              <th className="px-6 py-4 text-left font-medium">SL</th>
              <th className="px-6 py-4 text-left font-medium">Product Name</th>
              <th className="px-6 py-4 text-left font-medium">Product Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {demandInfo.map((item) => (
              <tr key={item.SL} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900">{item.SL}</td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  {item.ProductName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {item.ProductsValue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

/* ────────────────────────────────────────
   Main Page Component
──────────────────────────────────────── */

const Page = ({ params }) => {
  const { data: session, status } = useSession();
  const userID = session?.user?.id;
  console.log("User ID:", userID);
  const id = params.id;
  const [formData, setFormData] = useState({
    SalesOrderID: "",
    AuthComments: "",
    UserID: "",
  });

  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const demandInfo = useGetData(
    "?action=get_salesordersAutorizationMIS&SalesOrderID=27"
  );

  const getData = async (id) => {
    try {
      setLoading(true);
      const res = await Axios.get(`?action=get_order&SalesOrderID=${id}`);
      
      if (res.data.order) {
        setOrderData(res.data);
        setFormData(prev => ({
          ...prev,
          SalesOrderID: res.data.order.SalesOrderID,
          UserID: session.user.id,
        }));
      }
    } catch (error) {
      console.error("Error fetching order:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) getData(id);
  }, [params]);

  const handleAuthorize = async () => {
    try {
      const payload = {
        SalesOrderID: formData.SalesOrderID,
        DemandInfo: "Approved by management",
        ReturnInfo: null,
        AuthComments: formData.AuthComments,
        AppComments: null,
        UserID: formData.UserID,
      };

      await Axios.post("?action=create_sndApprovalDetails", payload);
      router.push("/dashboard/sales-order-approval");
    } catch (error) {
      console.error("Authorization failed:", error);
      alert("Authorization failed. Please try again.");
    }
  };

  const handleReject = async () => {
    try {
      const payload = {
        SalesOrderID: formData.SalesOrderID,
        CanclledComments: formData.AuthComments,
        UserID: formData.UserID,
      };

      await Axios.post("?action=create_sndApprovalRejected_Cancelled", payload);
      router.push("/dashboard/sales-order-approval");
    } catch (error) {
      console.error("Rejection failed:", error);
      alert("Rejection failed. Please try again.");
    }
  };

  if (loading) return <Loading />;

  if (!orderData?.order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-xl font-semibold text-gray-600 mb-2">Order Not Found</div>
          <p className="text-gray-500">The requested sales order could not be found.</p>
        </div>
      </div>
    );
  }

  const { order, orderDetails, approvals } = orderData;

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sales Order Authorization</h1>
            <p className="text-gray-600 mt-1">Review and authorize pending sales orders</p>
          </div>

          {/* <Link
            href={`/dashboard/sales-order/preview/sales/${params.id}`}
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

          <DemandInfoCard demandInfo={demandInfo.data} />
        </div>

        {/* Authorization Actions */}
        <Card className="mt-6 sticky bottom-6 shadow-lg">
          <SectionHeader title="Authorization Actions" className="mb-6" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Comments Input */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Authorization Comments
              </label>
              <textarea
                rows="3"
                placeholder="Enter your authorization comments..."
                value={formData.AuthComments}
                onChange={(e) =>
                  setFormData({ ...formData, AuthComments: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary1 focus:border-primary1 resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:justify-end">
              <button
                onClick={handleReject}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition-colors duration-200 shadow-sm"
              >
                Cancel Order
              </button>
              <button
                onClick={handleAuthorize}
                className="px-6 py-3 bg-gradient-to-r from-primary1 to-orange-600 text-white font-medium rounded-lg hover:from-orange-600 hover:to-orange-700 transition-colors duration-200 shadow-sm"
              >
                Authorize Order
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Page;