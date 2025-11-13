'use client';
import { useEffect } from 'react';
import useGetData from '@/utils/useGetData';
import { Loader2, Package, Tag, Ruler, DollarSign, Layers, Palette, Scale, Box } from 'lucide-react';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const BookManagementView = ({ id }) => {
  const { status, data } = useGetData(`?action=get_product&ProductID=${id}`);

  if (status === 'pending') {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <span className="ml-2 text-gray-600 text-lg">Loading product details...</span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p className="text-gray-500 text-lg">No product data found.</p>
      </div>
    );
  }

  const infoItems = [
    { label: 'Product Code', value: data.ProductCode, icon: <Package className="text-blue-500" /> },
    { label: 'Product Name', value: data.ProductName, icon: <Tag className="text-green-500" /> },
    { label: 'Category', value: data.Category, icon: <Layers className="text-indigo-500" /> },
    { label: 'Price', value: data.Price, icon: <DollarSign className="text-yellow-500" /> },
    { label: 'Trade Price', value: data.TradePrice, icon: <DollarSign className="text-orange-500" /> },
    { label: 'Outer Diameter', value: data.OuterDiameter, icon: <Ruler className="text-blue-400" /> },
    { label: 'Thickness', value: data.Thikness, icon: <Ruler className="text-blue-400" /> },
    { label: 'Length', value: data.Length, icon: <Box className="text-purple-500" /> },
    { label: 'Color', value: data.Color, icon: <Palette className="text-pink-500" /> },
    { label: 'Weight', value: data.Weight, icon: <Scale className="text-gray-600" /> },
  ];

  return (
    <div className="flex justify-center py-10 bg-gray-100 min-h-screen">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-lg p-8 transition-all hover:shadow-xl">
        <h1 className="text-center text-2xl font-semibold mb-6 text-gray-800 border-b pb-3">
          Product Details
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {infoItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-blue-50 transition"
            >
              <div className="flex-shrink-0">{item.icon}</div>
              <div>
                <p className="text-sm text-gray-500">{item.label}</p>
                <p className="text-base font-medium text-gray-800">{item.value || '—'}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => window.history.back()}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookManagementView;
