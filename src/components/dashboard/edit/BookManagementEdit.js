'use client';
import useGetData from '@/utils/useGetData';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Axios from '@/utils/axios';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const UpdateProduct = ({id}) => {
  const productId = id;
  const router = useRouter();
  const categoryUrl = '?action=get_bookscategorys';

  const { status: categoryStatus, data: categories } = useGetData(categoryUrl);

  const [formData, setFormData] = useState({
    category: '',
    bookTitle: '',
    ProductCode: '',
    OuterDiameter: '',
    Thickness: '',
    Length: '',
    Color: '',
    Weight: '',
    MRP: '',
    TP: '',
  });
console.log(formData);
  const [loading, setLoading] = useState(true);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await Axios.get(`?action=get_product&ProductID=${productId}`);
        const product = res?.data;
        if (product) {
          setFormData({
            category: product.CategoryID || '',
            bookTitle: product.ProductName || '',
            ProductCode: product.ProductCode || '',
            OuterDiameter: product.OuterDiameter || '',
            Thickness: product.Thikness || '',
            Length: product.Length || '',
            Color: product.Color || '',
            Weight: product.Weight || '',
            MRP: product.Price || '',
            TP: product.TradePrice || '',
          });
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        alert('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };

    if (productId) fetchProduct();
  }, [productId]);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const payload = {
        ProductID: parseInt(productId),
        ProductName: formData.bookTitle,
        CategoryID: parseInt(formData.category),
        Price: parseFloat(formData.MRP) || 0,
        ProductCode: formData.ProductCode,
        OuterDiameter: formData.OuterDiameter,
        Thikness: formData.Thickness,
        Length: formData.Length,
        Color: formData.Color,
        Weight: formData.Weight,
        TradePrice: parseFloat(formData.TP) || 0,
        Status: 1,
      };

    const res =  await Axios.put(`?action=update_product&ProductID=${productId}`, payload);
console.log(res);
      alert('Product updated successfully.');
      router.push('/dashboard/book-management');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading product details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-5 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Update Product
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Edit existing product information
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            {/* Category Selection */}
            <div className="mb-6">
              <label
                htmlFor="category"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                className="w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6F0B] focus:border-[#FF6F0B] transition-colors"
                onChange={handleChange}
                value={formData.category}
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.length &&
                  categories.map(item => (
                    <option value={item.ID} key={item.ID}>
                      {item.CategoryName}
                    </option>
                  ))}
              </select>
            </div>

            {/* Two Column Grid for Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Title */}
              <div className="md:col-span-2">
                <label
                  htmlFor="bookTitle"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Product Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="bookTitle"
                  name="bookTitle"
                  className="w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6F0B] focus:border-[#FF6F0B] transition-colors"
                  placeholder="Enter product title"
                  onChange={handleChange}
                  value={formData.bookTitle}
                  required
                />
              </div>

              {/* Product Code */}
              <div>
                <label
                  htmlFor="ProductCode"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Product Code
                </label>
                <input
                  type="text"
                  id="ProductCode"
                  name="ProductCode"
                  className="w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6F0B] focus:border-[#FF6F0B] transition-colors"
                  placeholder="e.g., PRD-001"
                  onChange={handleChange}
                  value={formData.ProductCode}
                />
              </div>

              {/* Outer Diameter */}
              <div>
                <label
                  htmlFor="OuterDiameter"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Outer Diameter
                </label>
                <input
                  type="text"
                  id="OuterDiameter"
                  name="OuterDiameter"
                  className="w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6F0B] focus:border-[#FF6F0B] transition-colors"
                  placeholder="e.g., 10mm"
                  onChange={handleChange}
                  value={formData.OuterDiameter}
                />
              </div>

              {/* Thickness */}
              <div>
                <label
                  htmlFor="Thickness"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Thickness
                </label>
                <input
                  type="text"
                  id="Thickness"
                  name="Thickness"
                  className="w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6F0B] focus:border-[#FF6F0B] transition-colors"
                  placeholder="e.g., 2mm"
                  onChange={handleChange}
                  value={formData.Thickness}
                />
              </div>

              {/* Length */}
              <div>
                <label
                  htmlFor="Length"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Length
                </label>
                <input
                  type="text"
                  id="Length"
                  name="Length"
                  className="w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6F0B] focus:border-[#FF6F0B] transition-colors"
                  placeholder="e.g., 100cm"
                  onChange={handleChange}
                  value={formData.Length}
                />
              </div>

              {/* Color */}
              <div>
                <label
                  htmlFor="Color"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Color
                </label>
                <input
                  type="text"
                  id="Color"
                  name="Color"
                  className="w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6F0B] focus:border-[#FF6F0B] transition-colors"
                  placeholder="e.g., Blue"
                  onChange={handleChange}
                  value={formData.Color}
                />
              </div>

              {/* Weight */}
              <div>
                <label
                  htmlFor="Weight"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Weight
                </label>
                <input
                  type="text"
                  id="Weight"
                  name="Weight"
                  className="w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6F0B] focus:border-[#FF6F0B] transition-colors"
                  placeholder="e.g., 500g"
                  onChange={handleChange}
                  value={formData.Weight}
                />
              </div>

              {/* MRP */}
              <div>
                <label
                  htmlFor="MRP"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  MRP
                </label>
                <input
                  type="text"
                  id="MRP"
                  name="MRP"
                  className="w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6F0B] focus:border-[#FF6F0B] transition-colors"
                  placeholder="e.g., 1000"
                  onChange={handleChange}
                  value={formData.MRP}
                />
              </div>

              {/* TP */}
              <div>
                <label
                  htmlFor="TP"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  TP (Trade Price)
                </label>
                <input
                  type="text"
                  id="TP"
                  name="TP"
                  className="w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6F0B] focus:border-[#FF6F0B] transition-colors"
                  placeholder="e.g., 800"
                  onChange={handleChange}
                  value={formData.TP}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                type="button"
                onClick={() => router.push('/dashboard/book-management')}
                className="w-full sm:w-auto px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 text-white bg-[#FF6F0B] rounded-lg font-medium hover:bg-[#E66309] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6F0B] transition-colors shadow-sm"
              >
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;


