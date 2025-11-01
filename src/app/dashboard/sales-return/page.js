import Link from 'next/link';
import SalesReturn from '@/components/dashboard/SalesReturn';
const page = () => {
  return (
    <div>
      <h1 className="text-2xl capitalize mb-3">sales return list</h1>
      <div className="flex justify-between items-center">
        <Link href="/dashboard/sales-return/add">
          <button className="capitalize bg-primary1 px-2 py-1 text-white rounded-md">
            Add New sales return
          </button>
        </Link>
        <form>
          <input
            name="search"
            type="text"
            placeholder="Search"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-[300px] text-sm"
          />
        </form>
      </div>
      <SalesReturn />
    </div>
  );
};

export default page;
