'use client';
import { useState, useEffect } from 'react';
import { 
  Home, 
  ChevronRight,
  Settings,
  Users,
  MapPin,
  Package,
  Truck,
  FileText,
  DollarSign,
  ShoppingCart,
  CheckSquare,
  AlertCircle,
  BarChart3,
  Calendar,
  Building2,
  BookOpen,
  Target,
  Map,
  Menu,
  Briefcase,
  TrendingUp,
  Receipt,
  Archive
} from 'lucide-react';
import Image from 'next/image';
import Axios from '@/utils/axios';

const NavItem = ({ session }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [displayLink, setDisplayLink] = useState([]);
  const [userPermission, setUserPermission] = useState([]);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsCollapsed(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getUserMenuPermission=async() => {
    if (session?.user?.id) {
         const res = await Axios.get(`?action=get_UserMenuPermissions&UserID=${session.user.id}`);
          if (res?.data.length && res?.data[0].permissions) {
            setUserPermission(res?.data[0].permissions);
          }
        }
  }

  // Fetch user permissions
  useEffect(() => {
    getUserMenuPermission();
  }, [session]);

  const menuItems = [
    {
      name: 'Home',
      displayName: 'Home',
      icon: Home,
      href: '/dashboard/',
      type: 'main'
    },
    {
      name: 'Security & Setting',
      displayName: 'Security & Setting',
      icon: Settings,
      type: 'section',
      items: [
        { name: 'Dashboard', displayName: 'Dashboard', icon: BarChart3, href: '/dashboard/' },
        { name: 'Notifications', displayName: 'Notifications', icon: AlertCircle, href: '/dashboard/notifications' },
        { name: 'User-Employee registration', displayName: 'User-Employee registration', icon: Users, href: '/dashboard/user-employee' },
        // { name: 'User Role', displayName: 'User Role', icon: Users, href: '/dashboard/' },
        // { name: 'Menu Entry', displayName: 'Menu Entry', icon: FileText, href: '/dashboard/' },
        // { name: 'User Role Mapping', displayName: 'User Role Mapping', icon: Users, href: '/dashboard/' },
        // { name: 'Role Menu Privileges', displayName: 'Role Menu Privileges', icon: Settings, href: '/dashboard/' },
        // { name: 'Approvals', displayName: 'Approvals', icon: CheckSquare, href: '/dashboard/' },
        // { name: 'Approvals Menu', displayName: 'Approvals Menu', icon: FileText, href: '/dashboard/' },
        // { name: 'User Approvals Privileges', displayName: 'User Approvals Privileges', icon: CheckSquare, href: '/dashboard/' },
      ]
    },
    {
      name: 'Master Setup',
      displayName: 'Master Setup',
      icon: Briefcase,
      type: 'section',
      items: [
        { name: 'Financial Year', displayName: 'Financial Year', icon: Calendar, href: '/dashboard/financial-year' },
        { name: 'Designation', displayName: 'Designation', icon: Users, href: '/dashboard/designation' },
        { name: 'Region Type', displayName: 'Region Type', icon: MapPin, href: '/dashboard/region-type' },
        { name: 'Region Area', displayName: 'Region Area', icon: Map, href: '/dashboard/region-area' },
        { name: 'Institution Type', displayName: 'Product Type', icon: Building2, href: '/dashboard/institution-type' },
        // { name: 'Institution', displayName: 'Institution', icon: Building2, href: '/dashboard/institution' },
        { name: 'Book category', displayName: 'Product category', icon: Package, href: '/dashboard/book-category' },
        { name: 'Books Products', displayName: 'Product Name', icon: BookOpen, href: '/dashboard/book-management' },
        { name: 'Party Management', displayName: 'Party Management', icon: Building2, href: '/dashboard/party-management' },
        { name: 'Marketing Expense', displayName: 'Marketing Expense', icon: DollarSign, href: '/dashboard/ta-da' },
        { name: 'Purpose category', displayName: 'Marketing Activities', icon: Target, href: '/dashboard/purpose-management' },
        { name: 'Employee VS Region Mapping', displayName: 'Employee VS Region Mapping', icon: Map, href: '/dashboard/mapping' },
      ]
    },
    {
      name: 'Visit Plan Requisition',
      displayName: 'Visit Plan Requisition',
      icon: Calendar,
      href: '/dashboard/visit-plan',
      type: 'main'
    },
    {
      name: 'Visit plan approval',
      displayName: 'Visit plan approval',
      icon: CheckSquare,
      href: '/dashboard/visit-approval',
      type: 'main'
    },
    {
      name: 'Visit Entry',
      displayName: 'Visit Entry',
      icon: FileText,
      href: '/dashboard/visit-entry',
      type: 'main'
    },
    {
      name: 'Visit Entry Approval',
      displayName: 'Mkt. Exp. Approval',
      icon: TrendingUp,
      href: '/dashboard/visit-approval-inital',
      type: 'main'
    },
    {
      name: 'Product Receipt',
      displayName: 'Product Receipt',
      icon: Archive,
      href: '/dashboard/product-receipt',
      type: 'main'
    },
    {
      name: 'Sales orders',
      displayName: 'Sales orders',
      icon: ShoppingCart,
      href: '/dashboard/sales-order',
      type: 'main'
    },
    {
      name: 'Sales order approval process',
      displayName: 'Sales order approval',
      icon: CheckSquare,
      href: '/dashboard/sales-order-approval',
      type: 'main'
    },
    {
      name: 'Delivery Challan',
      displayName: 'Delivery Challan',
      icon: Truck,
      href: '/dashboard/delivery-challan',
      type: 'main'
    },
    {
      name: 'Invoice/Bill',
      displayName: 'Invoice/Bill',
      icon: Receipt,
      href: '/dashboard/invoice-bill',
      type: 'main'
    },
    {
      name: 'Money Receipt',
      displayName: 'Collection',
      icon: DollarSign,
      href: '/dashboard/money-receipt',
      type: 'main'
    },
    {
      name: 'Money receipt Approval',
      displayName: 'Collection Approval',
      icon: CheckSquare,
      href: '/dashboard/money-receipt-approval',
      type: 'main'
    },
    {
      name: 'BD Expense Requisition',
      displayName: 'BD Expense Requisition',
      icon: FileText,
      href: '/dashboard/expense-requisition',
      type: 'main'
    },
    {
      name: 'BD Expense Approval',
      displayName: 'BD Expense Approval',
      icon: CheckSquare,
      href: '/dashboard/expense-approval',
      type: 'main'
    },
    {
      name: 'Product Return',
      displayName: 'Product Return',
      icon: Package,
      href: '/dashboard/sales-return',
      type: 'main'
    },
    {
      name: 'Damage product/Book',
      displayName: 'Damage product/Book',
      icon: AlertCircle,
      href: '/dashboard/expense-requisition',
      type: 'main'
    },
    {
      name: 'Stock Report',
      displayName: 'Stock Report',
      icon: BarChart3,
      href: '/dashboard/stock-report',
      type: 'main'
    }
  ];

  // Filter links by permissions
  const filterLinksByPermissions = (links, permissions) => {
    return links
      .map(link => {
        if (link.items) {
          const filteredItems = link.items.filter(item =>
            permissions.some(permission =>
              item.name.toLowerCase().includes(permission.toLowerCase())
            )
          );

          if (filteredItems.length > 0) {
            return { ...link, items: filteredItems };
          }
          return null;
        } else if (
          permissions.some(permission =>
            link.name.toLowerCase().includes(permission.toLowerCase())
          )
        ) {
          return link;
        }
        return null;
      })
      .filter(link => link !== null);
  };

  useEffect(() => {
    if (userPermission.length) {
      const filteredLinks = filterLinksByPermissions(menuItems, userPermission);
      setDisplayLink(filteredLinks);
    } else {
      // If no permissions loaded, show all menu items
      setDisplayLink(menuItems);
    }
  }, [userPermission]);

  const toggleSection = (name) => {
    if (!isMobile && isCollapsed) return;
    setExpandedSection(expandedSection === name ? null : name);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    setExpandedSection(null);
  };

  const sidebarWidth = isCollapsed ? 'w-20' : 'w-64';

  return (
    <div className="relative">
      <style jsx>{`
        .sidebar-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .sidebar-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
        .sidebar-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
        }
        .sidebar-scroll:not(:hover)::-webkit-scrollbar-thumb {
          background: transparent;
        }
        .sidebar-scroll:not(:hover) {
          scrollbar-color: transparent transparent;
        }
      `}</style>

      {/* Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#FF6F0B] text-white hover:bg-[#e5640a] transition-colors shadow-lg"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <div
        className={`sidebar-scroll fixed top-0 left-0 h-screen bg-[#FF6F0B] text-white transition-all duration-300 overflow-y-auto z-40 ${sidebarWidth}`}
        onMouseEnter={() => !isMobile && setIsHovering(true)}
        onMouseLeave={() => !isMobile && setIsHovering(false)}
      >
         {/* Top spacing for hamburger button */}
       <div className='flex  ml-[100px] mt-2'>
         <div className="h-16"></div>
         <Image
            src="/images/logo.png"
            height={50}
            width={250}
            alt="Brand Name"
          />
       </div>

        <div className="py-2">
          {displayLink.map((item, index) => (
            <div key={index}>
              {item.type === 'main' ? (
                <a
                  href={item.href}
                  className={`flex items-center px-3 py-3 hover:bg-[#e5640a] mx-2 rounded-xl cursor-pointer group transition-all ${
                    isCollapsed ? 'flex-col gap-1 justify-center' : 'flex-row gap-4'
                  }`}
                  title={isCollapsed ? item.displayName : ''}
                >
                  <div className="relative">
                    <item.icon className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  {isCollapsed ? (
                    <span className="text-[10px] font-medium text-center leading-tight">{item.displayName}</span>
                  ) : (
                    <span className="text-sm font-medium whitespace-nowrap">{item.displayName}</span>
                  )}
                </a>
              ) : (
                <div>
                  <div
                    onClick={() => toggleSection(item.name)}
                    className={`flex items-center px-3 py-3 hover:bg-[#e5640a] mx-2 rounded-xl cursor-pointer group transition-all ${
                      isCollapsed ? 'flex-col gap-1 justify-center' : 'flex-row gap-4'
                    }`}
                    title={isCollapsed ? item.displayName : ''}
                  >
                    <div className="relative">
                      <item.icon className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    {isCollapsed ? (
                      <span className="text-[10px] font-medium text-center leading-tight">{item.displayName}</span>
                    ) : (
                      <>
                        <span className="text-sm font-medium flex-1 whitespace-nowrap">{item.displayName}</span>
                        <ChevronRight 
                          className={`w-4 h-4 transition-transform stroke-[2.5] ${
                            expandedSection === item.name ? 'rotate-90' : ''
                          }`} 
                        />
                      </>
                    )}
                  </div>
                  
                  {!isCollapsed && expandedSection === item.name && (
                    <div className="ml-4 mt-1 mb-2 border-l-2 border-white/30 pl-2">
                      {item.items.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href={subItem.href}
                          className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#e5640a] rounded-lg mx-2 cursor-pointer transition-all"
                        >
                          <subItem.icon className="w-5 h-5 stroke-[2.5]" />
                          <span className="text-sm font-medium">{subItem.displayName}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {/* Add separator after Home and Security & Setting */}
              {(index === 0 || (displayLink[index].name === 'Security & Setting')) && (
                <div className="border-t border-white/20 my-3 mx-3"></div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom spacing */}
        <div className="h-8"></div>
      </div>
    </div>
  );
};

export default NavItem;