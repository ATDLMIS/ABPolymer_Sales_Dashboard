"use client"
import { useState } from 'react';
import SalesPendingList from '@/components/dashboard/invoice/SalesPendingList';
import SpecimanPendingList from '@/components/dashboard/invoice/SpecimanPendingList';
import SalesCompleteList from '@/components/dashboard/invoice/SalesCompleteList';
import SpecimanCompleteList from '@/components/dashboard/invoice/SpecimanCompleteList';

const page = () => {
  const [current, setCurrent] = useState('sales');
  return (
    <div>
      <div className="flex gap-8 items-center mb-5">
        <h1 className="text-2xl capitalize">
          {`Invoice ${current}`}
        </h1>
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
      <div className="flex justify-end items-center">
       
        <form>
          <input
            name="search"
            type="text"
            placeholder="Search"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-[300px] text-sm"
          />
        </form>
      </div>
      {current === 'sales' ? (
        <div>
        <div>
        <h1 className="text-xl capitalize text-center">Pending Sales Order List</h1>
        <SalesPendingList />
        </div>
          <div>
            <h1 className="text-xl capitalize text-center">Complete Invoice List</h1>
            <SalesCompleteList />
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
