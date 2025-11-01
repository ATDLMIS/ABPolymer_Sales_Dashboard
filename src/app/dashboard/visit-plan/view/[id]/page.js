'use client';
import Axios from '@/utils/axios';
import axios from 'axios';
import { useState, useEffect } from 'react';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const page = ({ params }) => {
  const [visitData, setVisitData] = useState({
    status: 'pending',
    data: null,
  });

  console.log(visitData);

  const getData = async id => {
    const res = await Axios.get(
      `?action=get_visit_plan&VisitPlanID=${id}`
    );
    console.log(res);
    setVisitData({
      status: 'idle',
      data: res.data ? res.data : null,
    });
  };

  useEffect(() => {
    if (params.id) {
      getData(params.id);
    }
  }, [params.id]);
  if (visitData.status === 'pending') {
    return (
      <div className="text-xl font-semibold text-center py-6">Loading...</div>
    );
  }
  if (visitData.data === null) {
    return (
      <div className="text-xl font-semibold text-center py-6">
        No Data To Display
      </div>
    );
  }
  return (
    <>
      <div className="flex justify-center">
        <div className="min-w-[600px] rounded-md bg-gray-300 p-5">
          <h1 className="text-center text-xl font-semibold mb-3">
            Visit Plan Requisition Information
          </h1>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Id:</h1>
            <h1>{visitData.data.VisitPlan.VisitPlanID}</h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Visit Plan No:</h1>
            <h1>{visitData.data.VisitPlan.VisitPlanNo}</h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Purpose Name:</h1>
            <h1>{visitData.data.VisitPlan.PurposeName}</h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Visit User Name:</h1>
            <h1>{visitData.data.VisitPlan.VisitUserName}</h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Institution Type:</h1>
            <h1>{visitData.data.VisitPlan.InstitutionTypeName}</h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Institution Name:</h1>
            <h1>{visitData.data.VisitPlan.InstituteName}</h1>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <div className="min-w-[600px] rounded-md bg-gray-300 p-5">
          <h1 className="text-center text-xl font-semibold mb-3">Comment</h1>
          {visitData.data.Approvals.AppComments && (
            <>
              <div className="flex items-center gap-2">
                <h1 className="text-lg">Date:</h1>
                <h1>{visitData.data.Approvals.AppDate}</h1>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg">Approved By:</h1>
                <h1>{visitData.data.Approvals.AppBy}</h1>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg">Approved Comment:</h1>
                <h1>{visitData.data.Approvals.AppComments}</h1>
              </div>
            </>
          )}
          {visitData.data.Approvals.CanclledComments && (
            <>
              <div className="flex items-center gap-2">
                <h1 className="text-lg">Date:</h1>
                <h1>{visitData.data.Approvals.CancelledDate}</h1>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg">Canceled By:</h1>
                <h1>{visitData.data.Approvals.CancelledBy}</h1>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg">Canceled Comment:</h1>
                <h1>{visitData.data.Approvals.CanclledComments}</h1>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default page;
