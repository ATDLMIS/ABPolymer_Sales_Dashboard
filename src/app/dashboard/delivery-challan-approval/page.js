"use client"
import ChallanCompleteList from '@/components/delivery-challan-approval/ChallanCompleteList'
import ChallanPendingList from '@/components/delivery-challan-approval/ChallanPendingList'
import { useState } from 'react'

const Page = () => {
  const [activeTab, setActiveTab] = useState('pending')

  const tabs = [
    { id: 'pending', label: 'Pending', component: ChallanPendingList },
    { id: 'completed', label: 'Completed', component: ChallanCompleteList }
  ]

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component

  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl font-semibold text-gray-800 mb-6 text-center">Delivery Challan Approval</h1>
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
          {ActiveComponent && <ActiveComponent />}
        </div>
      </div>
    </div>
  )
}

export default Page