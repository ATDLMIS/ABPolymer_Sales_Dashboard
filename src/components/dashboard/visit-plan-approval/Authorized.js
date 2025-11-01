'use client'
import {useState} from 'react'
import { useRouter } from 'next/navigation';
import PlanInfo from './PlanInfo';
import TeachersDetails from './TeachersDetails';
import DisplayTADA from './DisplayTADA';
import Comments from './Comments';
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const Authorized = ({viewableData, id}) => {
    const [formData, setFormData] = useState({
        AuthorizedComments: '',
      });
    
      const router = useRouter();

      const handleReject = async () => {
        const res = await Axios.post(
          `?action=create_sndApprovalRejected_CancelledVisitEntry&VisitPlanID=${id}`,
          {
            VisitPlanID: id,
            RejectComments: formData.AuthorizedComments,
            UserID: 501,
          }
        );
        router.push('/dashboard/visit-approval-inital');
      };
      const handleAuthorized = async () => {
        const res = await Axios.post(
          `?action=create_sndApprovalDetailsVisitEntry&VisitPlanID=${id}`,
          {
            VisitPlanID: id,
            AuthComments: formData.AuthorizedComments,
            UserID: 501,
          }
        );
        router.push('/dashboard/visit-approval-inital');
      };
  return (
    <>
    {viewableData.data?.VisitPlan && <PlanInfo VisitPlan={viewableData.data.VisitPlan} />}
    
    {viewableData.data?.Details && <div>
      {viewableData.data.Details.length > 0 ? <TeachersDetails teachersInfo={viewableData.data.Details} PurposeID={viewableData.data.VisitPlan.PurposeID} /> : <div className='text-xl font-semibold text-center py-3'>No Teachers Details Found</div>}
    </div>}
    {viewableData.data?.TADADetails && <div>
      {viewableData.data.TADADetails.length > 0 ? <DisplayTADA tadaDetails={viewableData.data.TADADetails} /> : <div className='text-xl font-semibold text-center py-3'>No TA/DA Details Found</div>}
    </div>}
    {viewableData.data?.visitApprovalsPlan && <Comments Approvals={viewableData.data.visitApprovalsPlan} />}
        <div className="py-6">
        <label
          htmlFor="AuthorizedComments"
          className="block text-sm font-bold mb-1"
        >
          Authorized Comment:
        </label>
        <textarea
          id="AuthorizedComments"
          className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
          name="AuthorizedComments"
          type="text"
          value={formData.AuthorizedComments}
          onChange={e => {
            setFormData({
              ...formData,
              AuthorizedComments: e.target.value,
            });
          }}
        />
        <div className="flex justify-between py-3 px-1">
          <button
            className="bg-red-400 px-6 py-2 rounded-md text-white"
            onClick={handleReject}
          >
            Reject
          </button>
          <button
            className="bg-primary1 px-6 py-2 rounded-md text-white"
            onClick={handleAuthorized}
          >
            Authorization
          </button>
        </div>
      </div>
    </>
  )
}

export default Authorized