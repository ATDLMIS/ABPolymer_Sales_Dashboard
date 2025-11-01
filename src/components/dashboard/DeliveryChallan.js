import { FaEye, FaRegEdit } from 'react-icons/fa';

const DeliveryChallan = () => {
  let data = [
    {
      challanID: 1,
      challanNo: 1,
      challanDate: '2024-09-08',
      salesOrderNo: 'SO-001',
      partyName: 'Library 1',
      totalAmount: 5000,
    },
    {
      challanID: 2,
      challanNo: 2,
      challanDate: '2024-09-09',
      salesOrderNo: 'SO-002',
      partyName: 'Library 2',
      totalAmount: 7000,
    },
    {
      challanID: 3,
      challanNo: 3,
      challanDate: '2024-09-10',
      salesOrderNo: 'SO-003',
      partyName: 'Bookstore A',
      totalAmount: 4500,
    },
    {
      challanID: 4,
      challanNo: 4,
      challanDate: '2024-09-11',
      salesOrderNo: 'SO-004',
      partyName: 'Library 3',
      totalAmount: 8000,
    },
    {
      challanID: 5,
      challanNo: 5,
      challanDate: '2024-09-12',
      salesOrderNo: 'SO-005',
      partyName: 'Bookstore B',
      totalAmount: 6500,
    },
    {
      challanID: 6,
      challanNo: 6,
      challanDate: '2024-09-13',
      salesOrderNo: 'SO-006',
      partyName: 'Library 4',
      totalAmount: 5500,
    },
    {
      challanID: 7,
      challanNo: 7,
      challanDate: '2024-09-14',
      salesOrderNo: 'SO-007',
      partyName: 'Book Depot',
      totalAmount: 9000,
    },
    {
      challanID: 8,
      challanNo: 8,
      challanDate: '2024-09-15',
      salesOrderNo: 'SO-008',
      partyName: 'Library 5',
      totalAmount: 7500,
    },
    {
      challanID: 9,
      challanNo: 9,
      challanDate: '2024-09-16',
      salesOrderNo: 'SO-009',
      partyName: 'Bookstore C',
      totalAmount: 6700,
    },
    {
      challanID: 10,
      challanNo: 10,
      challanDate: '2024-09-17',
      salesOrderNo: 'SO-010',
      partyName: 'Library 6',
      totalAmount: 5800,
    },
    {
      challanID: 11,
      challanNo: 11,
      challanDate: '2024-09-18',
      salesOrderNo: 'SO-011',
      partyName: 'Library 7',
      totalAmount: 6400,
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
                    Challan ID
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Challan No
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Challan Date
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Sales Order No
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Party Name
                  </th>

                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Total Amount
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
                    key={item.challanID}
                  >
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                      {item.challanID}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {item.challanNo}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {item.challanDate}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {item.salesOrderNo}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {item.partyName}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {item.totalAmount}
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

export default DeliveryChallan;
