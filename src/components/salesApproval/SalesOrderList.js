'use client'
import useGetData from "@/utils/useGetData"
import PendingList from "./PendingList"
import CompletedList from "./CompletedList"
import RejectedList from "./RejectedList"
import CencelledList from "./CencelledList"
import { useEffect, useState } from "react"
import Loading from "../Loading"
import { useSession } from "next-auth/react"
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const SalesOrderList = () => {
 const { data: session, status } = useSession(); 
  const userID = session?.user?.id || 501; // Fallback to 501 if session is not available

  // ✅ Always call the hooks — even if userID isn’t ready yet
  const pendingData = useGetData(
    userID ? `?action=get_salesordersApproval&UserID=${userID}` : null
  );
  console.log(pendingData)
  const completedData = useGetData(
    userID ? `?action=get_salesordersComplete&UserID=${userID}` : null
  );
  const rejectedData = useGetData(
    userID ? `?action=get_salesordersReject&UserID=${userID}` : null
  );
  const cancelledData = useGetData(
    userID ? `?action=get_salesordersCancelled&UserID=${userID}` : null
  );
 const [activeTab, setActiveTab] = useState('pending')

  const tabs = [
    { id: 'pending', label: 'Pending', component:   <PendingList pendingData={pendingData||[]} type="sales" /> },
    { id: 'completed', label: 'Completed', component:  <CompletedList completedData={completedData||[]} type="sales" /> },
    { id: 'rejected', label: 'Rejected', component:  <RejectedList rejectedData={rejectedData||[]} type="sales" /> },
    { id: 'cancelled', label: 'Cancelled', component:      <CencelledList cancelledData={cancelledData||[]} type="sales" /> }
  ]

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component
  // ✅ You can safely show loading after all hooks are called
  if (!userID) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="max-w-7xl mx-auto">
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex-1 px-6 py-4 text-sm font-medium transition-colors relative
                  ${activeTab === tab.id
                    ? 'text-primary1 border-b-2 border-primary1 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 " />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white">
        {ActiveComponent}
        </div>
      </div>
    </div>
  );
};

export default SalesOrderList;
