import UEtable from '@/components/dashboard/UEtable';
import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
const page = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      {session?.user.id && <UEtable userId={session.user.id} />}
    </div>
  );
};

export default page;
