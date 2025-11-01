import React from 'react'

const TeachersDetails = ({teachersInfo, PurposeID}) => {
  return (
    <div>
            <h1 className="text-xl font-semibold text-center pt-3">Teachers Details</h1>
            <div className="flex flex-col">
      <div>
        <div className="inline-block max-w-full w-full pt-5">
          <div className="overflow-x-scroll">
            <table className="max-w-full w-full overflow-x-scroll border border-neutral-200 text-center text-sm font-light text-surface dark:border-white/10 dark:text-white">
              <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                <tr className="bg-text1 text-white">
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Teacher_Name
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
                    Financial_Year
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Books_Name
                  </th>
                  {PurposeID === 79 && <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Donation Amount
                  </th>}
                  {PurposeID === 124 && <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Specimen Qty
                  </th>}
                  <th scope="col" className="px-6 py-4">
                    Student Count
                  </th>
                </tr>
              </thead>
              <tbody>
                { teachersInfo.map(item => (
                    <tr
                      className="border-b border-neutral-200 dark:border-white/10"
                      key={item.VisitPlanDetailID}
                    >
                      <td className="whitespace-nowrap border-e border-neutral-200 px-2 py-4 font-medium dark:border-white/10">
                        {item.TeacherName}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                      {item.Designation}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                      {item.Phone}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-1 py-4 font-medium dark:border-white/10">
                      {item.FinancialYear}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-1 py-4 font-medium dark:border-white/10">
                      {item.ProductName}
                      </td>
                      {PurposeID === 79 && <td className="whitespace-nowrap border-e border-neutral-200 px-1 py-4 font-medium dark:border-white/10">
                      {item.DonationAmount}
                      </td>}
                      {PurposeID === 124 && <td className="whitespace-nowrap border-e border-neutral-200 px-1 py-4 font-medium dark:border-white/10">
                      {item.SpecimenQty}
                      </td>}
                      <td className="whitespace-nowrap px-6 py-4 flex justify-center items-end h-full gap-3">
                      {item.StudentNo}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
        </div>
  )
}

export default TeachersDetails