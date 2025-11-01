import SalesOrderEdit from "@/components/dashboard/edit/SalesOrderEdit"
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
const page = async ({params}) => {
    const session = await getServerSession(authOptions);
  return <SalesOrderEdit id={params.id} session={session} />;
}

export default page