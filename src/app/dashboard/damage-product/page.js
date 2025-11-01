import Link from 'next/link';
import DamageProduct from '@/components/dashboard/DamageProduct';
const page = () => {
  return (
    <div>
      <h1 className="text-2xl capitalize mb-3">Damage records</h1>
      <div className="flex justify-between items-center">
        <Link href="/dashboard/damage-product/add">
          <button className="capitalize bg-primary1 px-2 py-1 text-white rounded-md">
            Add New Damage Record
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
      <DamageProduct />
    </div>
  );
};

export default page;
