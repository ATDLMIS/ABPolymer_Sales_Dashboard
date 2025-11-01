'use client';
import useGetData from '@/utils/useGetData';
import Link from 'next/link';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const VisitApproval = () => {
  const { status, data } = useGetData(
    '?action=get_VisitPlanApprovalSum&UserID=501'
  );

  if (status === 'pending') {
    return (
      <div className="text-xl font-semibold text-center py-6">Loading...</div>
    );
  }

  return (
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
                    Id
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Employee Name
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Status
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Pending
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.length ? (
                  data.map(item => (
                    <tr
                      className="border-b border-neutral-200 dark:border-white/10"
                      key={item.SL}
                    >
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                        {item.SL}
                      </td>
                      <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                        <Link
                          className="text-blue-600 font-semibold hover:underline"
                          href={`/dashboard/visit-approval/list/${item.VisitUserID}`}
                        >
                          {item.VisitUserName}
                        </Link>
                      </td>

                      <td className="whitespace-nowrap">{item.Status}</td>
                      <td className="whitespace-nowrap">
                        {item.No_of_App_Pending}
                      </td>
                    </tr>
                  ))
                ) : (
                  <div className="text-xl font-semibold text-center py-6">
                    No Data To Display
                  </div>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitApproval;
