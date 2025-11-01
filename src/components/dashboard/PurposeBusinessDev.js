import React from 'react';

const PurposeBusinessDev = ({perpouseAmount, setPerpouseAmount }) => {
  return (
    <>
      <h1 className="text-2xl capitalize mb-2">Purpose Details</h1>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block max-w-full w-full pt-5">
            <div className="overflow-x-scroll">
              <table className="max-w-full w-full overflow-x-scroll border border-neutral-200 text-center text-sm font-light text-surface dark:border-white/10 dark:text-white">
                <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                  <tr className="bg-text1 text-white">
                    <th
                      scope="col"
                      className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                    >
                      Teacher Name
                    </th>
                    <th
                      scope="col"
                      className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                    >
                      Designation
                    </th>
                    <th
                      scope="col"
                      className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                    >
                      Mobile
                    </th>
                    <th
                      scope="col"
                      className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                    >
                      Financial Year
                    </th>
                    <th
                      scope="col"
                      className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                    >
                      Product Type
                    </th>
                    <th
                      scope="col"
                      className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                    >
                      Product Name
                    </th>
                    <th
                      scope="col"
                      className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                    >
                      Student Count
                    </th>
                    <th
                      scope="col"
                      className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                    >
                      Approved Amount
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Paid Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    perpouseAmount.map(item => (
                      <tr
                        className="border-b border-neutral-200 dark:border-white/10 text-black"
                        key={item.BDExpReqDetailsID}
                      >
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.TeacherName}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.Designation}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.ContactPhone}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.FinancialYear}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.BooksGroup}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.ProductName}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.StudentsCount}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.DonationAmount}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-1 py-4 font-medium dark:border-white/10">
                        <input
                            type="number"
                            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
                            name="amount"
                            onChange={event => {
                              if(Number(event.target.value) <= Number(item.DonationAmount)){
                              setPerpouseAmount(prevData => prevData.map(data => data.BDExpReqDetailsID == item.BDExpReqDetailsID ? {...data, DonationDisbrush: event.target.value} : data))
                              } else{
                                setPerpouseAmount(prevData => prevData.map(data => data.BDExpReqDetailsID == item.BDExpReqDetailsID ? {...data, DonationDisbrush: 0} : data))
                              }
                            }}
                            value={Number(item.DonationDisbrush) ? item.DonationDisbrush : ''}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PurposeBusinessDev;
