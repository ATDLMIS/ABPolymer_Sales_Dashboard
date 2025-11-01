'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BiQrScan } from 'react-icons/bi';
import { MdOutlineEqualizer } from 'react-icons/md';
import { TiFlowParallel } from 'react-icons/ti';
import { FaArrowRightLong } from 'react-icons/fa6';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import useGetData from '@/utils/useGetData';

const NavItem = ({ session }) => {
  const [displayLink, setDisplayLink] = useState([]);
  const [userPermission, setUserPermission] = useState([]);

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    
  const { status, data } = useGetData(
    `?action=get_UserMenuPermissions&UserID=${session.user.id}`
  );

  useEffect(() => {
    if (data.length) {
      const { permissions } = data[0];
      setUserPermission(permissions);
    }
  }, [data]);

  let updatedLink = [
    {
      name: 'Home',
      displayName: 'Home',
      href: '/dashboard/',
      status: 'main',
    },
    {
      name: 'Security & Setting',
      displayName: 'Security & Setting',
      status: 'accordion',
      internalLinks: [
        {
          name: 'Dashboard',
          displayName: 'Dashboard',
          href: '/dashboard/',
          status: 'main',
        },
        {
          name: 'Notifications',
          displayName: 'Notifications',
          href: '/dashboard/notifications',
          status: 'main',
        },
        {
          name: 'User-Employee registration',
          displayName: 'User-Employee registration',
          href: '/dashboard/user-employee',
        },
        {
          name: 'User Role',
          displayName: 'User Role',
          href: '/dashboard/',
        },
        {
          name: 'Menu Entry',
          displayName: 'Menu Entry',
          href: '/dashboard/',
        },
        {
          name: 'User Role Mapping',
          displayName: 'User Role Mapping',
          href: '/dashboard/',
        },
        {
          name: 'Role Menu Privileges',
          displayName: 'Role Menu Privileges',
          href: '/dashboard/',
        },
        {
          name: 'Approvals',
          displayName: 'Approvals',
          href: '/dashboard/',
        },
        {
          name: 'Approvals Menu',
          displayName: 'Approvals Menu',
          href: '/dashboard/',
        },
        {
          name: 'User Approvals Privileges',
          displayName: 'User Approvals Privileges',
          href: '/dashboard/',
        },
      ],
    },
    {
      name: 'Master Setup',
      displayName: 'Master Setup',
      status: 'accordion',
      internalLinks: [
        {
          name: 'Financial Year',
          displayName: 'Financial Year',
          href: '/dashboard/financial-year',
        },
        {
          name: 'Designation',
          displayName: 'Designation',
          href: '/dashboard/designation',
        },
        {
          name: 'Region Type',
          displayName: 'Region Type',
          href: '/dashboard/region-type',
        },
        {
          name: 'Region Area',
          displayName: 'Region Area',
          href: '/dashboard/region-area',
        },
        // {
        //   name: 'Institution Type',
        //   displayName: 'Institution Type',
        //   href: '/dashboard/institution-type',
        // },
        // {
        //   name: 'Institution',
        //   displayName: 'Institution',
        //   href: '/dashboard/institution',
        // },
        {
          name: 'Book category',
          displayName: 'Product Type',
          href: '/dashboard/book-category',
        },
        {
          name: 'Books Products',
          displayName: 'Product Name',
          href: '/dashboard/book-management',
        },
        {
          name: 'Party Management',
          displayName: 'Party Management',
          href: '/dashboard/party-management',
        },
        {
          name: 'Marketing Expense',
          displayName: 'Marketing Expense',
          href: '/dashboard/ta-da',
        },
        {
          name: 'Purpose category',
          displayName: 'Marketing Activities',
          href: '/dashboard/purpose-management',
        },
        {
          name: 'Employee VS Region Mapping',
          displayName: 'Employee VS Region Mapping',
          href: '/dashboard/mapping',
        },
        // {
        //   name: 'Mapping V2',
        //   href: '/dashboard/mappingv2',
        // },
        // {
        //   name: 'Class Information',
        //   href: '/dashboard/class-management',
        // },
        // {
        //   name: 'Subject Information',
        //   href: '/dashboard/subject-management',
        // },
      ],
    },
    {
      name: 'Visit Plan Requisition',
      displayName: 'Visit Plan Requisition',
      href: '/dashboard/visit-plan',
      status: 'main',
    },
    {
      name: 'Visit plan approval',
      displayName: 'Visit plan approval',
      href: '/dashboard/visit-approval',
      status: 'main',
    },
    {
      name: 'Visit Entry',
      displayName: 'Visit Entry',
      href: '/dashboard/visit-entry',
      status: 'main',
    },
    {
      name: 'Visit Entry Approval',
      displayName: 'Mkt. Exp. Approval',
      href: '/dashboard/visit-approval-inital',
      status: 'main',
    },
    {
      name: 'Product Receipt',
      displayName: 'Product Receipt',
      href: '/dashboard/product-receipt',
      status: 'main',
    },
    {
      name: 'Sales orders',
      displayName: 'Sales orders',
      href: '/dashboard/sales-order',
      status: 'main',
    },
    {
      name: 'Sales order approval process',
      displayName: 'Sales order approval process',
      href: '/dashboard/sales-order-approval',
      status: 'main',
    },
    {
      name: 'Delivery Challan',
      displayName: 'Delivery Challan',
      href: '/dashboard/delivery-challan',
      status: 'main',
    },
    {
      name: 'Invoice/Bill',
      displayName: 'Invoice/Bill',
      href: '/dashboard/invoice-bill',
      status: 'main',
    },
    {
      name: 'Money Receipt',
      displayName: 'Collection',
      href: '/dashboard/money-receipt',
      status: 'main',
    },
    {
      name: 'Money receipt Approval',
      displayName: 'Collection Approval',
      href: '/dashboard/money-receipt-approval',
      status: 'main',
    },
    {
      name: 'BD Expense Requisition',
      displayName: 'BD Expense Requisition',
      href: '/dashboard/expense-requisition',
      status: 'main',
    },
    {
      name: 'BD Expense Approval',
      displayName: 'BD Expense Approval',
      href: '/dashboard/expense-approval',
      status: 'main',
    },
    {
      name: 'Product Return',
      displayName: 'Product Return',
      href: '/dashboard/sales-return',
      status: 'main',
    },
    {
      name: 'Damage product/Book',
      displayName: 'Damage product/Book',
      href: '/dashboard/expense-requisition',
      status: 'main',
    },
    // {
    //   name: 'Specimen Order', BD Expense Requisition
    //   href: '/dashboard/specimen',
    //   status: 'main',
    // },
    // {
    //   name: 'Specimen Approval',
    //   href: '/dashboard/',
    //   status: 'main',
    // },
  ];

  const filterLinksByPermissions = (links, permissions) => {
    return links
      .map(link => {
        // Check if it has internal links
        if (link.internalLinks) {
          const filteredInternalLinks = link.internalLinks.filter(
            internalLink =>
              permissions.some(permission =>
                internalLink.name
                  .toLowerCase()
                  .includes(permission.toLowerCase())
              )
          );

          // Include the section only if it has filtered internal links
          if (filteredInternalLinks.length > 0) {
            return { ...link, internalLinks: filteredInternalLinks };
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
      const filteredPermission = filterLinksByPermissions(
        updatedLink,
        userPermission
      );
      setDisplayLink(filteredPermission);
    }
  }, [userPermission]);

  let allLinks = [
    {
      section: 'Basic',
      icon: TiFlowParallel,
      links: [
        {
          name: 'financial year',
          href: '/dashboard/financial-year',
          status: 'main',
        },
        {
          name: 'designation',
          href: '/dashboard/designation',
        },
        {
          name: 'user-Employee registration',
          href: '/dashboard/user-employee',
        },
        {
          name: 'region type',
          href: '/dashboard/region-type',
        },
        {
          name: 'region area',
          href: '/dashboard/region-area',
        },
        {
          name: 'Institution type',
          href: '/dashboard/institution-type',
        },
        {
          name: 'Institution',
          href: '/dashboard/institution',
        },
        {
          name: 'book category',
          href: '/dashboard/book-category',
        },
        {
          name: 'books (Products)',
          href: '/dashboard/book-management',
        },
        {
          name: 'party management',
          href: '/dashboard/party-management',
        },
        {
          name: 'Sales & Distribution Expense Ledger',
          href: '/dashboard/ta-da',
        },
        {
          name: 'purpose category',
          href: '/dashboard/purpose-management',
        },
        {
          name: 'mapping employee VS region',
          href: '/dashboard/mapping',
        },
        {
          name: 'class info management',
          href: '/dashboard/class-management',
        },
        {
          name: 'subject info management',
          href: '/dashboard/subject-management',
        },
        {
          name: 'specimen order',
          href: '/dashboard/specimen',
        },
      ],
    },
    {
      section: 'Transection',
      icon: MdOutlineEqualizer,
      links: [
        {
          name: 'assign visit plans',
          href: '/dashboard/visit-plan',
        },
        {
          name: 'visit approval process',
          href: '/dashboard/visit-approval',
        },
        {
          name: 'visit entry',
          href: '/dashboard/visit-entry',
        },
        {
          name: 'visit approval',
          href: '/dashboard/visit-approval-inital',
        },
        {
          name: 'production order',
          href: '/dashboard/production-order',
        },
        {
          name: 'product receipt',
          href: '/dashboard/product-receipt',
        },
        {
          name: 'sales orders',
          href: '/dashboard/sales-order',
        },
        {
          name: 'sales order approval process',
          href: '/dashboard/sales-order-approval',
        },
        {
          name: 'delivery challan',
          href: '/dashboard/delivery-challan',
        },
        {
          name: 'invoice/Bill',
          href: '/dashboard/invoice-bill',
        },
        {
          name: 'money receipt',
          href: '/dashboard/money-receipt',
        },
        {
          name: 'sales return',
          href: '/dashboard/sales-return',
        },
        {
          name: 'inventory transfer',
          href: '/dashboard/inventory-transfer',
        },
      ],
    },
    {
      section: 'Report',
      icon: BiQrScan,
      links: [
        {
          name: 'stock in-out report',
          href: '/dashboard/stock-in-out-report',
        },
        {
          name: 'current stock report',
          href: '/dashboard/current-stock-report',
        },
      ],
    },
  ];
  return (
    <div>
      {displayLink.length &&
        displayLink.map((item, index) =>
          item.status === 'main' ? (
            <div key={index}>
              <Link
                className="capitalize block text-sm text-white py-[2px] pl-12"
                href={item.href}
              >
                {item.displayName}
              </Link>
            </div>
          ) : (
            <Accordion key={index} allowZeroExpanded={true}>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton className="text-white">
                    <div className="flex gap-2 items-center pl-12">
                      <FaArrowRightLong /> {item.displayName}
                    </div>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  {item.internalLinks.map((ele, id) => (
                    <div key={id}>
                      <Link
                        className="capitalize block text-sm text-white py-[2px] pl-12"
                        href={ele.href}
                      >
                        {ele.displayName}
                      </Link>
                    </div>
                  ))}
                  <div className="border border-gray-300 border-dashed my-2"></div>
                </AccordionItemPanel>
              </AccordionItem>
            </Accordion>
          )
        )}
    </div>
  );
};

export default NavItem;
