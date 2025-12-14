"use client"
import { useState } from 'react';
import SalesPendingList from '@/components/dashboard/invoice/SalesPendingList';
import SpecimanPendingList from '@/components/dashboard/invoice/SpecimanPendingList';
import SalesCompleteList from '@/components/dashboard/invoice/SalesCompleteList';
import SpecimanCompleteList from '@/components/dashboard/invoice/SpecimanCompleteList';

const page = () => {
  const [current, setCurrent] = useState('sales');
     const [activeTab, setActiveTab] = useState('pending')
  const tabs = [
    { id: 'pending', label: 'Pending', component:   <SalesPendingList  type="sales" /> },
    { id: 'completed', label: 'Completed', component:  <SalesCompleteList  type="sales" /> },
  ]

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component
  return (
    <div>
      <div className="flex gap-8 items-center mb-5 justify-center">
        <div className="flex gap-4">
          <div
            className="flex gap-2 items-center"
            onClick={() => {
              if (current !== 'sales') {
                setCurrent('sales');
              }
            }}
          >
            <input
              id="sales"
              type="checkbox"
              checked={current === 'sales'}
              className="rounded-full"
            />
            <label
              className={`${
                current === 'sales' ? 'text-xl font-semibold' : 'text-xl'
              }`}
              htmlFor="sales"
            >
              Sales Order
            </label>
          </div>
          <div
            className="flex gap-2 items-center"
            onClick={() => {
              if (current !== 'speciman') {
                setCurrent('speciman');
              }
            }}
          >
            <input
              id="speciman"
              type="checkbox"
              checked={current === 'speciman'}
              className="rounded-full"
            />
            <label
              className={`${
                current === 'speciman' ? 'text-xl font-semibold' : 'text-xl'
              }`}
              htmlFor="speciman"
            >
              Speciman Order
            </label>
          </div>
        </div>
      </div>
      {/* <div className="flex justify-end items-center">
       
        <form>
          <input
            name="search"
            type="text"
            placeholder="Search"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-[300px] text-sm"
          />
        </form>
      </div> */}
      {current === 'sales' ? (
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
                  flex-1 px-6 py-4 text-sm font-semibold transition-colors relative
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
      ) : (
        <div>
        <div>
        <h1 className="text-xl capitalize text-center">Pending Speciman Order List</h1>
          <SpecimanPendingList />
        </div>
          <div>
            <h1 className="text-xl capitalize text-center">Complete Invoice List</h1>
            <SpecimanCompleteList />
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
