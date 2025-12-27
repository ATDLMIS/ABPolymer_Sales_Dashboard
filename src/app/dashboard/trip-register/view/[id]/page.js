'use client';
import { useState, useEffect } from 'react';
import convertDateFormat from '@/utils/convertDateFormat';
import formatAmountWithCommas from '@/utils/formatAmountWithCommas';
import Axios from '@/utils/axios';
import useGetData from '@/utils/useGetData';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const page = ({ params }) => {
  console.log(params.id)
  const state = useGetData(`?action=get_TripSchedule&TripID=${params.id}`);
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
          <div className="bg-primary1 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-white mb-1">Trip Register</h1>
              </div>
            </div>
          </div>

          {/* Receipt Details */}
          <div className="px-8 py-6">

             {/* Payment Details */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
              <div className="flex items-center gap-2 mb-5">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Trip Information</h2>
              </div>
              <div className="space-y-0 bg-white rounded-lg p-5 shadow-sm">
                <InfoRow label="Trip No" value={state.data.TripNo} highlight />
                <InfoRow label="Delivery Date" value={state.data.DeliverySalesDate} />
                <InfoRow label="Depot Name" value={state.data.DepotName} />
                <InfoRow label="Vehicle No" value={state.data.VehicleNo} />
                <InfoRow label="Transport Name" value={state.data.TransportName} />
                <InfoRow label="Driver Name" value={state.data.DriverName} />
                <InfoRow label="Driver Mobile" value={state.data.DriverMobile} />
                <InfoRow label="Last Point" value={state.data.LastPoint} />
                <InfoRow label="Address" value={state.data.Address} />
                <InfoRow label="Trip Amount" value={state.data.TripAmount} />
                <InfoRow label="Trip Type" value={state.data.TripType} />
                <InfoRow label="DB Quantity" value={state.data.DB_Qty} />
                <InfoRow label="Challan Quantity" value={state.data.Challan_Qty} />
                <InfoRow label="SKU Quantity" value={state.data.SKU_Qty} />
                <InfoRow label="Sales Amount" value={state.data.SalesAmount} />
              </div>
            </div>

         

     

          </div>      
          
            </div>
      </div>
    </div>
  );
};

export default page;