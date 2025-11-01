import { FaEye, FaRegEdit } from 'react-icons/fa';

const ProductionOrder = () => {
  let data = [
    {
      id: 1,
      productionOrderNo: 'POR-101',
      submittedBy: 'Mr. Kamal',
      orderDate: '10-01-2024',
      financialYear: 2024,
      productCategory: 'SSC',
      product: 'English 1st',
      quantity: 1000,
      status: 'Pending',
    },
    {
      id: 2,
      productionOrderNo: 'POR-102',
      submittedBy: 'Ms. Rahima',
      orderDate: '11-01-2024',
      financialYear: 2024,
      productCategory: 'HSC',
      product: 'Physics',
      quantity: 1200,
      status: 'Completed',
    },
    {
      id: 3,
      productionOrderNo: 'POR-103',
      submittedBy: 'Mr. Hossain',
      orderDate: '12-01-2024',
      financialYear: 2024,
      productCategory: 'SSC',
      product: 'Mathematics',
      quantity: 900,
      status: 'Pending',
    },
    {
      id: 4,
      productionOrderNo: 'POR-104',
      submittedBy: 'Ms. Parvin',
      orderDate: '13-01-2024',
      financialYear: 2024,
      productCategory: 'HSC',
      product: 'Chemistry',
      quantity: 1100,
      status: 'Completed',
    },
    {
      id: 5,
      productionOrderNo: 'POR-105',
      submittedBy: 'Mr. Saiful',
      orderDate: '14-01-2024',
      financialYear: 2024,
      productCategory: 'SSC',
      product: 'Biology',
      quantity: 950,
      status: 'Pending',
    },
    {
      id: 6,
      productionOrderNo: 'POR-106',
      submittedBy: 'Ms. Sultana',
      orderDate: '15-01-2024',
      financialYear: 2024,
      productCategory: 'HSC',
      product: 'Economics',
      quantity: 1150,
      status: 'Completed',
    },
    {
      id: 7,
      productionOrderNo: 'POR-107',
      submittedBy: 'Mr. Karim',
      orderDate: '16-01-2024',
      financialYear: 2024,
      productCategory: 'SSC',
      product: 'Geography',
      quantity: 1300,
      status: 'Pending',
    },
    {
      id: 8,
      productionOrderNo: 'POR-108',
      submittedBy: 'Ms. Rima',
      orderDate: '17-01-2024',
      financialYear: 2024,
      productCategory: 'HSC',
      product: 'Accounting',
      quantity: 1250,
      status: 'Completed',
    },
    {
      id: 9,
      productionOrderNo: 'POR-109',
      submittedBy: 'Mr. Habib',
      orderDate: '18-01-2024',
      financialYear: 2024,
      productCategory: 'SSC',
      product: 'Bangla',
      quantity: 1400,
      status: 'Pending',
    },
    {
      id: 10,
      productionOrderNo: 'POR-110',
      submittedBy: 'Ms. Shirin',
      orderDate: '19-01-2024',
      financialYear: 2024,
      productCategory: 'HSC',
      product: 'Business Studies',
      quantity: 1050,
      status: 'Completed',
    },
    {
      id: 11,
      productionOrderNo: 'POR-111',
      submittedBy: 'Mr. Kabir',
      orderDate: '20-01-2024',
      financialYear: 2024,
      productCategory: 'SSC',
      product: 'History',
      quantity: 950,
      status: 'Pending',
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
                    Production Order No
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Submitted By
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Production Order Date
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
                    Product Category
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Product
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Quantity
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
                {data.map(item => (
                  <tr
                    className="border-b border-neutral-200 dark:border-white/10"
                    key={item.id}
                  >
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                      {item.productionOrderNo}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {item.submittedBy}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {item.orderDate}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {item.financialYear}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {item.productCategory}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {item.product}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {item.quantity}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {item.status}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 flex justify-center gap-3"></td>
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

export default ProductionOrder;
