import Link from 'next/link';
import MoneyReceipt from '@/components/dashboard/MoneyReceipt';

const page = () => {
  return (
    <div>
      <h1 className="text-2xl capitalize mb-3 ml-3">Money Receipt</h1>
      <div className="flex justify-between items-center ml-3">
        <Link href="/dashboard/money-receipt/add">
          <button className="capitalize bg-primary1 px-2 py-1 text-white rounded-md">
            add new money receipt
          </button>
        </Link>
        <form>
          <input
            name="search"
            type="text"
            placeholder="Search"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-[250px] text-sm mr-5"
          />
        </form>
      </div>
      <MoneyReceipt />
    </div>
  );
};

export default page;
