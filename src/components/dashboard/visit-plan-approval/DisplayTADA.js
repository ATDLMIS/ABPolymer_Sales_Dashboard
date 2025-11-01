import React from 'react'

const DisplayTADA = ({tadaDetails}) => {
  return (
    <div>
            <h1 className="text-xl font-semibold text-center pt-3">TA/DA Details</h1>
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
                    TA/DA Allowance Type
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Thansport Media
                  </th>
                  <th scope="col" className="px-6 py-4">
                  Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                { tadaDetails.map(item => (
                    <tr
                      className="border-b border-neutral-200 dark:border-white/10"
                      key={item.sndVisitPlanTADADetailsID}
                    >
                      <td className="whitespace-nowrap border-e border-neutral-200 px-2 py-4 font-medium dark:border-white/10">
                        {item.TADACategory}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-2 py-4 font-medium dark:border-white/10">
                        {item.ThansportMedia}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 flex justify-center items-end h-full gap-3">
                      {item.Amount}
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

export default DisplayTADA