'use client'
import {useState} from 'react'
import { useRouter } from 'next/navigation';
import PlanInfo from './PlanInfo';
import TeachersDetails from './TeachersDetails';
import DisplayTADA from './DisplayTADA';
import Comments from './Comments';
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const Checked = ({viewableData, id}) => {
  console.log(viewableData)
    const [formData, setFormData] = useState({
        CheckedComments: '',
      });
      const router = useRouter();
      const handleChecked = async () => {
        const res = await Axios.post(
          `?action=create_sndApprovalDetailsVisitEntry&VisitPlanID=${id}`,
          {
            VisitPlanID: id,
            CheckedComments: formData.CheckedComments,
            UserID: 501,
          }
        );
        console.log(res)
        router.push('/dashboard/visit-approval-inital');
      };
      
      const handleCancel = async () => {
        const res = await Axios.post(
          `?action=create_sndApprovalRejected_CancelledVisitEntry&VisitPlanID=${id}`,
          {
            VisitPlanID: id,
            CanclledComments: formData.CheckedComments,
            UserID: 501,
          }
        );
        console.log(res)
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
          htmlFor="CheckedComments"
          className="block text-sm font-bold mb-1"
        >
          Checked Comment:
        </label>
        <textarea
          id="CheckedComments"
          className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
          name="CheckedComments"
          type="text"
          value={formData.CheckedComments}
          onChange={e => {
            setFormData({
              ...formData,
              CheckedComments: e.target.value,
            });
          }}
        />
        <div className="flex justify-between py-3 px-1">
          <button
            className="bg-red-400 px-6 py-2 rounded-md text-white"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="bg-primary1 px-6 py-2 rounded-md text-white"
            onClick={handleChecked}
          >
            Checked
          </button>
        </div>
      </div>
    </>
  )
}

export default Checked