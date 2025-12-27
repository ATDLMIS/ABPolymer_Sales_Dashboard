import React, { useState, useMemo } from 'react';
import { Package, FileText, Check, ChevronDown, ChevronUp, Plus, Minus, Save, ArrowLeft } from 'lucide-react';

const ChallanManagement = () => {
  const [currentPage, setCurrentPage] = useState('list'); // 'list' or 'create'
  const [orders] = useState([
    {
      SL: "2",
      SalesOrderID: 2778,
      SalesOrderNo: "SO-1003/12-25",
      OrderDate: "2025-12-18",
      PartyID: 17,
      partyname: "M/s Sumon Tubewell & Sanitary",
      PartyNameDetails: "Sakib , 01918701002 , 01727617106",
      PartyAddress: "Bazar Road, Kaliakoir, Gazipur",
      RetailerName: null,
      RetailerDetails: " , ",
      RetailerAddress: null,
      Status: "Approved",
      ChallanStatus: 0,
      TotalAmount: "193640.00",
      LogUserName: "Lal Mia",
      items: [
        { ItemID: 1, ItemName: "PVC Pipe 1 inch", OrderedQty: 100, Rate: 120.50, Unit: "pcs" },
        { ItemID: 2, ItemName: "Elbow Joint", OrderedQty: 50, Rate: 45.00, Unit: "pcs" },
        { ItemID: 3, ItemName: "T-Joint", OrderedQty: 30, Rate: 55.00, Unit: "pcs" }
      ]
    },
  
    {
      SL: "1",
      SalesOrderID: 2777,
      SalesOrderNo: "SO-1002/12-25",
      OrderDate: "2025-12-18",
      PartyID: 28,
      partyname: "Khan Tiles & Sanitary",
      PartyNameDetails: "Md. Monir Uddin , 1724582132",
      PartyAddress: "Pakullah Bazar, Mirzapur, Tangail",
      RetailerName: "ABCD",
      RetailerDetails: "ABC , 345345",
      RetailerAddress: "Dhaka",
      Status: "Approved",
      ChallanStatus: 0,
      TotalAmount: "53120.00",
      LogUserName: "Lal Mia",
      items: [
        { ItemID: 6, ItemName: "Ceramic Tiles 12x12", OrderedQty: 200, Rate: 85.00, Unit: "sqft" },
        { ItemID: 7, ItemName: "Adhesive", OrderedQty: 10, Rate: 650.00, Unit: "bag" }
      ]
    },
  
  ]);

  const [selectedOrders, setSelectedOrders] = useState([]);
  const [groupingMode, setGroupingMode] = useState('auto');
  const [expandedGroups, setExpandedGroups] = useState({});
  const [challanItems, setChallanItems] = useState([]);
  const [challanInfo, setChallanInfo] = useState({
    challanNo: '',
    challanDate: new Date().toISOString().split('T')[0],
    deliveryDate: '',
    remarks: ''
  });

  const groupedOrders = useMemo(() => {
    const groups = {};
    orders.forEach(order => {
      const key = `${order.PartyID}_${order.RetailerName || 'direct'}`;
      if (!groups[key]) {
        groups[key] = {
          partyName: order.partyname,
          partyDetails: order.PartyNameDetails,
          retailerName: order.RetailerName,
          partyAddress: order.PartyAddress,
          retailerAddress: order.RetailerAddress,
          orders: []
        };
      }
      groups[key].orders.push(order);
    });
    return Object.values(groups);
  }, [orders]);

  const toggleOrderSelection = (orderId) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const toggleGroupExpansion = (index) => {
    setExpandedGroups(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const selectAllInGroup = (group) => {
    const groupOrderIds = group.orders.map(o => o.SalesOrderID);
    const allSelected = groupOrderIds.every(id => selectedOrders.includes(id));
    
    if (allSelected) {
      setSelectedOrders(prev => prev.filter(id => !groupOrderIds.includes(id)));
    } else {
      setSelectedOrders(prev => [...new Set([...prev, ...groupOrderIds])]);
    }
  };

  const createChallans = () => {
    if (selectedOrders.length === 0) {
      alert('Please select at least one order');
      return;
    }

    const selectedOrdersData = orders.filter(o => selectedOrders.includes(o.SalesOrderID));
    
    // Prepare challan items with delivery quantities
    const items = [];
    selectedOrdersData.forEach(order => {
      order.items.forEach(item => {
        items.push({
          ...item,
          SalesOrderID: order.SalesOrderID,
          SalesOrderNo: order.SalesOrderNo,
          DeliveryQty: item.OrderedQty,
          Amount: item.OrderedQty * item.Rate
        });
      });
    });

    setChallanItems(items);
    
    // Auto-generate challan number
    const challanNo = `CH-${Date.now().toString().slice(-6)}`;
    setChallanInfo(prev => ({ ...prev, challanNo }));
    
    setCurrentPage('create');
  };

  const updateDeliveryQty = (index, newQty) => {
    setChallanItems(prev => {
      const updated = [...prev];
      const item = updated[index];
      const qty = Math.max(0, Math.min(newQty, item.OrderedQty));
      updated[index] = {
        ...item,
        DeliveryQty: qty,
        Amount: qty * item.Rate
      };
      return updated;
    });
  };

  const saveChallan = () => {
    const challanData = {
      challanInfo,
      items: challanItems,
      selectedOrders: orders.filter(o => selectedOrders.includes(o.SalesOrderID)),
      totalAmount: challanItems.reduce((sum, item) => sum + item.Amount, 0)
    };

    console.log('Saving challan to database:', challanData);
    
    // Here you would make an API call to save to database
    // Example: await fetch('/api/challans', { method: 'POST', body: JSON.stringify(challanData) })
    
    alert('Challan saved successfully!\n\nChallan No: ' + challanInfo.challanNo + '\nTotal Amount: ৳' + challanData.totalAmount.toFixed(2));
    
    // Reset and go back to list
    setCurrentPage('list');
    setSelectedOrders([]);
    setChallanItems([]);
  };

  const getTotalAmount = (ordersList) => {
    return ordersList.reduce((sum, order) => sum + parseFloat(order.TotalAmount), 0).toFixed(2);
  };

  const calculateChallanTotal = () => {
    return challanItems.reduce((sum, item) => sum + item.Amount, 0).toFixed(2);
  };

  // Create Challan Page
  if (currentPage === 'create') {
    const selectedOrdersData = orders.filter(o => selectedOrders.includes(o.SalesOrderID));
    const firstOrder = selectedOrdersData[0];

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentPage('list')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Create Challan</h1>
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedOrders.length} order(s) selected
                  </p>
                </div>
              </div>
              <button
                onClick={saveChallan}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
              >
                <Save className="w-5 h-5" />
                Save Challan
              </button>
            </div>

            {/* Challan Info Form */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Challan No
                </label>
                <input
                  type="text"
                  value={challanInfo.challanNo}
                  onChange={(e) => setChallanInfo(prev => ({ ...prev, challanNo: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Challan Date
                </label>
                <input
                  type="date"
                  value={challanInfo.challanDate}
                  onChange={(e) => setChallanInfo(prev => ({ ...prev, challanDate: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Delivery Date
                </label>
                <input
                  type="date"
                  value={challanInfo.deliveryDate}
                  onChange={(e) => setChallanInfo(prev => ({ ...prev, deliveryDate: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Remarks
                </label>
                <input
                  type="text"
                  value={challanInfo.remarks}
                  onChange={(e) => setChallanInfo(prev => ({ ...prev, remarks: e.target.value }))}
                  placeholder="Optional remarks"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Party/Retailer Info */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Party Details</h3>
                  <p className="text-gray-700">{firstOrder.partyname}</p>
                  <p className="text-sm text-gray-600">{firstOrder.PartyNameDetails}</p>
                  <p className="text-sm text-gray-600">{firstOrder.PartyAddress}</p>
                </div>
                {firstOrder.RetailerName && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Retailer Details</h3>
                    <p className="text-gray-700">{firstOrder.RetailerName}</p>
                    <p className="text-sm text-gray-600">{firstOrder.RetailerDetails}</p>
                    <p className="text-sm text-gray-600">{firstOrder.RetailerAddress}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item Name
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ordered Qty
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Delivery Qty
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rate
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {challanItems.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {item.SalesOrderNo}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {item.ItemName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-700">
                        {item.OrderedQty} {item.Unit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => updateDeliveryQty(index, item.DeliveryQty - 1)}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                          >
                            <Minus className="w-4 h-4 text-gray-600" />
                          </button>
                          <input
                            type="number"
                            value={item.DeliveryQty}
                            onChange={(e) => updateDeliveryQty(index, parseInt(e.target.value) || 0)}
                            min="0"
                            max={item.OrderedQty}
                            className="w-20 px-2 py-1 text-center border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                          <button
                            onClick={() => updateDeliveryQty(index, item.DeliveryQty + 1)}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                          >
                            <Plus className="w-4 h-4 text-gray-600" />
                          </button>
                          <span className="text-sm text-gray-500">{item.Unit}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-700">
                        ৳ {item.Rate.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold text-gray-900">
                        ৳ {item.Amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50 border-t-2 border-gray-300">
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-right font-semibold text-gray-900">
                      Total Amount:
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-lg text-green-600">
                      ৳ {calculateChallanTotal()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Order List Page
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-800">Challan Management</h1>
            </div>
            <div className="text-sm text-gray-500">
              {selectedOrders.length} order(s) selected
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setGroupingMode('auto')}
              className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                groupingMode === 'auto'
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}
            >
              <div className="font-semibold">Auto Group</div>
              <div className="text-xs mt-1">Group by Party/Retailer</div>
            </button>
            <button
              onClick={() => setGroupingMode('single')}
              className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                groupingMode === 'single'
                  ? 'border-green-600 bg-green-50 text-green-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}
            >
              <div className="font-semibold">Single Challan</div>
              <div className="text-xs mt-1">All selected in one</div>
            </button>
            <button
              onClick={() => setGroupingMode('separate')}
              className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                groupingMode === 'separate'
                  ? 'border-purple-600 bg-purple-50 text-purple-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}
            >
              <div className="font-semibold">Separate Challans</div>
              <div className="text-xs mt-1">One per order</div>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {groupedOrders.map((group, groupIndex) => {
            const isExpanded = expandedGroups[groupIndex] !== false;
            const groupOrderIds = group.orders.map(o => o.SalesOrderID);
            const allSelected = groupOrderIds.every(id => selectedOrders.includes(id));
            const someSelected = groupOrderIds.some(id => selectedOrders.includes(id));

            return (
              <div key={groupIndex} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <input
                        type="checkbox"
                        checked={allSelected}
                        ref={el => {
                          if (el) el.indeterminate = someSelected && !allSelected;
                        }}
                        onChange={() => selectAllInGroup(group)}
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-gray-800">{group.partyName}</h3>
                          {group.retailerName && (
                            <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                              → {group.retailerName}
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {group.retailerAddress || group.partyAddress}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">{group.orders.length} orders</div>
                        <div className="font-semibold text-gray-800">৳ {getTotalAmount(group.orders)}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleGroupExpansion(groupIndex)}
                      className="ml-4 p-2 hover:bg-white rounded-lg transition-colors"
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="divide-y divide-gray-100">
                    {group.orders.map((order) => (
                      <div
                        key={order.SL}
                        className={`p-4 transition-colors ${
                          selectedOrders.includes(order.SalesOrderID)
                            ? 'bg-blue-50'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <input
                            type="checkbox"
                            checked={selectedOrders.includes(order.SalesOrderID)}
                            onChange={() => toggleOrderSelection(order.SalesOrderID)}
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <div className="flex-1 grid grid-cols-4 gap-4">
                            <div>
                              <div className="text-xs text-gray-500">Order No</div>
                              <div className="font-medium text-gray-800">{order.SalesOrderNo}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500">Order Date</div>
                              <div className="text-gray-700">{order.OrderDate}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500">Status</div>
                              <span className="inline-flex items-center gap-1 text-green-700 bg-green-100 px-2 py-1 rounded text-xs">
                                <Check className="w-3 h-3" />
                                {order.Status}
                              </span>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-gray-500">Amount</div>
                              <div className="font-semibold text-gray-800">৳ {order.TotalAmount}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {selectedOrders.length > 0 && (
          <div className="fixed bottom-6 right-6">
            <button
              onClick={createChallans}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition-colors font-semibold"
            >
              <FileText className="w-5 h-5" />
              Create Challan{groupingMode === 'separate' && selectedOrders.length > 1 ? 's' : ''}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallanManagement;