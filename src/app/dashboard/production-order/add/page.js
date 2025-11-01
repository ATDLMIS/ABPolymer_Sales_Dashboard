import React from 'react';

const page = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl capitalize mb-3">Production Order List</h1>
        <form>
          <input
            name="search"
            type="text"
            placeholder="Search"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-[300px] text-sm"
          />
        </form>
      </div>
      <div className="max-w-2xl bg-gray-200 rounded-md px-4 py-4">
        <h2 className="text-lg font-semibold mb-2 capitalize">
          add new Production Order List
        </h2>
        <form>
          <label htmlFor="designation" className="block text-sm font-bold mb-1">
            Production Order No:
          </label>
          <input
            type="text"
            id="designation"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
          />
          <div>
            <label className="capitalize flex font-semibold text-md py-1">
              Submitted By:
            </label>

            <select name="zone" className="w-full rounded-md">
              <option value="" disabled={true} selected>
                john smith
              </option>
              <option value="Zone one">john smith</option>
              <option value="Zone two">john smith</option>
              <option value="Zone three">john smith</option>
            </select>
          </div>
          <div>
            <label className="capitalize flex font-semibold text-md py-1">
              production order date:
            </label>

            <select name="zone" className="w-full rounded-md">
              <option value="" disabled={true} selected>
                mm/dd/yyyy
              </option>
              <option value="Zone one">mm/dd/yyyy</option>
              <option value="Zone two">mm/dd/yyyy</option>
              <option value="Zone three">mm/dd/yyyy</option>
            </select>
          </div>
          <div>
            <label className="capitalize flex font-semibold text-md py-1">
              Finanacial year:
            </label>

            <select name="zone" className="w-full rounded-md">
              <option value="" disabled={true} selected>
                2023
              </option>
              <option value="Zone one">2023</option>
              <option value="Zone two">2023</option>
              <option value="Zone three">2023</option>
            </select>
          </div>
          <div>
            <label className="capitalize flex font-semibold text-md py-1">
              Production Group:
            </label>

            <select name="zone" className="w-full rounded-md">
              <option value="" disabled={true} selected>
                Group A
              </option>
              <option value="Zone one">Group A</option>
              <option value="Zone two">Group A</option>
              <option value="Zone three">Group A</option>
            </select>
          </div>
          <div>
            <label className="capitalize flex font-semibold text-md py-1">
              Production:
            </label>

            <select name="zone" className="w-full rounded-md">
              <option value="" disabled={true} selected>
                Product A
              </option>
              <option value="Zone one">Product A</option>
              <option value="Zone two">Product A</option>
              <option value="Zone three">Product A</option>
            </select>
          </div>

          <label htmlFor="qty" className="block text-sm font-bold mb-1">
            Quantity:
          </label>
          <input
            type="text"
            id="qty"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
          />
          <div>
            <label className="capitalize flex font-semibold text-md py-1">
              Production Demand Qty:
            </label>

            <select name="zone" className="w-full rounded-md">
              <option value="" disabled={true} selected>
                2000
              </option>
              <option value="Zone one">2000</option>
              <option value="Zone two">2000</option>
              <option value="Zone three">2000</option>
            </select>
          </div>
          <div>
            <label className="capitalize flex font-semibold text-md py-1">
              Status:
            </label>

            <select name="zone" className="w-full rounded-md">
              <option value="" disabled={true} selected>
                Pending
              </option>
              <option value="Zone one">Pending</option>
              <option value="Zone two">Pending</option>
              <option value="Zone three">Pending</option>
            </select>
          </div>

          <div className="mt-5">
            <button className="capitalize bg-primary1 px-5 py-1 text-white rounded-md">
              Save Requisition
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default page;
