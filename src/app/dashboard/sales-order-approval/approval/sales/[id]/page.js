'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import convertDateFormat from '@/utils/convertDateFormat';
import formatAmountWithCommas from '@/utils/formatAmountWithCommas';
import useGetData from '@/utils/useGetData';
import Axios from '@/utils/axios';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const Page = ({ params }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    SalesOrderID: '',
    SalesOrderNo: '',
    OrderDate: '',
    PartyName: '',
    orderDetails: [],
    DemandInfo: 'Approved by management',
    ReturnInfo: 'Approved by management',
    AuthComments: '',
    AppComments: '',
    UserID: '',
  });
  const [viewableData, setViewableData] = useState({ status: 'pending', data: null });

  const demandInfo = useGetData('?action=get_salesordersAutorizationMIS&SalesOrderID=27');
  const returnInfo = useGetData('?action=get_salesordersAutorizationMISReturn&SalesOrderID=158');

  const getData = async (id) => {
    const res = await Axios.get(`?action=get_order&SalesOrderID=${id}`);
    if (res.data.order) {
      setViewableData({ status: 'idle', data: res.data });
      setFormData((prev) => ({
        ...prev,
        SalesOrderID: res.data.order.SalesOrderID,
        SalesOrderNo: res.data.order.SalesOrderNo,
        OrderDate: res.data.order.OrderDate,
        PartyName: res.data.order.PartyName,
        orderDetails: res.data.orderDetails ?? [],
        UserID: res.data.order.UserID,
      }));
    }
  };

  useEffect(() => {
    if (params.id) getData(params.id);
  }, [params.id]);

  const handleAuthorize = async () => {
    const payload = {
      SalesOrderID: formData.SalesOrderID,
      DemandInfo: formData.DemandInfo,
      ReturnInfo: 'Approved for 90 units due to stock limitations',
      AuthComments: null,
      AppComments: formData.AppComments,
      UserID: formData.UserID,
    };
    await Axios.post('?action=create_sndApprovalDetails', payload);
    router.push('/dashboard/sales-order-approval');
  };

  const handleReject = async () => {
    const payload = {
      SalesOrderID: formData.SalesOrderID,
      RejectComments: formData.AppComments,
      UserID: formData.UserID,
    };
    await Axios.post('?action=create_sndApprovalRejected_Cancelled', payload);
    router.push('/dashboard/sales-order-approval');
  };

  const ApprovalBlock = ({ label, comments, by, date }) => (
    <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-5 shadow-sm hover:shadow-md transition">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF6F0B]/5 to-transparent rounded-bl-full"></div>
      <div className="relative space-y-3">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-6 bg-gradient-to-b from-[#FF6F0B] to-orange-600 rounded-full"></div>
          <h3 className="text-base font-bold text-gray-800">{label}</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500 text-xs mb-1">Date</p>
            <p className="font-semibold text-gray-900">{date || 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-1">By</p>
            <p className="font-semibold text-gray-900">{by || 'N/A'}</p>
          </div>
        </div>
        <div className="pt-2 border-t border-gray-200">
          <p className="text-gray-500 text-xs mb-1">Comments</p>
          <p className="text-sm text-gray-700">{comments || 'N/A'}</p>
        </div>
      </div>
    </div>
  );

  const calculateTotal = () => formData.orderDetails.reduce(
    (sum, item) => sum + Number(item.Price) * Number(item.Quantity),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-lg md:text-2xl font-semibold  text-gray-900 mb-1">
              Sales Order Approval
            </h1>
            <p className="text-gray-600">Review, approve or reject sales orders</p>
          </div>
          <div className="relative w-full md:w-[300px]">
            <input
              type="text"
              placeholder="Search order..."
              className="border border-gray-300 pl-10 pr-4 py-3 rounded-xl w-full text-sm shadow-sm focus:ring-2 focus:ring-[#FF6F0B] focus:border-[#FF6F0B]"
            />
            <svg
              className="w-5 h-5 absolute left-3 top-3.5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
        </div>

        {/* Order Info */}
        <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 mb-6 border border-gray-100">
  
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FF6F0B] to-orange-600 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586l5.414 5.414V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Order Information
              </h2>
              <p className="text-sm text-gray-500">
                Basic order details and party information
              </p>
            </div>
          </div>
             
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {['SalesOrderNo', 'OrderDate', 'PartyName'].map(field => (
              <div key={field}>
                <label className="block text-xs font-semibold text-gray-600 mb-2">
                  {field.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <input
                  value={formData[field]}
                  readOnly
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-[#FF6F0B] focus:border-[#FF6F0B]"
                />
              </div>
            ))}
          </div>          
         
          {/* Items Table */}
          {formData.orderDetails.length > 0 && (
            <div className="mt-8 overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
              <table className="w-full min-w-[600px] text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-[#FF6F0B] to-orange-600 text-white">
                    <th className="px-6 py-4 text-left">Financial Year</th>
                    <th className="px-6 py-4 text-left">Product Name</th>
                    <th className="px-6 py-4 text-right">Qty</th>
                    <th className="px-6 py-4 text-right">Price</th>
                    <th className="px-6 py-4 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {formData.orderDetails.map(item => (
                    <tr key={item.SL} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{item.FinancialYear}</td>
                      <td className="px-6 py-4 font-medium">{item.ProductName}</td>
                      <td className="px-6 py-4 text-right">{item.Quantity}</td>
                      <td className="px-6 py-4 text-right">{formatAmountWithCommas(Number(item.Price))}</td>
                      <td className="px-6 py-4 text-right font-semibold">{formatAmountWithCommas(Number(item.Price) * Number(item.Quantity))}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50">
                    <td colSpan="4" className="px-6 py-4 text-right font-bold">Grand Total:</td>
                    <td className="px-6 py-4 text-right text-xl font-bold text-[#FF6F0B]">{calculateTotal()}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>

        {/* Approval Details */}
        {viewableData.data && (
          <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 mb-6 border border-gray-100">
               <div className="flex items-center gap-3 mb-6"> 

                 <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-6 h-6 text-white"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            <div>
                <h2 className="text-xl font-bold text-gray-900">Approval Details</h2>
                <p className="text-sm text-gray-500">Authorization history</p>
              </div>
            <div className="grid grid-cols-1 gap-4">
              {viewableData.data.approvals.CheckedComments && (
                <ApprovalBlock
                  label="Checked"
                  comments={viewableData.data.approvals.CheckedComments}
                  by={viewableData.data.approvals.CheckedBy}
                  date={convertDateFormat(viewableData.data.approvals.CheckedDate.split(' ')[0])}
                />
              )}
              {viewableData.data.approvals.AuthComments && (
                <ApprovalBlock
                  label="Authorized"
                  comments={viewableData.data.approvals.AuthComments}
                  by={viewableData.data.approvals.AuthBy}
                  date={convertDateFormat(viewableData.data.approvals.AuthDate.split(' ')[0])}
                />
              )}
              {viewableData.data.approvals.AppComments && (
                <ApprovalBlock
                  label="Approved"
                  comments={viewableData.data.approvals.AppComments}
                  by={viewableData.data.approvals.AppBy}
                  date={convertDateFormat(viewableData.data.approvals.AppDate.split(' ')[0])}
                />
              )}
            </div>
               </div>
             
          </div>
        )}

        {/* Demand & Return Info */}
        {[{ title: 'Demand Info', data: demandInfo.data }, { title: 'Return Info', data: returnInfo.data }].map((section, idx) => (
          section.data?.length > 0 && (
            <div key={idx} className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 mb-6 border border-gray-100">
              <h2 className="text-xl font-bold mb-4">{section.title}</h2>
              <div className="overflow-x-auto rounded-xl">
                <table className="w-full min-w-[500px] text-sm text-center">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="px-6 py-4">SL</th>
                      <th className="px-6 py-4">Product Name</th>
                      <th className="px-6 py-4">Product Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {section.data.map(item => (
                      <tr key={item.SL} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium">{item.SL}</td>
                        <td className="px-6 py-4 font-medium">{item.ProductName}</td>
                        <td className="px-6 py-4">{item.ProductsValue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        ))}

      </div>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 md:left-[17%] right-0 bg-white shadow-xl border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <textarea
            rows={2}
            placeholder="Enter your approval comments..."
            value={formData.AppComments}
            onChange={(e) => setFormData({ ...formData, AppComments: e.target.value })}
            className="w-full md:flex-1 border border-gray-300 rounded-xl px-4 py-3 resize-none text-sm focus:ring-2 focus:ring-[#FF6F0B] focus:border-[#FF6F0B]"
          />
          <div className="flex flex-col sm:flex-row gap-4 md:w-1/3 md:justify-end">
            <button
              onClick={handleReject}
              className="px-8 py-2 bg-red-500 text-white rounded-xl shadow-lg hover:scale-105 transition"
            >
              Reject Order
            </button>
            <button
              onClick={handleAuthorize}
              className="px-8 py-2 bg-gradient-to-r from-[#FF6F0B] to-orange-600 text-white rounded-xl shadow-lg hover:scale-105 transition"
            >
              Approved
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
