"use client";
import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { ArrowLeft, Download, Printer } from 'lucide-react';
import useGetData from "@/utils/useGetData";
const StockReport = ({reportType,fromDate,toDate,productID,setShow,categoryID}) => {
  const reportRef = useRef();
  const url=reportType==='stock-register'?`?action=get_stock_register&fromDate=${fromDate}&toDate=${toDate}&productId=${productID}`:reportType=='stock-statement'?`?action=get_stock_statement&fromDate=${fromDate}&toDate=${toDate}&categoryId=${categoryID?categoryID:null}`:(`?action=get_stock_statement_summary&fromDate=${fromDate}&toDate=${toDate}&productId=${productID}`)
const { data: stockData } = useGetData(url);

const exportToExcel = () => {
  if (!stockData || stockData.length === 0) {
    alert("No stock data available to export!");
    return;
  }

  let worksheetData = [];

  // === CASE 1: Stock Statement or Stock Statement Summary ===
  if (reportType === "stock-statement" || reportType === "stock-statement-summary") {
    worksheetData = stockData.map((item, index) => ({
      "SL": index + 1,
      "Product Code": item.ProductCode,
      "Product Name": item.ProductName,
      "Category": item.ProductCategory,
      "Opening Balance": item.OpeningBalance,
      "Stock-In": item.in,
      "Stock-Out": item.out,
      "Closing Balance": item.closingBalances,
    }));
  } 
  // === CASE 2: Other Reports (like Stock Register, etc.) ===
  else {
    worksheetData = stockData.map((item, index) => ({
      "SL": index + 1,
      "Date": item.FormattedDate,
      "Voucher Reference": item.VoucherReference,
      "Transaction Type": item.TransactionType === "Stock-In" ? "Receipt" : "Issue",
      "Quantity": item.Quantity,
      "Rate": item.Rate,
      "Total Amount": item.TotalAmount,
      "Running Balance": item.RunningBalance,
    }));
  }

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);

  // Optional column widths for better readability
  worksheet["!cols"] = Object.keys(worksheetData[0]).map(() => ({ wch: 18 }));

  // Create workbook and append sheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    reportType === "stock-statement" || reportType === "stock-statement-summary"
      ? "Stock Statement"
      : "Stock Register"
  );

  // Create dynamic filename
  const fileName =
    (reportType === "stock-statement" || reportType === "stock-statement-summary"
      ? "Stock_Statement"
      : "Stock_Register") +
    "_" +
    new Date().toISOString().split("T")[0] +
    ".xlsx";

  // Export Excel file
  XLSX.writeFile(workbook, fileName);
};


  const handlePrint = () => {
    window.print();
  }

  return (
    <div className=" bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-xl font-semibold text-center text-gray-800 mb-4 uppercase">
          {reportType}
        </h1>

        <div className="border border-gray-300 rounded-lg p-3 mb-5 text-start text-gray-700 text-lg">
          {
            reportType==='stock-register'?(
              <>
              <p>Product Name: {stockData?.productDetails?.ProductName}</p>
              <p>From: {fromDate}</p>
              <p> To: {toDate}</p>
              <p>Opening Balance Qty: {stockData?.summary?.totalOpeningBalance}</p>
              </>
        
            ):<p>From: {fromDate} To: {toDate}</p>
          }
          
        </div>

       

        <div ref={reportRef} className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-800 text-white ">
            {reportType === "stock-register" ? (
              <tr>
                <th className="px-5 py-2 border text-xs">Date</th>
                <th className="px-3 py-2 border text-xs">Voucher Reference</th>
                <th className="px-3 py-2 border text-xs">Transactions Type</th>
                <th className="px-3 py-2 border text-xs">Quantity</th>
                <th className="px-3 py-2 border text-xs">Rate</th>
                <th className="px-3 py-2 border text-xs">Total Amount</th>
                <th className="px-3 py-2 border text-xs">Balance</th>
              </tr>
            ): (
                reportType==="stock-statement" ?(
                     <tr>
                <th className="px-5 py-2 border text-xs">Product ID</th>
                <th className="px-3 py-2 border text-xs">Product Name</th>
                <th className="px-3 py-2 border text-xs">Category</th>
                <th className="px-3 py-2 border text-xs">Opening Balance</th>
                <th className="px-3 py-2 border text-xs">Stock-In</th>
                <th className="px-3 py-2 border text-xs">Stock-Out</th>
                <th className="px-3 py-2 border text-xs">Closing Balance</th>
              </tr>
                ):(
                  <tr>
                <th className="px-3 py-2 border text-xs">Category</th>
                <th className="px-3 py-2 border text-xs">Opening Balance</th>
                <th className="px-3 py-2 border text-xs">Stock-In</th>
                <th className="px-3 py-2 border text-xs">Stock-Out</th>
                <th className="px-3 py-2 border text-xs">Closing Balance</th>
              </tr>
              
            )
            ) }

            
            </thead>
            <tbody>
              {stockData?.data?.map((item, index) => (
                <tr
                  key={index}
                  className={`text-center ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >{reportType === "stock-register" ? (
                    <>
                     <td className="border px-3 py-2">{item.FormattedDate}</td>
                  <td className="border px-3 py-2">{item.VoucherReference}</td>
                  <td className="border px-3 py-2">{item.TransactionType=="Stock-In" ? "Reecipt" : "Issue"}</td>
                  <td className="border px-3 py-2">{item.Quantity}</td>
                  <td className="border px-3 py-2">{item.Rate}</td>
                  <td className="border px-3 py-2">{item.TotalAmount}</td>
                  <td className="border px-3 py-2">{item.RunningBalance}</td></>
                 
                ):reportType=="stock-statement"?(
                   <>
                     <td className="border px-3 py-2">{item.ProductCode}</td>
                  <td className="border px-3 py-2 text-left">{item.ProductName}</td>
                  <td className="border px-3 py-2">{item.CategoryName}</td>
                  <td className="border px-3 py-2">{item.OpeningBalance}</td>
                   <td className="border px-3 py-2 ">
                    {item.ClosingBalance}
                  </td>
                  <td className="border px-3 py-2">{item.StockIn}</td>
                  <td className="border px-3 py-2">{item.StockOut}</td>
                    </>
                ):(   <>
                     <td className="border px-3 py-2">{item.ProductCode}</td>
                     <td className="border px-3 py-2">{item.CategoryName}</td>
                  <td className="border px-3 py-2">{item.OpeningBalance}</td>
                   <td className="border px-3 py-2 ">
                    {item.ClosingBalance}
                  </td>
                 <td className="border px-3 py-2">{item.StockIn}</td>
                  <td className="border px-3 py-2">{item.StockOut}</td>
                    </>)}
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
         <div className="flex gap-3 print:hidden justify-end mt-10">
              <button
                onClick={exportToExcel}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <Download size={18} />
                Export to Excel
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Printer size={18} />
                Print
              </button>
              <button
                onClick={() => setShow(false)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
               <ArrowLeft size={18} />
                Back to Page
              </button>
            </div>
      </div>
     
         
    </div>
  );
};

export default StockReport;
