const page = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl capitalize mb-3">add Specimen-Requistion</h1>
        <form>
          <input
            name="search"
            type="text"
            placeholder="Search"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-[300px] text-sm"
          />
        </form>
      </div>
      <div className="w-full bg-gray-200 rounded-md px-4 py-4">
        <h2 className="text-lg font-semibold mb-2 capitalize">
          add Specimen-Requistion
        </h2>
        <form>
          <label htmlFor="designation" className="block text-sm font-bold mb-1">
            Specimen Order No:
          </label>
          <input
            type="text"
            id="designation"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
          />
          <div>
            <label className="capitalize flex font-semibold text-md py-1">
              Employee Name:
            </label>

            <select name="zone" className="w-full rounded-md">
              <option value="" disabled={true} selected>
                Library 1
              </option>
              <option value="Zone one">Library 2</option>
              <option value="Zone two">Library 3</option>
              <option value="Zone three">Library 4</option>
            </select>
          </div>
          <div>
            <label className="capitalize flex font-semibold text-md py-1">
              Order Date:
            </label>

            <select name="zone" className="w-full rounded-md">
              <option value="" disabled={true} selected>
                dd-mm-YYYY
              </option>
            </select>
          </div>
          <div>
            <label className="capitalize flex font-semibold text-md py-1">
              Status:
            </label>

            <select name="zone" className="w-full rounded-md">
              <option value="" disabled={true} selected>
                Pending
              </option>
            </select>
          </div>
          <div className="flex flex-col">
            {/* table Start */}
            <div className="overflow-x-auto">
              <div className="inline-block max-w-full w-full pt-5">
                <div className="overflow-hidden">
                  <table className="max-w-full w-full border border-neutral-200 text-center text-sm font-light text-surface dark:border-white/10 dark:text-white">
                    <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                      <tr className="bg-text1 text-white">
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
                          Product Type
                        </th>
                        <th
                          scope="col"
                          className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                        >
                          Product Name
                        </th>
                        <th
                          scope="col"
                          className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                        >
                          Qty
                        </th>
                        <th
                          scope="col"
                          className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                        >
                          Price
                        </th>

                        <th scope="col" className="px-6 py-4">
                          T.Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-neutral-200 dark:border-white/10">
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          FY-2023
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          Group A
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          mathematics-class 10
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          300
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          2000
                        </td>

                        <td className="whitespace-nowrap px-6 py-4 flex justify-center gap-3">
                          60000
                        </td>
                      </tr>
                      <tr className="border-b border-neutral-200 dark:border-white/10">
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          FY-2023
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          Group A
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          mathematics-class 10
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          300
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          2000
                        </td>

                        <td className="whitespace-nowrap px-6 py-4 flex justify-center gap-3">
                          60000
                        </td>
                      </tr>
                      <tr className="border-b border-neutral-200 dark:border-white/10">
                        <td
                          className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10"
                          colSpan="4"
                        ></td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          Total
                        </td>

                        <td className="whitespace-nowrap px-6 py-4 flex justify-center gap-3">
                          120000
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* table End */}
          <div className="mt-5">
            <button className="capitalize bg-primary1 px-5 py-1 text-white rounded-md w-full">
              Add Another Product
            </button>
          </div>
          <div className="mt-5">
            <button className="capitalize bg-primary1 px-5 py-1 text-white rounded-md w-full">
              Save Sales Return
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default page;
