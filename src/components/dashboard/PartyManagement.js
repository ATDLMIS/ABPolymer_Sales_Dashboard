"use client";
import { FaEye, FaRegEdit, FaMapMarkedAlt, FaFileAlt, FaPlus, FaSearch, FaTimes } from "react-icons/fa";
import { useState, useEffect } from 'react';
import Axios from "@/utils/axios";
import Link from 'next/link';
import RetailerModalForm from "../modal/RetailerModalForm";
import { useSession } from "next-auth/react";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const PartyManagement = () => {
  const { data: session, status } = useSession();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');
  const [districts, setDistricts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedParty, setSelectedParty] = useState(null);
  const [areaModalOpen, setAreaModalOpen] = useState(false);
  const [retailerModalOpen, setRetailerModalOpen] = useState(false);
  const [retailers, setRetailers] = useState([]);
  const [loadingRetailers, setLoadingRetailers] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [summary, setSummary] = useState({
    total_parties: 0,
    active_parties: 0,
    inactive_parties: 0,
    pending_parties: 0
  });

  // Status badge component (inline version)
  const StatusBadge = ({ status }) => {
    const getColor = (status) => {
      switch (status?.toLowerCase()) {
        case 'active': return 'bg-green-100 text-green-800 border border-green-200';
        case 'inactive': return 'bg-red-100 text-red-800 border border-red-200';
        case 'pending': return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
        default: return 'bg-gray-100 text-gray-800 border border-gray-200';
      }
    };

    return (
      <span className={`px-2 py-1 text-xs rounded-full ${getColor(status)}`}>
        {status || 'Unknown'}
      </span>
    );
  };

  // Fetch districts for filter dropdown
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await Axios.get('?action=get_master_data&type=districts').catch(() => null);
        if (response?.data?.success) {
          setDistricts(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching districts:', error);
      }
    };
    fetchDistricts();
  }, []);

  // Get retailers
  const getRetailerById = async (partyID) => {
    if (!partyID) {
      return;
    }
    setLoadingRetailers(true);
    try {
      const res = await Axios.get(`?action=get_Retailers&PartyID=${partyID}`);
      console.log("loaded retailers", res?.data?.retailers);
      setRetailers(res?.data?.retailers || []);
    } catch (error) {
      console.error("Error loading retailers:", error);
      setRetailers([]);
    } finally {
      setLoadingRetailers(false);
    }
  };

  // Fetch data with filters
  const fetchData = async (page, search = '', status = '', district = '') => {
    setIsLoading(true);
    try {
      let url = `?action=get_parties&page=${page}&limit=${rowsPerPage}`;
      
      if (search) url += `&search=${encodeURIComponent(search)}`;
      if (status) url += `&status=${encodeURIComponent(status)}`;
      if (district) url += `&district_id=${encodeURIComponent(district)}`;
      
      const response = await Axios.get(url);
      
      if (response.data.success) {
        const data = response.data.data;
        const pagination = response.data.pagination;
        const summaryData = response.data.summary;
        
        setAllData(data);
        setFilteredData(data);
        setTotalPages(pagination.total_pages);
        setTotalItems(pagination.total);
        setSummary(summaryData);
        
        return data;
      } else {
        console.error('API Error:', response.data.error);
        return [];
      }
    } catch (error) {
      console.error('Fetch error:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    fetchData(1);
  }, []);

  // Handle search with debouncing
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchData(1, searchTerm, statusFilter, districtFilter);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, statusFilter, districtFilter]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchData(pageNumber, searchTerm, statusFilter, districtFilter);
  };

  // Format currency
  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return '0.00';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Pagination numbers
  const getPaginationNumbers = () => {
    const numbers = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      numbers.push(i);
    }

    return numbers;
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Smart Retailer Modal Component
  const RetailerViewModal = ({ isOpen, onClose, partyId, partyData }) => {
    const [activeTab, setActiveTab] = useState('list');
    const [newRetailerCode, setNewRetailerCode] = useState('');

    // Generate retailer code based on party code
    useEffect(() => {
      if (partyData?.PartyCode && isOpen) {
        // Generate format: PartyCode-R-001
        const lastRetailer = retailers[retailers.length - 1];
        let lastNumber = 1;
        if (lastRetailer?.RetailerCode) {
          const match = lastRetailer.RetailerCode.match(/-(\d+)$/);
          if (match) {
            lastNumber = parseInt(match[1]) + 1;
          }
        }
        const formattedNumber = String(lastNumber).padStart(3, '0');
        setNewRetailerCode(`${partyData.PartyCode}-R-${formattedNumber}`);
      }
    }, [partyData, retailers, isOpen]);

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Retailer Management</h2>
              <div className="flex items-center gap-4 mt-2">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Party:</span> {partyData?.PartyName}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Code:</span> {partyData?.PartyCode}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-colors"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('list')}
              className={`px-6 py-3 font-medium text-sm transition-colors ${activeTab === 'list'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
            >
              <FaEye className="inline mr-2" />
              View Retailers ({retailers.length})
            </button>
            <button
              onClick={() => setActiveTab('add')}
              className={`px-6 py-3 font-medium text-sm transition-colors ${activeTab === 'add'
                ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
            >
              <FaPlus className="inline mr-2" />
              Add New Retailer
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-6">
            {activeTab === 'list' ? (
              // Retailer List View
              loadingRetailers ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                  <p className="ml-3 text-gray-600">Loading retailers...</p>
                </div>
              ) : retailers.length === 0 ? (
                <div className="text-center py-16">
                  <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <FaFileAlt className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Retailers Found</h3>
                  <p className="text-gray-500 mb-6">This party doesn't have any retailers yet.</p>
                  <button
                    onClick={() => setActiveTab('add')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FaPlus className="inline mr-2" />
                    Add First Retailer
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {retailers.map((retailer) => (
                    <div
                      key={retailer.RetailerID}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="text-sm font-medium text-blue-600 mb-1">{retailer.RetailerCode}</div>
                          <h4 className="font-semibold text-gray-800">{retailer.RetailerName}</h4>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${retailer.status
                            ? 'bg-green-100 text-green-800 border border-green-200'
                            : 'bg-red-100 text-red-800 border border-red-200'
                          }`}>
                          {retailer.status ? 'Active' : 'Inactive'}
                        </span>
                      </div>

                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <span className="font-medium w-24">Contact:</span>
                          <span>{retailer.ContactPersonName}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium w-24">Designation:</span>
                          <span>{retailer.Designation || 'N/A'}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium w-24">Phone:</span>
                          <a href={`tel:${retailer.ContactPhone1}`} className="text-blue-600 hover:underline">
                            {retailer.ContactPhone1}
                          </a>
                        </div>
                        <div className="flex items-start">
                          <span className="font-medium w-24 mt-1">Address:</span>
                          <span className="flex-1">{retailer.Address || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              // Add Retailer Form
              <div className="max-w-2xl mx-auto">
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-medium text-blue-800 mb-2">Retailer ID Generation</h3>
                  <div className="flex items-center gap-3">
                    <div className="bg-white px-3 py-2 rounded border border-blue-300 font-mono">
                      {newRetailerCode}
                    </div>
                    <button
                      onClick={() => {
                        // Generate new code
                        const lastNumber = parseInt(newRetailerCode.match(/-(\d+)$/)?.[1] || '0');
                        setNewRetailerCode(`${partyData?.PartyCode}-R-${String(lastNumber + 1).padStart(3, '0')}`);
                      }}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Generate New
                    </button>
                  </div>
                </div>

                <RetailerModalForm
                  partyID={partyId}
                  setAllRetailers={setRetailers}
                  setRefreshKey={setRefreshKey}
                  UserID={session?.user?.id}
                  open={areaModalOpen}
                  setOpen={setAreaModalOpen}
                  retailerCode={newRetailerCode}
                  onSuccess={() => {
                    setActiveTab('list');
                    getRetailerById(partyId);
                  }}
                />
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t p-4 bg-gray-50 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {activeTab === 'list' && (
                <>
                  Showing {retailers.length} retailer{retailers.length !== 1 ? 's' : ''}
                  {retailers.length === 0 && '. Add your first retailer above.'}
                </>
              )}
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col space-y-6 p-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Parties', value: summary.total_parties, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Active', value: summary.active_parties, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Inactive', value: summary.inactive_parties, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Pending', value: summary.pending_parties, color: 'text-yellow-600', bg: 'bg-yellow-50' },
        ].map((card, idx) => (
          <div key={idx} className={`${card.bg} p-5 rounded-xl shadow-sm border`}>
            <div className="text-sm font-medium text-gray-600 mb-1">{card.label}</div>
            <div className={`text-3xl font-bold ${card.color}`}>{card.value}</div>
          </div>
        ))}
      </div>

      {/* Filters Section */}
      <div className="bg-white p-5 rounded-xl shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, code..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          {/* District Filter */}
          <div>
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Districts</option>
              {districts.map((district, index) => (
                <option key={district.DistrictID || index} value={district.DistrictID}>
                  {district.DistrictName || `District ${district.DistrictID}`}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          <div>
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('');
                setDistrictFilter('');
              }}
              className="w-full p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors border flex items-center justify-center"
            >
              <FaTimes className="mr-2" />
              Clear Filters
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="text-sm text-gray-600 flex items-center">
          <span className="font-medium">{filteredData.length}</span>
          <span className="mx-1">of</span>
          <span className="font-medium">{totalItems}</span>
          <span className="ml-1">parties shown</span>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <tr>
                <th className="px-4 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-12">
                  SL
                </th>
                <th className="px-4 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-28">
                  Party Code
                </th>
                <th className="px-4 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-64">
                  Party Info
                </th>
                <th className="px-4 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-48">
                  Contact
                </th>
                <th className="px-4 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-40">
                  Location
                </th>
                <th className="px-4 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-72">
                  Credit Info
                </th>
                <th className="px-4 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-32">
                  Status
                </th>
                <th className="px-4 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-48">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                      <p className="mt-3 text-gray-500 font-medium">Loading parties...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <FaSearch className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {searchTerm || statusFilter || districtFilter
                          ? 'No matching parties found'
                          : 'No parties available'}
                      </h3>
                      <p className="text-gray-500 max-w-md">
                        {searchTerm || statusFilter || districtFilter
                          ? 'Try adjusting your filters or search terms.'
                          : 'Create your first party to get started.'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr key={item.PartyID} className="hover:bg-gray-50 transition-colors">
                    {/* SL */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 text-center">
                        {item.SL}
                      </div>
                    </td>

                    {/* Party Code */}
                    <td className="px-4 py-4">
                      <div className="text-sm font-semibold text-blue-700">
                        {item.PartyCode || `P-${item.PartyID}`}
                      </div>
                    </td>

                    {/* Party Info */}
                    <td className="px-4 py-4">
                      <div className="space-y-2">
                        <div className="text-sm font-semibold text-gray-900">
                          {item.PartyName}
                        </div>
                        {item.TradeLicenseNumber && (
                          <div className="text-xs text-gray-600">
                            <span className="font-medium">License:</span> {item.TradeLicenseNumber}
                          </div>
                        )}
                        <div className="text-xs text-gray-500">
                          <span className="font-medium">Created:</span> {item.CreatedAt ? new Date(item.CreatedAt).toLocaleDateString() : 'N/A'}
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-4 py-4">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-gray-900">{item.ContactName}</div>
                        <div className="text-sm text-gray-600">{item.ContactNumber}</div>
                        {item.Email && (
                          <div className="text-xs text-blue-600 truncate max-w-[180px]">
                            {item.Email}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Location */}
                    <td className="px-4 py-4">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-gray-900">
                          {item.DistrictName || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-600">{item.ThanaName || ''}</div>
                        <div className="text-xs text-gray-500">{item.DivisionName || ''}</div>
                      </div>
                    </td>

                    {/* Credit Info - More space */}
                    <td className="px-4 py-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-medium text-gray-500">Outstanding:</span>
                          <span className={`text-sm font-medium ${parseFloat(item.OutstandingAmount) > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {formatCurrency(item.OutstandingAmount)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-medium text-gray-500">Pending:</span>
                          <span className="text-sm font-medium text-amber-600">
                            {formatCurrency(item.PendingAmount)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-medium text-gray-500">Remaining:</span>
                          <span className="text-sm font-medium text-purple-600">
                            {formatCurrency(item.RemainingAmount)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-medium text-gray-500">Credit Limit:</span>
                          <span className="text-sm font-medium text-blue-600">
                            {formatCurrency(item.CreditLimit)}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Status - Compact */}
                    <td className="px-4 py-4">
                      <div className="flex flex-col items-start space-y-2">
                        <StatusBadge status={item.Status} />
                        <div className="space-y-1">
                          {item.file_info?.TradeLicenseScan?.has_file && (
                            <div className="flex items-center text-xs text-green-600">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></div>
                              Trade License
                            </div>
                          )}
                          {item.file_info?.NIDScan?.has_file && (
                            <div className="flex items-center text-xs text-green-600">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></div>
                              NID
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Actions - Symbol based */}
                    <td className="px-4 py-4">
                      <div className="space-y-3">
                        {/* Party Actions */}
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-medium text-gray-500 w-12">Party:</span>
                          <div className="flex items-center space-x-2">
                            {/* View */}
                            <Link
                              href={`/dashboard/party-management/view/${item.PartyID}`}
                              className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors border border-blue-200"
                              title="View Details"
                            >
                              <FaEye className="w-4 h-4" />
                            </Link>

                            {/* Edit */}
                            <Link
                              href={`/dashboard/party-management/edit/${item.PartyID}`}
                              className="inline-flex items-center justify-center w-8 h-8 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors border border-amber-200"
                              title="Edit"
                            >
                              <FaRegEdit className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>

                        {/* Retailer Actions */}
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-medium text-gray-500 w-12">Retailer:</span>
                          <div className="flex items-center space-x-2">
                            {/* Add Retailer */}
                            <button
                              onClick={() => {
                                setSelectedParty(item.PartyID);
                                setAreaModalOpen(true);
                              }}
                              className="inline-flex items-center justify-center w-8 h-8 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors border border-green-200"
                              title="Add Retailer"
                            >
                              <FaPlus className="w-4 h-4" />
                            </button>

                            {/* View Retailers */}
                            <button
                              onClick={() => {
                                setSelectedParty(item.PartyID);
                                setRetailerModalOpen(true);
                                getRetailerById(item.PartyID);
                              }}
                              className="inline-flex items-center justify-center w-8 h-8 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors border border-purple-200"
                              title="View Retailers"
                            >
                              <FaEye className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredData.length > 0 && totalPages > 1 && (
          <div className="bg-white px-4 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || isLoading}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || isLoading}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(currentPage - 1) * rowsPerPage + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * rowsPerPage, totalItems)}
                  </span>{' '}
                  of <span className="font-medium">{totalItems}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1 || isLoading}
                    className="relative inline-flex items-center px-3 py-2 rounded-l-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Previous</span>
                    &laquo;
                  </button>

                  {getPaginationNumbers().map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      disabled={isLoading}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === page
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || isLoading}
                    className="relative inline-flex items-center px-3 py-2 rounded-r-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Next</span>
                    &raquo;
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Area Modal */}
      {areaModalOpen && (
        <RetailerModalForm
          partyID={selectedParty}
          setAllRetailers={setRetailers}
          setRefreshKey={setRefreshKey}
          UserID={session?.user?.id}
          open={areaModalOpen}
          setOpen={setAreaModalOpen}
          retailerCode={`${filteredData.find(p => p.PartyID === selectedParty)?.PartyCode || 'P'}-R-001`}
        />
      )}

     {/* Retailer Modal */}
      {retailerModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Retailers</h3>
                {/* <p className="mt-1 text-sm text-gray-500">
                  Party: {selectedParty?.PartyName} ({selectedParty?.PartyCode})
                </p> */}
              </div>
              <button onClick={() => setRetailerModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {loadingRetailers ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <p className="ml-3 text-gray-500">Loading retailers...</p>
              </div>
            ) : retailers.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No retailers found for this party.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Code</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Retailer Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Contact Person</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Designation</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Phone</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Address</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {retailers.map((retailer) => (
                      <tr key={retailer.RetailerID} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {retailer.RetailerCode}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {retailer.RetailerName}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {retailer.ContactPersonName}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {retailer.Designation || 'N/A'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {retailer.ContactPhone1}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                          {retailer.Address}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            retailer.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {retailer.status ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default PartyManagement;

