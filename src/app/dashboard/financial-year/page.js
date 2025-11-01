import FyTable from '@/components/dashboard/FyTable';
const page = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Financial Year</h1>
        <form>
          <input
            name="search"
            type="text"
            placeholder="Search"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-[300px] text-sm"
          />
        </form>
      </div>
      <FyTable />
    </div>
  );
};

export default page;
