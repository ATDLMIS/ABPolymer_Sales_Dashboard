'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const page = ({ params }) => {
  const [prevData, setPrevData] = useState({
    status: 'pending',
    data: null,
  });
  const [formData, setFormData] = useState({
    ApproveComment: '',
  });
  console.log(prevData);
  const getPrevData = async id => {
    const res = await Axios.get(
      `?action=get_visit_plan&VisitPlanID=${id}`
    );
    setPrevData({
      status: 'idle',
      data: res.data,
    });
  };

  useEffect(() => {
    if (params.id) {
      getPrevData(params.id);
    }
  }, [params.id]);

  const router = useRouter();

  const handleCencel = async () => {
    const res = await Axios.post(
      '?action=create_sndApprovalRejected_CancelledVisitPlan',
      {
        VisitPlanID: prevData.data.VisitPlan.VisitPlanID,
        CanclledComments: formData.ApproveComment,
        UserID: prevData.data.VisitPlan.UserID,
      }
    );
    router.push('/dashboard/visit-approval/list/501');
  };
  const handleApprove = async () => {
    const res = await Axios.post(
      `?action=create_sndApprovalDetailsVisitPlan&VisitPlanID=${params.id}`,
      {
        VisitPlanID: prevData.data.VisitPlan.VisitPlanID,
        AppComments: formData.ApproveComment,
        UserID: prevData.data.VisitPlan.UserID,
      }
    );

    router.push('/dashboard/visit-approval/list/501');
  };

  if (prevData.status === 'pending') {
    return (
      <div className="text-xl font-semibold text-center py-6">Loading...</div>
    );
  }

  return (
    <>
      {prevData.data !== null ? (
        <>
          <div className="flex justify-center">
            <div className="min-w-[600px] rounded-md bg-gray-300 p-5">
              <h1 className="text-center text-xl font-semibold mb-3">
                Visit Data
              </h1>
              <div className="flex items-center gap-2">
                <h1 className="text-lg">Id:</h1>
                <h1>{prevData.data.VisitPlan.VisitPlanID}</h1>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg">Visit Plan No:</h1>
                <h1>{prevData.data.VisitPlan.VisitPlanNo}</h1>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg">Visit Plan Date:</h1>
                <h1>{prevData.data.VisitPlan.VisitPlanDate}</h1>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg">Visit User Name:</h1>
                <h1>{prevData.data.VisitPlan.VisitUserName}</h1>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg">Institution/Party Type:</h1>
                <h1>{prevData.data.VisitPlan.InstitutionTypeName}</h1>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg">Institution/Party Name:</h1>
                <h1>{prevData.data.VisitPlan.InstituteName}</h1>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg">Purpose Name:</h1>
                <h1>{prevData.data.VisitPlan.PurposeName}</h1>
              </div>
            </div>
          </div>
          <div className="py-6">
            <label
              htmlFor="ApproveComment"
              className="block text-sm font-bold mb-1"
            >
              Approval Comment:
            </label>
            <textarea
              id="ApproveComment"
              className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
              name="ApproveComment"
              type="text"
              value={formData.ApproveComment}
              onChange={e => {
                setFormData({
                  ...formData,
                  ApproveComment: e.target.value,
                });
              }}
            />
            <div className="flex justify-between py-3 px-1">
              <button
                className="bg-red-400 px-6 py-2 rounded-md text-white"
                onClick={handleCencel}
              >
                Cencel
              </button>
              <button
                className="bg-primary1 px-6 py-2 rounded-md text-white"
                onClick={handleApprove}
              >
                Approval
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-xl font-semibold text-center py-6">
          No Data To Display
        </div>
      )}
    </>
  );
};

export default page;
