// app/dashboard/layout.jsx
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import DashboardLayoutClient from '../dashboard/clientLayout';

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/');

  // pass session and children to client component for interactivity
  return <DashboardLayoutClient session={session}>{children}</DashboardLayoutClient>;
}

