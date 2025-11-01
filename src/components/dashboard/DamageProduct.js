import { FaEye, FaRegEdit } from 'react-icons/fa';
const DamageProduct = () => {
  let data = [
    {
      damageID: 1,
      damageNumber: 'DMG-2024-001',
      damageDate: '2024-09-08',
      approvedByUser: 3,
      approvalScan: 'View Scan',
    },
    {
      damageID: 2,
      damageNumber: 'DMG-2024-002',
      damageDate: '2024-09-09',
      approvedByUser: 4,
      approvalScan: 'View Scan',
    },
    {
      damageID: 3,
      damageNumber: 'DMG-2024-003',
      damageDate: '2024-09-10',
      approvedByUser: 5,
      approvalScan: 'View Scan',
    },
    {
      damageID: 4,
      damageNumber: 'DMG-2024-004',
      damageDate: '2024-09-11',
      approvedByUser: 6,
      approvalScan: 'View Scan',
    },
    {
      damageID: 5,
      damageNumber: 'DMG-2024-005',
      damageDate: '2024-09-12',
      approvedByUser: 7,
      approvalScan: 'View Scan',
    },
    {
      damageID: 6,
      damageNumber: 'DMG-2024-006',
      damageDate: '2024-09-13',
      approvedByUser: 8,
      approvalScan: 'View Scan',
    },
    {
      damageID: 7,
      damageNumber: 'DMG-2024-007',
      damageDate: '2024-09-14',
      approvedByUser: 9,
      approvalScan: 'View Scan',
    },
    {
      damageID: 8,
      damageNumber: 'DMG-2024-008',
      damageDate: '2024-09-15',
      approvedByUser: 10,
      approvalScan: 'View Scan',
    },
    {
      damageID: 9,
      damageNumber: 'DMG-2024-009',
      damageDate: '2024-09-16',
      approvedByUser: 11,
      approvalScan: 'View Scan',
    },
    {
      damageID: 10,
      damageNumber: 'DMG-2024-010',
      damageDate: '2024-09-17',
      approvedByUser: 12,
      approvalScan: 'View Scan',
    },
    {
      damageID: 11,
      damageNumber: 'DMG-2024-011',
      damageDate: '2024-09-18',
      approvedByUser: 13,
      approvalScan: 'View Scan',
    },
  ];
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
                    Damage ID
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Damage Number
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Damage Date
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Approved By User
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Approval Scan
                  </th>

                  <th scope="col" className="px-6 py-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map(item => (
                  <tr
                    className="border-b border-neutral-200 dark:border-white/10"
                    key={item.damageID}
                  >
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                      {item.damageID}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {item.damageNumber}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {item.damageDate}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {item.approvedByUser}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {item.approvalScan}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 flex justify-center items-center gap-3">
                      <span className="bg-cyan-500 p-1 inline-block rounded-md">
                        <FaEye className="text-white text-xl" />
                      </span>{' '}
                      |
                      <span className="bg-amber-600 p-1 inline-block rounded-md">
                        <FaRegEdit className="text-white text-xl" />
                      </span>{' '}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DamageProduct;
