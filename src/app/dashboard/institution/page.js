import Link from 'next/link';
import InstitutionManagement from '@/components/dashboard/InstitutionManagement';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const page = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <h1 className="text-2xl capitalize mb-3">institution management</h1>
      <div className="flex justify-between items-center">
        <Link href="/dashboard/institution/add">
          <button className="capitalize bg-primary1 px-2 py-1 text-white rounded-md">
            add new institution
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
      {session?.user && <InstitutionManagement session={session} />}
      
    </div>
  );
};

export default page;
