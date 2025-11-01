'use client'
import { useState } from 'react';
import SalesOrderList from '@/components/salesApproval/SalesOrderList';
import SpecimanOrderList from '@/components/salesApproval/SpecimanOrderList';

const page = () => {
  const [current, setCurrent] = useState('sales');

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl capitalize mb-3">
          Sales Order approval system
        </h1>
        <form>
          <input
            name="search"
            type="text"
            placeholder="Search"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-[300px] text-sm"
          />
        </form>
      </div>
      <div>
      <div className="flex gap-8 items-center mb-5">
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
      <h1 className="text-2xl capitalize text-center py-3">
          {current === 'sales' ? 'sales order list' : 'Speciman Order List'}
        </h1>
      </div>

      <div>{current === 'sales' ? <SalesOrderList /> : <SpecimanOrderList />}</div>
 
    </div>
  );
};

export default page;
