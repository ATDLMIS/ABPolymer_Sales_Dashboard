"use client";
import StockReport from '@/components/stock-report/StockReport';
import Axios from '@/utils/axios';
import useGetData from '@/utils/useGetData';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarDays } from 'lucide-react';
export default function MISReportingDashboard() {
  const [reportType, setReportType] = useState('stock-register');
  const today = new Date();
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);
  const [product, setProduct] = useState(["Selelect Product"]);
  const [productName, setProductName] = useState([]);
 const [show, setShow] = useState(false);
 const[categoryID, setCategoryID] = useState('');
 const[productID, setProductID] = useState('');
 const inputClasses =
    'w-[130px] pl-5 py-2 border border-[#FF6F0B] rounded-md text-gray-700 focus:ring-2 focus:ring-[#FF6F0B] focus:border-[#FF6F0B] outline-none transition-all cursor-pointer hover:border-[#FF6F0B]';

  const { data: productCategorys } = useGetData(
    '?action=get_bookscategorys'
  );
   const getProductNameById = async () => {
    const res = await Axios.get(
      `?action=get_productcategorywise&Categoryid=${categoryID}`
    );
    setProduct(res.data);
  };

  useEffect(() => {
    if (categoryID) {
      getProductNameById();
    }
  }, [categoryID]);
const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.');
  };
  const handleShowReport =  () => {
    setShow(true);
  };

  const getParametersTitle = () => {
    if (reportType === 'stock-register') return 'Stock Register';
    if (reportType === 'stock-statement') return 'Stock Statement ';
    if (reportType === 'stock-statement-summary') return 'Stock Statement Summary';
    return 'Parameters';
  };

  return (
  <>
  {
    !show?(  <div className="min-h-screen bg-gray-50 p-8">
      <style>{`
        /* Custom styles for radio buttons */
        input[type="radio"]:checked {
          background-color: #FF6F0B;!important
          border-color: #FF6F0B;
        }
        
        input[type="radio"]:focus {
        background-color: #FF6F0B;!important
          outline: none;
          box-shadow: 0 0 0 3px rgba(255, 111, 11, 0.3);
        }
        
        /* Custom styles for date inputs */
        input[type="date"]:focus {
          outline: none;
          border-color: #FF6F0B !important;
          box-shadow: 0 0 0 3px rgba(255, 111, 11, 0.2);
        }
        
        /* Custom styles for select dropdowns */
        select:focus {
          outline: none;
          border-color: #FF6F0B !important;
          box-shadow: 0 0 0 3px rgba(255, 111, 11, 0.2);
        }
        
     
      `}</style>
      
      <div className="max-w-7xl mx-auto">
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">Stock Report</h2>
          
          <div className="bg-gray-50 rounded-lg border border-gray-300 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Select Report Type</h3>
            
            <div className="space-y-3">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="radio"
                  name="reportType"
                  value="stock-register"
                  checked={reportType === 'stock-register'}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-5 h-5 cursor-pointer "
                />
                <span className="ml-3 text-gray-800 text-lg ">Stock Register</span>
              </label>
              
              <label className="flex items-center cursor-pointer group">
                <input
                  type="radio"
                  name="reportType"
                  value="stock-statement"
                  checked={reportType === 'stock-statement'}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-5 h-5 cursor-pointer "
                />
                <span className="ml-3 text-gray-800 text-lg  ">Stock Statement</span>
              </label>
              
              <label className="flex items-center cursor-pointer group">
                <input
                  type="radio"
                  name="reportType"
                  value="stock-statement-summary"
                  checked={reportType === 'stock-statement-summary'}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-5 h-5 cursor-pointer"
                />
                <span className="ml-3 text-gray-800 text-lg  ">Stock Statement Summary</span>
              </label>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg border border-gray-300 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-300">
              {getParametersTitle()}
            </h3>
            
          
              <div className="grid grid-cols-2 gap-6 mb-6">
                   <div className="relative">
        <label className="block text-gray-700 text-base font-medium mb-2">
          From Date
        </label>
        <div className="relative">
     <CalendarDays className="absolute left-3 top-3.5 text-[#FF6F0B]" size={20} />
          <DatePicker
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/mm/yyyy"
            className={inputClasses}
          />
        </div>
      </div>

      {/* To Date */}
      <div className="relative">
        <label className="block text-gray-700 text-base font-medium mb-2">
          To Date
        </label>
        <div className="relative">
        <CalendarDays className="absolute left-3 top-3.5 text-[#FF6F0B]" size={20} />

          <DatePicker
            selected={toDate}
            onChange={(date) => setToDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/mm/yyyy"
            className={inputClasses}
          />
        </div>
      </div>

      
              </div>
          
            
            {reportType === 'stock-register' && (
              <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 text-base font-medium mb-2">
                  Product Category
                </label>
                <select
                  value={categoryID}
                  onChange={(e) => setCategoryID(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md appearance-none bg-white cursor-pointer transition-all"
                >
                  <option value="">Select Product Category</option>
                  {productCategorys?.map((cat) => (
                    <option key={cat.ID} value={cat.ID}>
                      {cat.CategoryName}
                    </option>
                  ))}
                </select>
              </div>
              
              
                <div>
                  <label className="block text-gray-700 text-base font-medium mb-2">
                    Product Name
                  </label>
                  <select
                    value={productID}
                    onChange={(e) => setProductID(e.target.value)}
                    disabled={!categoryID || product.length === 0}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md appearance-none bg-white cursor-pointer transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">Select Product</option>
                    {product.map((prod) => (
                      <option key={prod.ProductID} value={prod.ProductID}>
                        {prod.ProductName}
                      </option>
                    ))}
                  </select>
                </div>
              
            </div>
            )}
            
            {(reportType === 'stock-statement' || reportType === 'stock-statement-summary') && (
              <div className="grid grid-cols-2 gap-6 mb-6">
                 <div>
                <label className="block text-gray-700 text-base font-medium mb-2">
                  Product Category
                </label>
                <select
                  value={categoryID}
                  onChange={(e) => setCategoryID(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md appearance-none bg-white cursor-pointer transition-all"
                >
                  <option value="">Select Product Category</option>
                  <option value="">All Category</option>
                  {productCategorys?.map((cat) => (
                    <option key={cat.ID} value={cat.ID}>
                      {cat.CategoryName}
                    </option>
                  ))}
                </select>
              </div>
              </div>
            )}
            
            <div>
              <button
                onClick={handleShowReport}
                className="bg-[#FF6F0B] hover:bg-[#E66309] text-white  text-sm px-3 py-2 rounded-md transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#FF6F0B] focus:ring-opacity-30"
              >
                Show Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>):(<StockReport setShow={setShow} reportType={reportType} fromDate={formatDate(fromDate)} toDate={formatDate(toDate)} productID={productID} productName={productName} categoryID={categoryID}  />)
  }
  </>
  );
}