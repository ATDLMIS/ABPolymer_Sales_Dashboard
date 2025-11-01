import { FaUserTie } from 'react-icons/fa';
import { TiClipboard } from 'react-icons/ti';
import { RiUserReceivedFill } from 'react-icons/ri';
import { BsClipboardData } from 'react-icons/bs';
import { FaPaintRoller } from 'react-icons/fa';
import { PiCalendarCheck } from 'react-icons/pi';
import { FaBuilding } from 'react-icons/fa';
import { GiTakeMyMoney } from 'react-icons/gi';
import { IoCashOutline } from 'react-icons/io5';
import { PiCodesandboxLogoLight } from 'react-icons/pi';
import { BsClipboardDataFill } from 'react-icons/bs';
let data = [
  {
    id: 1,
    icon: FaUserTie,
    title: 'dealer visit',
    route: '/dashboard/dealer-visit',
  },
  {
    id: 2,
    icon: TiClipboard,
    title: 'dealer visit report',
    route: '/dashboard/dealer-visit-report',
  },
  {
    id: 3,
    icon: RiUserReceivedFill,
    title: 'new dealer visit',
    route: '/dashboard/new-dealer-visit',
  },
  {
    id: 4,
    icon: BsClipboardData,
    title: 'new dealer visit report',
    route: '/dashboard/new-dealer-visit-report',
  },
  {
    id: 5,
    icon: FaPaintRoller,
    title: 'painter visit',
    route: '/dashboard/painter-visit',
  },
  {
    id: 6,
    icon: PiCalendarCheck,
    title: 'painter visit report',
    route: '/dashboard/painter-visit-report',
  },
  {
    id: 7,
    icon: FaBuilding,
    title: 'building visit',
    route: '/dashboard/building-visit',
  },
  {
    id: 8,
    icon: GiTakeMyMoney,
    title: 'collection entry',
    route: '/dashboard/collection-entry',
  },
  {
    id: 9,
    icon: IoCashOutline,
    title: 'collection report',
    route: '/dashboard/collection-report',
  },
  {
    id: 10,
    icon: PiCodesandboxLogoLight,
    title: 'order',
    route: '/dashboard/order',
  },
  {
    id: 11,
    icon: BsClipboardDataFill,
    title: 'order report',
    route: '/dashboard/order-report',
  },
];

const MainDirection = () => {
  return (
    <div className="grid grid-cols-7 gap-10">
      {data.map(item => (
        <div key={item.id} className="text-center bg-white rounded-lg p-5">
          <div className="flex justify-center mb-3">
            <item.icon className="text-primary1 text-6xl" />
          </div>
          <p className="capitalize text-sm text-text2">{item.title}</p>
        </div>
      ))}
    </div>
  );
};

export default MainDirection;
