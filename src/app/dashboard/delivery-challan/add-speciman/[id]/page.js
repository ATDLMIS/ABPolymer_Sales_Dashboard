'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import getCurrentDate from '@/utils/getCurrentDate';
import convertDateFormat from '@/utils/convertDateFormat';
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const Page = ({params}) => {
  const [formData, setFormData] = useState({
    ChallanNo: '',
    ChallanDate: getCurrentDate(),
    SalesOrderNo: '',
    SalesOrderID: '',
    UserID: '',
    SpecimenUserName: '',
    Details: [],
  });
  const [orderDetails, setOrderDetails] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

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
      console.error('Failed to fetch challan number:', err);
      setError('Failed to generate challan number. Please try again.');
    }
  };

  const getOrderDetails = async id => {
    try {
      setOrderDetails(null);
      const res = await Axios.get(
        `?action=get_orderforchallan&SalesOrderID=${id}`
      );
      setOrderDetails(res.data);
    } catch (err) {
      console.error('Failed to fetch order details:', err);
      setError('Failed to load order details. Please try again.');
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
    if (orderDetails) {
      setFormData(prevData => ({
        ...prevData,
        SalesOrderNo: orderDetails.order.SalesOrderNo,
        SalesOrderID: orderDetails.order.SalesOrderID,
        UserID: orderDetails.order.UserID,
        SpecimenUserName: orderDetails.order.SpecimenUserName,
        Details: orderDetails.orderDetails.map(item => ({
          SL: item.SL,
          FinancialYearID: item.FinancialYearID,
          FinancialYear: item.FinancialYear,
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
  }, [orderDetails]);

  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // Validate form data
      const invalidItems = formData.Details.filter(
        item => item.ChallanQty === '' || 
               isNaN(item.ChallanQty) || 
               Number(item.ChallanQty) < 0 ||
               Number(item.ChallanQty) > Number(item.AvailQty)
      );
      
      if (invalidItems.length > 0) {
        setError('Please enter valid quantities for all items (must be greater than 0 and not exceed available quantity)');
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
        setError(res.data.message || 'Failed to create delivery challan');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError('Failed to submit. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuantityChange = (e, itemSL) => {
    const value = e.target.value;
    if (value === '' || (!isNaN(value) && Number(value) >= 0)) {
      setFormData(prevData => ({
        ...prevData,
        Details: prevData.Details.map(detail => {
          if (detail.SL === itemSL) {
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

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h1 className="text-xl sm:text-2xl font-semibold capitalize">Add Delivery Challan</h1>
        <div className="w-full sm:w-auto">
          <input
            name="search"
            type="text"
            placeholder="Search..."
            className="text-sm sm:text-md border border-gray-300 rounded-md px-3 py-2 w-full sm:w-64 focus:outline-none focus:ring-1 focus:ring-primary1"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
          <p>{error}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Challan No:</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                value={formData.ChallanNo}
                readOnly
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Challan Date:</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                value={convertDateFormat(formData.ChallanDate)}
                readOnly
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Sales Order No:</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                value={formData.SalesOrderNo}
                readOnly
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Specimen User Name:</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                value={formData.SpecimenUserName}
                readOnly
              />
            </div>
          </div>

          {/* Product Details Table */}
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-3">Product Details</h2>
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden shadow-sm sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          FY
                        </th>
                        <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Group
                        </th>
                        <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ordered
                        </th>
                        <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Challan Qty
                        </th>
                        <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Available
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {formData.Details.length ? (
                        formData.Details.map(item => (
                          <tr key={item.SL} className="hover:bg-gray-50">
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.FinancialYear}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.CategoryName}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.ProductName}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.OrderQty}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm">
                              <input
                                type="number"
                                min="0"
                                max={item.AvailQty}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                value={item.ChallanQty}
                                onChange={(e) => handleQuantityChange(e, item.SL)}
                                required
                              />
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.AvailQty}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="px-3 py-4 text-center text-sm text-gray-500">
                            {orderDetails ? 'No products found' : 'Loading...'}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.push('/dashboard/delivery-challan')}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary1 hover:bg-primary1-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary1"
              disabled={isSubmitting || formData.Details.length === 0}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : 'Save Challan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;