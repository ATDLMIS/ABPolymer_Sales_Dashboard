const page = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl capitalize mb-3">add damage record</h1>
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
        <form>
          <label htmlFor="designation" className="block text-sm font-bold mb-1">
            Damage Number:
          </label>
          <input
            type="text"
            id="designation"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
          />
          <div>
            <label className="capitalize flex font-semibold text-md py-1">
              Damage Date:
            </label>

            <select name="zone" className="w-full rounded-md">
              <option value="" disabled={true} selected>
                dd-mm-YYYY
              </option>
            </select>
          </div>
          <div>
            <label className="capitalize flex font-semibold text-md py-1">
              Approved By User:
            </label>

            <select name="zone" className="w-full rounded-md">
              <option value="" disabled={true} selected>
                User 1
              </option>
              <option value="Zone one">User 2</option>
              <option value="Zone two">User 3</option>
              <option value="Zone three">User 4</option>
            </select>
          </div>
          <div>
            <label className="capitalize flex font-semibold text-md py-1">
              Deposit Cheque (PDF/Image):
            </label>
            <div className="border-[1px] border-[#6b7280] p-1 rounded-md bg-white">
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
              />
            </div>
          </div>
          <div className="mt-3 flex gap-8">
            <div className="flex gap-2 items-center">
              <label className="capitalize flex font-semibold text-md py-1">
                Financial Year:
              </label>
              <div className="flex gap-3">
                <select name="zone" className="rounded-md text-sm">
                  <option value="" disabled={true} selected>
                    Unsold Return
                  </option>
                  <option value="Zone one">Unsold Return</option>
                  <option value="Zone two">Unsold Return</option>
                  <option value="Zone three">Unsold Return</option>
                </select>
                <select name="zone" className="rounded-md text-sm">
                  <option value="" disabled={true} selected>
                    Financial Year 2023
                  </option>
                  <option value="Zone one">Financial Year 2022</option>
                  <option value="Zone two">Financial Year 2021</option>
                  <option value="Zone three">Financial Year 2024</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <label className="capitalize flex font-semibold text-md py-1">
                Book:
              </label>
              <select name="zone" className="rounded-md text-sm">
                <option value="" disabled={true} selected>
                  Mathematics-class-10
                </option>
                <option value="Zone one">Unsold Return</option>
                <option value="Zone two">Unsold Return</option>
                <option value="Zone three">Unsold Return</option>
              </select>
            </div>
          </div>
          <div className="flex gap-8 mt-3">
            <div className="flex gap-2">
              <label className="capitalize flex font-semibold text-md py-1">
                Book Group:
              </label>
              <select name="zone" className="rounded-md text-sm">
                <option value="" disabled={true} selected>
                  Unsold Return
                </option>
                <option value="Zone one">Unsold Return</option>
                <option value="Zone two">Unsold Return</option>
                <option value="Zone three">Unsold Return</option>
              </select>
            </div>
            <div className="flex gap-2">
              <label className="capitalize flex font-semibold text-md py-1">
                Quality:
              </label>
              <input
                type="text"
                id="designation"
                className="text-md outline-1 border-1 focus:ring-0 rounded-md  block text-sm"
              />
            </div>
            <div className="flex gap-2">
              <label className="capitalize flex font-semibold text-md py-1">
                Damage Reson:
              </label>
              <input
                type="text"
                id="designation"
                className="text-md outline-1 border-1 focus:ring-0 rounded-md  block text-sm"
              />
            </div>
            <button className="bg-red-600 px-2 py-1 rounded-md text-white">
              {' '}
              Remove
            </button>
          </div>

          <div className="mt-5">
            <button className="capitalize bg-primary1 px-5 py-1 text-white rounded-md w-full">
              Add Another Product
            </button>
          </div>
          <div className="mt-5">
            <button className="capitalize bg-primary1 px-5 py-1 text-white rounded-md w-full">
              Save Damage Record
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default page;
