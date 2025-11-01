'use client';
import useGetData from '@/utils/useGetData';
import Link from 'next/link';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const page = () => {
  const pendingList = useGetData(
    '?action=get_VisitPlanCompleteList&UserID=501'
  );
  const completeList = useGetData(
    '?action=get_VisitPlanCompleteEntryList&UserID=501'
  );
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl capitalize mb-3">visit entry system</h1>
        <form>
          <input
            name="search"
            type="text"
            placeholder="Search"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-[300px] text-sm"
          />
        </form>
      </div>
      {/* start */}
      <h1 className="text-xl capitalize mb-1">Approved visit List</h1>
      <div className="flex flex-col">
        <div>
          <div className="inline-block max-w-full w-full pt-5">
            <div className="overflow-x-scroll">
              {' '}
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
                      Visit No.
                    </th>
                    <th
                      scope="col"
                      className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                    >
                      Visit Date
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
                      Institute/Party Name
                    </th>
                    <th
                      scope="col"
                      className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                    >
                      Visit Purpose
                    </th>
                    <th
                      scope="col"
                      className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                    >
                      Status
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pendingList.data.length ? (
                    pendingList.data.map(item => (
                      <tr
                        className="border-b border-neutral-200 dark:border-white/10"
                        key={item.VisitPlanID}
                      >
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.VisitPlanID}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.VisitPlanNo}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.VisitPlanDate}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.VisitUserName}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.InstituteName}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.PurposeName}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.Status}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 flex justify-center gap-3">
                          <Link
                            href={`/dashboard/visit-entry/details/${item.VisitPlanID}`}
                          >
                            <button className="bg-gray-300 px-1 py-[2px]">
                              Visit Entry Details
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="text-xl font-semibold text-center">
                      No Data To Display
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* end */}
      <h1 className="text-xl capitalize mb-1">Completed visit list</h1>
      {/* start */}
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
                      Visit No.
                    </th>
                    <th
                      scope="col"
                      className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                    >
                      Visit Date
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
                      Institute/Party Name
                    </th>
                    <th
                      scope="col"
                      className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                    >
                      Visit Purpose
                    </th>
                    <th
                      scope="col"
                      className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                    >
                      Status
                    </th>

                    <th scope="col" className="px-6 py-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {completeList.data.length ? (
                    completeList.data.map(item => (
                      <tr
                        className="border-b border-neutral-200 dark:border-white/10"
                        key={item.VisitPlanID}
                      >
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.VisitPlanID}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.VisitPlanNo}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.VisitPlanDate}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.VisitUserName}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.InstituteName}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.PurposeName}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.Status}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 flex justify-center gap-3">
                         <Link href={`/dashboard/visit-entry/view/${item.VisitPlanID}`}>
                          <button className="bg-gray-300 px-1 py-[2px]">
                            Show Details
                          </button>
                         </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="text-xl font-semibold text-center">
                      No Data To Display
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* end */}
    </div>
  );
};

export default page;
