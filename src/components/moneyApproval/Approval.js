'use client';
import Axios from '@/utils/axios';
import convertDateFormat from '@/utils/convertDateFormat';
import useGetData from '@/utils/useGetData';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const Approval = ({ params , userID}) => {
  const state = useGetData(`?action=get_moneyreceipt&MRID=${params.id}`);
 const [formData, setFormData] = useState({
    ApprovalComments: '',
  });
  const router = useRouter();
  const [showDepositSlip, setShowDepositSlip] = useState(false);
const handleReject = async () => {
    const res = await Axios.post(
      `?action=create_sndApprovalRejected_CancelledMR&MRID=${params.id}`,
      {
        MRID: state.data.receipt.MRID,
        RejectComments: formData.ApprovalComments,
        UserID: userID
      }
    );
    router.push('/dashboard/money-receipt-approval');
  };

  const handleChecked = async () => {
    const userData = {
        MRID: state.data.receipt.MRID,
        CheckedComments: null,
        AuthComments: null,
        AppComments: formData.ApprovalComments,
        UserID: userID
      };
    const res = await Axios.post(
      `?action=create_sndApprovalDetailsMR&MRID=${params.id}`,
      userData
    );
    console.log('Approval Response:', res.data)
    router.push('/dashboard/money-receipt-approval');
  };
  if (state.status === 'pending') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

 

   const InfoRow = ({ label, value, highlight = false }) => (
    <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
      <span className="text-sm font-medium text-gray-500 w-44 flex-shrink-0">{label}</span>
      <span className={`text-sm font-medium ${highlight ? 'font-bold text-gray-900 text-base' : 'text-gray-800'}`}>
        {value || 'N/A'}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Money Receipt Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          {/* Header */}
          <div className="bg-primary1 px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-white mb-1">Money Receipt Approval</h1>
                <p className="text-blue-100 text-sm">Receipt #{state.data.receipt?.MRNo}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 text-right">
                <p className="text-xs text-blue-100 uppercase tracking-wide mb-1">Date</p>
                <p className="text-lg font-semibold text-white">
                  {convertDateFormat(state.data.receipt?.MRDate)}
                </p>
              </div>
            </div>
          </div>

          {/* Receipt Details */}
          <div className="px-8 py-6">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Party Information */}
              <div className="bg-gray-50 rounded-lg p-5">
                <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  Party Details
                </h2>
                <p className="text-lg font-semibold text-gray-900">{state.data.receipt?.PartyName}</p>
              </div>

              {/* Amount Information */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-5 border border-green-200">
                <h2 className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">
                  Amount Received
                </h2>
                <p className="text-2xl font-bold text-green-700 mb-1">
                  {state.data.receipt.AmountReceived}
                </p>
                <p className="text-xs text-green-600 italic">{state.data.receipt?.InWord}</p>
              </div>
            </div>

             {/* Payment Details */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
              <div className="flex items-center gap-2 mb-5">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Payment Information</h2>
              </div>
              <div className="space-y-0 bg-white rounded-lg p-5 shadow-sm">
                <InfoRow label="Payment Method" value={state.data.receipt?.PaymentMethod} highlight />
                <InfoRow label="Bank Name" value={state.data.receipt?.PaymentMethodDetails} />
                <InfoRow label="Account Number" value={state.data.receipt?.PaymentMethodDetailsAcc} />
                <InfoRow label="Branch Name" value={state.data.receipt?.BranchName} />
                <InfoRow label="Transaction Number" value={state.data.receipt?.TranNumber} />
                <InfoRow label="Employee Name" value={state.data.receipt?.DepEmpName} />
                <InfoRow label="Designation" value={state.data.receipt?.Designation} />
                {state.data.receipt?.MobileNumber && <InfoRow label="Mobile Number" value={state.data.receipt?.MobileNumber} />}
                {state.data.receipt?.Remarks && <InfoRow label="Remarks" value={state.data.receipt?.Remarks} />}
              </div>
            </div>

         

            {/* Deposit Slip */}
            {state.data.receipt?.DepositSlipUploadPathURL && (
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h2 className="text-sm font-bold text-purple-700 uppercase tracking-wide">Deposit Slip</h2>
                  </div>
                  <button
                    onClick={() => setShowDepositSlip(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Slip
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

       
  {/* Deposit Slip Modal */}
      {showDepositSlip && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={() => setShowDepositSlip(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Deposit Slip</h2>
              <button 
                onClick={() => setShowDepositSlip(false)} 
                className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <img 
                src={state.data.receipt?.DepositSlipUploadPathURL} 
                alt="Deposit Slip" 
                className="w-full h-auto rounded-lg shadow-lg"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f3f4f6" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%239ca3af" font-family="sans-serif" font-size="16"%3EImage not available%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>
          </div>
        </div>
      )}
      
      </div>

     {/* Action Card */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 max-w-4xl mx-auto">
        
        <div className="p-4">
          <div className="mb-4">
            <label
              htmlFor="ApprovalComments"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Approval Comment
            </label>
            <textarea
              id="ApprovalComments"
              className="w-full px-4 py-3  border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#FF6F0B] focus:border-[#FF6F0B] transition-colors duration-200 resize-none"
              name="ApprovalComments"
              rows="4"
              placeholder="Enter your comments here..."
              value={formData.ApprovalComments}
              onChange={e => {
                setFormData({
                  ...formData,
                  ApprovalComments: e.target.value,
                });
              }}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <button
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
              onClick={handleReject}
            >
              Reject
            </button>
            <button
              className="px-6 py-3 bg-primary1 text-white font-semibold rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
              onClick={handleChecked}
            >
              Approved
            </button>
          </div>
        </div>
      </div>

   
    </div>
  );
};

export default Approval;