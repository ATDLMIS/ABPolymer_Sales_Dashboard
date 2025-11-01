import { FaEye, FaRegEdit } from 'react-icons/fa';

const InventoryTransfer = () => {
  let data = [
    {
      transferID: 1,
      fromParty: 'Dhaka High School',
      toParty: 'Chittagong Library',
      financialYear: 2023,
      productGroup: 'SSC',
      product: 'Mathematics-class-10',
      quantity: 500,
      transferDate: '2024-09-12',
      performBy: 'John Doe',
    },
    {
      transferID: 2,
      fromParty: 'Dhaka College',
      toParty: 'Sylhet Library',
      financialYear: 2023,
      productGroup: 'HSC',
      product: 'Physics-class-12',
      quantity: 300,
      transferDate: '2024-09-13',
      performBy: 'John Doe',
    },
    {
      transferID: 3,
      fromParty: 'Mirpur High School',
      toParty: 'Rajshahi Library',
      financialYear: 2023,
      productGroup: 'SSC',
      product: 'Biology-class-10',
      quantity: 400,
      transferDate: '2024-09-14',
      performBy: 'John Doe',
    },
    {
      transferID: 4,
      fromParty: 'Chittagong College',
      toParty: 'Khulna Library',
      financialYear: 2023,
      productGroup: 'HSC',
      product: 'Chemistry-class-11',
      quantity: 250,
      transferDate: '2024-09-15',
      performBy: 'John Doe',
    },
    {
      transferID: 5,
      fromParty: 'Narayanganj High School',
      toParty: 'Comilla Library',
      financialYear: 2023,
      productGroup: 'SSC',
      product: 'English-class-9',
      quantity: 600,
      transferDate: '2024-09-16',
      performBy: 'John Doe',
    },
    {
      transferID: 6,
      fromParty: 'Barisal College',
      toParty: 'Mymensingh Library',
      financialYear: 2023,
      productGroup: 'HSC',
      product: 'Bangla-class-12',
      quantity: 350,
      transferDate: '2024-09-17',
      performBy: 'John Doe',
    },
    {
      transferID: 7,
      fromParty: 'Gazipur High School',
      toParty: 'Bogra Library',
      financialYear: 2023,
      productGroup: 'SSC',
      product: 'History-class-10',
      quantity: 450,
      transferDate: '2024-09-18',
      performBy: 'John Doe',
    },
    {
      transferID: 8,
      fromParty: 'Coxs Bazar College',
      toParty: 'Dinajpur Library',
      financialYear: 2023,
      productGroup: 'HSC',
      product: 'Geography-class-11',
      quantity: 300,
      transferDate: '2024-09-19',
      performBy: 'John Doe',
    },
    {
      transferID: 9,
      fromParty: 'Tangail High School',
      toParty: 'Pabna Library',
      financialYear: 2023,
      productGroup: 'SSC',
      product: 'Mathematics-class-9',
      quantity: 550,
      transferDate: '2024-09-20',
      performBy: 'John Doe',
    },
    {
      transferID: 10,
      fromParty: 'Feni College',
      toParty: 'Jashore Library',
      financialYear: 2023,
      productGroup: 'HSC',
      product: 'Statistics-class-12',
      quantity: 200,
      transferDate: '2024-09-21',
      performBy: 'John Doe',
    },
    {
      transferID: 11,
      fromParty: 'Sylhet High School',
      toParty: 'Rangpur Library',
      financialYear: 2023,
      productGroup: 'SSC',
      product: 'Computer Science-class-10',
      quantity: 700,
      transferDate: '2024-09-22',
      performBy: 'John Doe',
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
                    Transfer ID
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    From Party
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    To PArty
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
                    Product Group
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
                    Transfer Date
                  </th>
                  <th
                    scope="col"
                    className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                  >
                    Performed By
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
                    key={item.transferID}
                  >
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                      {item.transferID}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {item.fromParty}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {item.toParty}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {item.financialYear}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {item.productGroup}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {item.product}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {item.quantity}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {item.transferDate}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 dark:border-white/10">
                      {item.performBy}
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

export default InventoryTransfer;
