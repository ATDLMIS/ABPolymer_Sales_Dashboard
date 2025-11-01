import Avatar from './Avatar';
import Logout from './Logout';
import { IoIosNotificationsOutline } from "react-icons/io";
import Link from 'next/link';
const NavProfile = ({ session }) => {
  return (
    <div className="flex items-center space-x-2 text-surface1">
      <div>
        {/* <Avatar userAvatar={session.user.avatar} /> */}
      </div>
      <div>
        <p className="text-sm">Welcome</p>
        <h1>{session.user.name}</h1>
      </div>
      <Link href="/dashboard/notifications">
      <IoIosNotificationsOutline className="text-3xl cursor-pointer" />
      </Link>
      <Logout />
    </div>
  );
};

export default NavProfile;
