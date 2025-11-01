'use client';
import { useState } from 'react';
import SalesList from '@/components/delivery-chalan/SalesList';
import SpecimanList from '@/components/delivery-chalan/SpecimanList';
import SalesPendingList from '@/components/delivery-chalan/SalesPendingList';
import SpecimanPendingList from '@/components/delivery-chalan/SpecimanPendingList';

const page = () => {
  const [current, setCurrent] = useState('sales');
  return (
    <div>
      <div className="flex gap-8 items-center mb-5">
        <h1 className="text-2xl capitalize">
          {`Delivery Challan ${current}`}
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
            <h1 className="text-xl capitalize text-center">Complete Challan List</h1>
            <SalesList />
          </div>
        </div>
      ) : (
        <div>
        <div>
        <h1 className="text-xl capitalize text-center">Pending Speciman Order List</h1>
          <SpecimanPendingList />
        </div>
          <div>
            <h1 className="text-xl capitalize text-center">Complete Challan List</h1>
            <SpecimanList />
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
