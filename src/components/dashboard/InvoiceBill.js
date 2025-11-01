import { FaEye, FaRegEdit } from 'react-icons/fa';

const InvoiceBill = () => {
  let data = [
    {
      invoiceId: 1,
      invoiceNo: 1,
      invoiceDate: '2024-09-08',
      challanNo: 'CH-001',
      partyName: 'Library 1',
      totalAmount: 5000,
      paymentStatus: 'Pending',
    },
    {
      invoiceId: 2,
      invoiceNo: 2,
      invoiceDate: '2024-09-09',
      challanNo: 'CH-002',
      partyName: 'Library 2',
      totalAmount: 7000,
      paymentStatus: 'Paid',
    },
    {
      invoiceId: 3,
      invoiceNo: 3,
      invoiceDate: '2024-09-10',
      challanNo: 'CH-003',
      partyName: 'Bookstore A',
      totalAmount: 4500,
      paymentStatus: 'Pending',
    },
    {
      invoiceId: 4,
      invoiceNo: 4,
      invoiceDate: '2024-09-11',
      challanNo: 'CH-004',
      partyName: 'Library 3',
      totalAmount: 8000,
      paymentStatus: 'Paid',
    },
    {
      invoiceId: 5,
      invoiceNo: 5,
      invoiceDate: '2024-09-12',
      challanNo: 'CH-005',
      partyName: 'Bookstore B',
      totalAmount: 6500,
      paymentStatus: 'Pending',
    },
    {
      invoiceId: 6,
      invoiceNo: 6,
      invoiceDate: '2024-09-13',
      challanNo: 'CH-006',
      partyName: 'Library 4',
      totalAmount: 5500,
      paymentStatus: 'Paid',
    },
    {
      invoiceId: 7,
      invoiceNo: 7,
      invoiceDate: '2024-09-14',
      challanNo: 'CH-007',
      partyName: 'Book Depot',
      totalAmount: 9000,
      paymentStatus: 'Pending',
    },
    {
      invoiceId: 8,
      invoiceNo: 8,
      invoiceDate: '2024-09-15',
      challanNo: 'CH-008',
      partyName: 'Library 5',
      totalAmount: 7500,
      paymentStatus: 'Paid',
    },
    {
      invoiceId: 9,
      invoiceNo: 9,
      invoiceDate: '2024-09-16',
      challanNo: 'CH-009',
      partyName: 'Bookstore C',
      totalAmount: 6700,
      paymentStatus: 'Pending',
    },
    {
      invoiceId: 10,
      invoiceNo: 10,
      invoiceDate: '2024-09-17',
      challanNo: 'CH-010',
      partyName: 'Library 6',
      totalAmount: 5800,
      paymentStatus: 'Paid',
    },
    {
      invoiceId: 11,
      invoiceNo: 11,
      invoiceDate: '2024-09-18',
      challanNo: 'CH-011',
      partyName: 'Library 7',
      totalAmount: 6400,
      paymentStatus: 'Pending',
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
                    Invoice ID
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Invoice No
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Invoice Date
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
                    Party Name
                  </th>

                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Total Amount
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Payment Status
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
                    key={item.invoiceId}
                  >
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                      {item.invoiceId}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {item.invoiceNo}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {item.invoiceDate}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {item.challanNo}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {item.partyName}
                    </td>

                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {item.totalAmount}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {item.paymentStatus}
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

export default InvoiceBill;
