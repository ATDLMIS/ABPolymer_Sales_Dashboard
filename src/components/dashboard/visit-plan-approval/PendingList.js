'use client'
import Link from 'next/link';
import useGetData from '@/utils/useGetData';
import convertDateFormat from "@/utils/convertDateFormat"
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const PendingList = () => {
    const pendingData = useGetData('?action=get_VisitPlanEntryApproval&UserID=501')
  if (pendingData.status === 'pending') {
    return (
      <div className="text-xl font-semibold text-center py-5">Loading...</div>
    );
  }
  return (
    <>
        <h1 className="text-2xl capitalize mb-2">Pending list</h1>
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
                    SL
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Visit Plan No
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Visit User Name
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Institute / Party Name
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Approval Status
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Approval Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {pendingData.data.length ? (
                  pendingData.data.map(item => (
                    <tr
                      className="border-b border-neutral-200 dark:border-white/10"
                      key={item.SL}
                    >
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                        {item.SL}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                        {item.VisitPlanNo}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                        {convertDateFormat(item.VisitPlanDate)}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                        {item.VisitUserName}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                        {item.InstituteName}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                        {item.EStatusName}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 flex justify-center gap-3">
                        {item.EStatus === 1 ? (
                          <Link
                            href={
                                `/dashboard/visit-approval-inital/check/${item.VisitPlanID}`
                            }
                          >
                            <button className="bg-gray-300 px-1 py-[2px]">
                              check
                            </button>
                          </Link>
                        ) : item.EStatus === 2 ? (
                          <Link href={
                            `/dashboard/visit-approval-inital/authorized/${item.VisitPlanID}`
                            }>
                            <button className="bg-gray-300 px-1 py-[2px]">
                              Authorize
                            </button>
                          </Link>
                        ): (
                          <Link href={
                            `/dashboard/visit-approval-inital/approval/${item.VisitPlanID}`
                            }>
                            <button className="bg-gray-300 px-1 py-[2px]">
                              Approval
                            </button>
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <div className="text-center text-xl font-semibold">
                    No Data to Display
                  </div>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default PendingList