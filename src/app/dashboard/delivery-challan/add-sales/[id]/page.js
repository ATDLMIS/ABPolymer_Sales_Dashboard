'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'; // Import useSession
import convertDateFormat from '@/utils/convertDateFormat';
import getCurrentDate from '@/utils/getCurrentDate';
import { FiSearch, FiSave, FiChevronLeft } from 'react-icons/fi';
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const Page = ({ params }) => {
  const { data: session, status } = useSession(); // Get session data
  const [formData, setFormData] = useState({
    ChallanNo: '',
    ChallanDate: getCurrentDate(),
    SalesOrderNo: '',
    SalesOrderID: '',
    UserID: '', // Initialize as empty, will be set from session.user.id
    Details: [],
  });
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const getChalanNumber = async () => {
    try {
      const res = await Axios.post(
        '?action=generate_new_Challan_number'
      );
      setFormData(prevData => ({
        ...prevData,
        ChallanNo: res.data.NewChallanNo,
      }));
    } catch (err) {
      setError('Failed to generate challan number');
      console.error(err);
    }
  };

  const getOrderDetails = async id => {
    try {
      setLoading(true);
      const res = await Axios.get(
        `?action=get_orderforchallan&SalesOrderID=${id}`
      );
      setOrderDetails(res.data);
    } catch (err) {
      setError('Failed to load order details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      getOrderDetails(params.id);
    }
  }, [params.id]);

  useEffect(() => {
    getChalanNumber();
  }, []);

  useEffect(() => {
    if (orderDetails && status === 'authenticated' && session?.user?.id) {
      setFormData(prevData => ({
        ...prevData,
        SalesOrderNo: orderDetails.order.SalesOrderNo,
        SalesOrderID: orderDetails.order.SalesOrderID,
        UserID: session.user.id, // Use session.user.id instead of orderDetails.order.UserID
        Details: orderDetails.orderDetails.map(item => ({
          SL: item.SL,
          FinancialYear: item.FinancialYear,
          FinancialYearID: item.FinancialYearID,
          ProductCategoryID: item.ProductCategoryID,
          CategoryName: item.CategoryName,
          ProductID: item.ProductID,
          ProductName: item.ProductName,
          OrderQty: item.Quantity,
          ChallanQty: '',
          AvailQty: item.AvailableQty,
        })),
      }));
    }
  }, [orderDetails, session, status]);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate all ChallanQty inputs
      const hasEmptyChallanQty = formData.Details.some(
        item => !item.ChallanQty || item.ChallanQty < 0
      );
      if (hasEmptyChallanQty) {
        alert('Please enter valid quantities for all items');
        setIsSubmitting(false);
        return;
      }

      const dataWillbeSubmitted = {
        ChallanNo: formData.ChallanNo,
        ChallanDate: formData.ChallanDate,
        SalesOrderID: formData.SalesOrderID,
        UserID: formData.UserID,
        Details: formData.Details.map(item => ({
          FinancialYearID: item.FinancialYearID,
          FinancialYear: item.FinancialYear,
          ProductCategoryID: item.ProductCategoryID,
          ProductID: item.ProductID,
          OrderQty: item.OrderQty,
          ChallanQty: Number(item.ChallanQty),
          AvailQty: item.AvailQty,
        })),
      };

      const res = await Axios.post(
        '?action=Create_DeliveryChallanAll',
        dataWillbeSubmitted
      );

      if (res.data.success) {
        router.push('/dashboard/delivery-challan');
      } else {
        throw new Error(res.data.message || 'Failed to save challan');
      }
    } catch (err) {
      setError(err.message || 'Failed to save challan');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChallanQtyChange = (e, item) => {
    const value = e.target.value;
    const availQty = Number(item.AvailQty);
    const orderQty = Number(item.OrderQty);

    // Validate the input
    if (
      value === '' ||
      (Number(value) >= 0 && Number(value) <= Math.min(availQty, orderQty))
    ) {
      setFormData(prevData => ({
        ...prevData,
        Details: prevData.Details.map(detail => {
          if (detail.SL === item.SL) {
            return {
              ...detail,
              ChallanQty: value,
            };
          }
          return detail;
        }),
      }));
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary1"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Please log in to access this page
          <button
            onClick={() => router.push('/api/auth/signin')}
            className="mt-2 bg-red-500 text-white px-3 py-1 rounded block w-full"
          >
            Log In
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary1"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
          <button
            onClick={() => router.back()}
            className="mt-2 bg-red-500 text-white px-3 py-1 rounded block w-full"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header with back button and title */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.back()}
          className="mr-4 p-2 rounded-full hover:bg-gray-100"
        >
          <FiChevronLeft className="text-2xl" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Add Delivery Challan</h1>
      </div>

      {/* Search bar - moved to top right */}
      <div className="flex justify-end mb-6">
        <div className="relative w-full max-w-md">
          <input
            name="search"
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary1 focus:border-transparent"
          />
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* Form container */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          {/* Basic info cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Challan No
              </label>
              <div className="text-lg font-semibold">{formData.ChallanNo}</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Challan Date
              </label>
              <div className="text-lg font-semibold">
                {convertDateFormat(formData.ChallanDate)}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Sales Order No
              </label>
              <div className="text-lg font-semibold">{formData.SalesOrderNo}</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Party Name
              </label>
              <div className="text-lg font-semibold">
                {orderDetails?.order?.PartyName || 'N/A'}
              </div>
            </div>
          </div>

          {/* Products table */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Product Details</h2>

            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden shadow-sm sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          FY
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Group
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Product
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Ordered
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Challan Qty
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Available
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {formData.Details.length > 0 ? (
                        formData.Details.map(item => (
                          <tr key={item.SL} className="hover:bg-gray-50">
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.FinancialYear}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {item.CategoryName}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {item.ProductName}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                              {item.OrderQty}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              <input
                                type="number"
                                min="0"
                                max={Math.min(item.AvailQty, item.OrderQty)}
                                className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-primary1 focus:border-primary1 text-right"
                                value={item.ChallanQty}
                                onChange={e => handleChallanQtyChange(e, item)}
                                required
                              />
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                              {item.AvailQty}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="6"
                            className="px-4 py-4 text-center text-gray-500"
                          >
                            No products found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-primary1 hover:bg-primary1-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary1 flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <FiSave className="mr-2" />
                  Save Challan
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;