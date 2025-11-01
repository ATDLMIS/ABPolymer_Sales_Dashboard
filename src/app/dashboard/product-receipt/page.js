import Link from 'next/link';
import ProductReceiptList from '@/components/dashboard/ProductReceiptList';

const page = () => {
  return (
    <div>
      <h1 className="text-2xl capitalize mb-3">product receipt list</h1>
      <div className="flex justify-between items-center">
        <Link href="/dashboard/product-receipt/add">
          <button className="capitalize bg-primary1 px-2 py-1 text-white rounded-md">
            add new product receipt
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
      <ProductReceiptList />
    </div>
  );
};

export default page;
