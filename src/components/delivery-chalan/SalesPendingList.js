'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaCheckCircle } from 'react-icons/fa';
import useGetData from '@/utils/useGetData';
import DataTable from '../table/DataTable';
import { useSession } from 'next-auth/react';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const SalesPendingList = () => {
  const router = useRouter();
  const salesorderList = useGetData(
    '?action=get_salesordersChallan'
  );
  console.log('Sales Order List:', salesorderList);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Format date to remove time part if it exists
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return dateString.split(' ')[0];
  };

  // Extract only name from party/retailer details
  const extractName = (details) => {
    if (!details) return 'N/A';
    
    const nameMatch = details.match(/^([^,\d]+)/);
    if (nameMatch) {
      const name = nameMatch[1].trim();
      return name.length > 25 ? name.substring(0, 25) + '...' : name;
    }
    
    return details.length > 25 ? details.substring(0, 25) + '...' : details;
  };

  // Handle individual checkbox toggle
  const handleCheckboxToggle = (rowId) => {
    setSelectedRows(prev => {
      if (prev.includes(rowId)) {
        return prev.filter(id => id !== rowId);
      } else {
        return [...prev, rowId];
      }
    });
  };

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
      setSelectAll(false);
    } else {
      const allIds = (salesorderList?.data || []).map(row => row.SalesOrderID);
      setSelectedRows(allIds);
      setSelectAll(true);
    }
  };

  // Check if a row is selected
  const isRowSelected = (rowId) => {
    return selectedRows.includes(rowId);
  };

  // Get selected row objects
  const getSelectedRowObjects = () => {
    return (salesorderList?.data || []).filter(row => 
      selectedRows.includes(row.SalesOrderID)
    );
  };

  // Check if all selected rows have the same retailer
  const areAllRetailersSame = () => {
    const selectedObjects = getSelectedRowObjects();
    if (selectedObjects.length === 0) return false;
    
    const firstRetailer = selectedObjects[0]?.RetailerDetailsProfile;
    return selectedObjects.every(row => 
      row.RetailerDetailsProfile === firstRetailer
    );
  };

  // Get the common retailer if all are same
  const getCommonRetailer = () => {
    const selectedObjects = getSelectedRowObjects();
    if (selectedObjects.length === 0) return null;
    return selectedObjects[0]?.RetailerDetailsProfile;
  };

  // Check if all selected rows have the same party
  const areAllPartiesSame = () => {
    const selectedObjects = getSelectedRowObjects();
    if (selectedObjects.length === 0) return false;
    
    const firstParty = selectedObjects[0]?.PartlyDetails;
    return selectedObjects.every(row => 
      row.PartlyDetails === firstParty
    );
  };



  // Handle Bulk Challan button click with validation
  const handleBulkChallanClick = () => {
    const selectedObjects = getSelectedRowObjects();
    
    if (selectedObjects.length === 0) {
      alert('Please select at least one order to create challan.');
      return;
    }

    if (!areAllRetailersSame()) {
      alert('Error: All selected orders must have the same Distribution Point (Retailer).');
      return;
    }

    // Check if all selected rows have the same Party
    if (!areAllPartiesSame()) {
      const confirmContinue = window.confirm(
        'Warning: Selected orders have different parties. This will create multiple challans. Continue?'
      );
      if (!confirmContinue) return;
    }

    createBulkChallan();
  };

  // Function to create bulk challan - FIXED
  const createBulkChallan = () => {
    const selectedObjects = getSelectedRowObjects();
    const selectedOrderIds = selectedObjects.map(row => row.SalesOrderID);
    
    // Clear selection
    setSelectedRows([]);
    setSelectAll(false);
    
    // Redirect to challan creation page with ALL selected IDs as query parameters
    if (selectedOrderIds.length > 0) {
      router.push(`/dashboard/delivery-challan/add-sales/${selectedOrderIds.join(',')}`);
    }
  };

  const columns = [
    {
      key: 'checkbox',
      header: () => (
        <div className="flex justify-center">
          <input
            type="checkbox"
            checked={selectAll && (salesorderList?.data || []).length > 0}
            onChange={handleSelectAll}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
        </div>
      ),
      width: '5%',
      headerClassName: 'text-center',
      cellClassName: 'text-center',
      render: (row) => (
        <div className="flex justify-center">
          <input
            type="checkbox"
            checked={isRowSelected(row.SalesOrderID)}
            onChange={() => handleCheckboxToggle(row.SalesOrderID)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
        </div>
      )
    },
    {
      key: 'SL',
      header: 'SL',
      width: '5%',
      headerClassName: 'text-center',
      cellClassName: 'font-medium text-center text-xs'
    },
    {
      key: 'SalesOrderNo',
      header: 'Order No',
      width: '12%',
      cellClassName: 'text-xs font-medium'
    },
    {
      key: 'OrderDate',
      header: 'Date',
      width: '8%',
      render: (row) => (
        <div className="text-xs whitespace-nowrap">
          {formatDate(row.OrderDate)}
        </div>
      )
    },
    {
      key: 'PartlyDetails',
      header: 'Party Name',
      width: '15%',
      headerClassName: 'text-center',
      cellClassName: 'text-left',
      render: (row) => (
        <div 
          className="text-xs leading-tight break-all overflow-hidden"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxHeight: '2.8em',
            lineHeight: '1.4'
          }}
          title={row.PartlyDetails || 'N/A'}
        >
          {row.PartlyDetails || 'N/A'}
        </div>
      )
    },
    {
      key: 'RetailerDetailsProfile',
      header: 'Retailer',
      width: '20%',
      headerClassName: 'text-center',
      cellClassName: 'text-left',
      render: (row) => (
        <div 
          className="text-xs leading-tight break-all overflow-hidden"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxHeight: '2.8em',
            lineHeight: '1.4'
          }}
          title={row.RetailerDetailsProfile || 'N/A'}
        >
          {row.RetailerDetailsProfile || 'N/A'}
        </div>
      )
    },
     {
      key: 'ChallanStatusName',
      header: 'Challan Status',
      width: '12%',
      cellClassName: 'text-xs font-medium'
    }
  ];

  const selectedObjects = getSelectedRowObjects();
  const allRetailersSame = areAllRetailersSame();
  const allPartiesSame = areAllPartiesSame();
  const commonRetailer = getCommonRetailer();

  return (
    <div>
      {/* Selection Info and Bulk Challan Button */}
      {selectedObjects.length > 0 && (
        <div className={`mb-4 p-3 border rounded-lg ${
          allRetailersSame ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'
        }`}>
          <div className="flex justify-between items-center">
            <div className="text-sm">
              <span className="font-semibold">{selectedObjects.length}</span> order(s) selected
              {commonRetailer && (
                <span className={`ml-3 text-xs ${allRetailersSame ? 'text-green-700' : 'text-yellow-700'}`}>
                  Retailer: {extractName(commonRetailer)}
                  {!allRetailersSame && ' (Different retailers selected)'}
                </span>
              )}
              {!allPartiesSame && (
                <span className="ml-3 text-xs text-orange-700">
                  ⚠️ Multiple parties selected
                </span>
              )}
            </div>
            <button
              onClick={handleBulkChallanClick}
              disabled={!allRetailersSame}
              className={`inline-flex items-center gap-2 text-white px-4 py-2 rounded-md text-sm font-medium ${
                allRetailersSame 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              <FaCheckCircle />
              Create Bulk Challan ({selectedObjects.length})
            </button>
          </div>
          
          {!allRetailersSame && selectedObjects.length > 1 && (
            <div className="mt-2 text-xs text-yellow-700">
              ⚠️ Please select only orders with the same retailer to create a bulk challan.
            </div>
          )}
          
          {allRetailersSame && !allPartiesSame && (
            <div className="mt-2 text-xs text-orange-700">
              ℹ️ Selected orders have different parties. You will need to create multiple challans.
            </div>
          )}
        </div>
      )}

      <DataTable
        columns={columns}
        data={salesorderList?.data || []}
        isLoading={salesorderList.status === 'loading'}
        error={salesorderList.status === 'error' ? 'Failed to load data' : null}
        emptyMessage="No data found"
      />
    </div>
  );
};

export default SalesPendingList;