'use client';
import Axios from '@/utils/axios';
import axios from 'axios';
import { useState, useEffect } from 'react';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const page = ({ params }) => {
  const [state, setState] = useState({
    status: 'pending',
    data: null,
  });

  const getData = async id => {
    const res = await Axios.get(
      `?action=get_visit_plan&VisitPlanID=${id}`
    );
    setState({
      status: 'idle',
      data: res.data,
    });
  };

  useEffect(() => {
    if (params.id) {
      getData(params.id);
    }
  }, [params.id]);

  if (state.status === 'pending') {
    return (
      <div className="text-xl font-semibold text-center py-6">Loading...</div>
    );
  }

  return state.data !== null ? (
    <>
      <div className="flex justify-center">
        <div className="min-w-[600px] rounded-md bg-gray-300 p-5">
          <h1 className="text-center text-xl font-semibold mb-3">
            Visit Plan Requisition Info
          </h1>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Id:</h1>
            <h1>{state.data.VisitPlan.VisitPlanID}</h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Visit Plan No:</h1>
            <h1>{state.data.VisitPlan.VisitPlanNo}</h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Visit Plan Date:</h1>
            <h1>{state.data.VisitPlan.VisitPlanDate}</h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Visit User Name:</h1>
            <h1>{state.data.VisitPlan.VisitUserName}</h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Institution/Party Type:</h1>
            <h1>{state.data.VisitPlan.InstitutionTypeName}</h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Institution/Party Name:</h1>
            <h1>{state.data.VisitPlan.InstituteName}</h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Purpose Name:</h1>
            <h1>{state.data.VisitPlan.PurposeName}</h1>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <div className="min-w-[600px] rounded-md bg-gray-300 p-5">
          <h1 className="text-center text-xl font-semibold mb-3">Comment</h1>
          {state.data.Approvals.AppComments && (
            <>
              <div className="flex items-center gap-2">
                <h1 className="text-lg">Date:</h1>
                <h1>{state.data.Approvals.AppDate}</h1>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg">Approved By:</h1>
                <h1>{state.data.Approvals.AppBy}</h1>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg">Approved Comment:</h1>
                <h1>{state.data.Approvals.AppComments}</h1>
              </div>
            </>
          )}
          {state.data.Approvals.CanclledComments && (
            <>
              <div className="flex items-center gap-2">
                <h1 className="text-lg">Date:</h1>
                <h1>{state.data.Approvals.CancelledDate}</h1>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg">Canceled By:</h1>
                <h1>{state.data.Approvals.CancelledBy}</h1>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg">Canceled Comment:</h1>
                <h1>{state.data.Approvals.CanclledComments}</h1>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  ) : (
    <div className="text-xl font-semibold text-center py-6">
      No Data to daiplay
    </div>
  );
};

export default page;
