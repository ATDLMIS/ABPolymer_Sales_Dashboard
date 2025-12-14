'use client';
import { useState, useEffect, use } from 'react';
import useGetData from '@/utils/useGetData';
import 'react-datepicker/dist/react-datepicker.css';
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineCloseCircle, AiOutlinePlus, AiOutlineSearch, AiOutlineBars } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import Axios from '@/utils/axios';
import FormInput from '../fromField/FormInput';
import FormSelect from '../fromField/FormSelect';
import FormDatePicker from '../fromField/FormDatePicker';
import ProductById from './BookById';
import { calculateDiscount } from '@/utils/calculateDiscount';
import RetailerById from './RetailerById';
import RetailerModalForm from '../modal/RetailerModalForm';
import formatAmountWithCommas from '@/utils/formatAmountWithCommas';


const SalesOrderForm = ({ session }) => {
  const [CategoryId, setCategoryId] = useState('');
  const [open, setOpen] = useState(false);
  const [allRetailers, setAllRetailers] = useState([]);
  const[partyDetails,setPartyDetails]=useState({});
   const [refreshKey, setRefreshKey] = useState(0);
   const [retailerName, setRetailerName] = useState('N/A');
   const [retailerId, setRetailerId] = useState(null);
   const [validationError, setValidationError] = useState('');
     const router = useRouter();
  const [formData, setFormData] = useState({
    SalesOrderNo: '',
    OrderDate: new Date().toISOString().split('T')[0],
    PartyID: '',
    OutletID: '', // Selected retailer ID in header
    TotalAmount: '',
    DiscountPercentage: 0,
    DiscountAmount: 0,
    FinalAmount: 0,
    UserID: session.user.id,
    SpecimenUserID: null,
    orderDetails: [
      {
        id: uuidv4(),
        ProductCategoryID: '',
        ProductID: '',
        RetailerID: '', // Will be set when user selects retailer
        Quantity: '',
        Price: '',
        TotalPrice: 0,
      },
    ],
  });
  const [loading, setLoading] = useState(false);

  // Remove all automatic retailer assignment
  // Rows will ONLY get RetailerID when they are created with "Add Product" button

  // Calculate totals and discount whenever order details change
  useEffect(() => {
    const total = formData.orderDetails.reduce(
      (sum, item) => sum + (item.TotalPrice || 0),
      0
    );

    // Calculate discount based on total
    const discountResult = calculateDiscount(total);

    setFormData(prevState => ({
      ...prevState,
      TotalAmount: total,
      DiscountPercentage: discountResult.discountPercentage,
      DiscountAmount: discountResult.discountAmount,
      FinalAmount: discountResult.finalAmount,
    }));
  }, [formData.orderDetails]);

  const allParties = useGetData(
    `?action=get_parties_users&UserID=${session.user.id}`
  );
  const bookGroups = useGetData(
    '?action=get_bookscategorys'
  );

  const getOrderId = async () => {
    const res = await Axios.post(
      '?action=generate_new_salesorder_number'
    );
    setFormData({
      ...formData,
      SalesOrderNo: res.data.NewSalesOrderNo,
    });
  };

  const [books, setBooks] = useState([]);
  const getBooksByCategoryId = async () => {
    const res = await Axios.get(
      `?action=get_productcategorywise&Categoryid=${CategoryId}`
    );
    setBooks([...res.data]);
  };

  useEffect(() => {
    getBooksByCategoryId();
  }, [CategoryId]);

  const getPrice = async (item, { name, value }) => {
    try {
      const res = await Axios.get(
        `?action=get_productrate&FinancialYearID=${session?.user?.financialYearId}&ProductID=${value}`
      );

      setFormData({
        ...formData,
        orderDetails: formData.orderDetails.map(detail =>
          detail.id === item.id
            ? {
                ...detail,
                [name]: value,
                Price: res.data.Rate ? res.data.Rate : '',
                TotalPrice: Number(detail.Quantity || 0) * Number(res.data.Rate || 0),
              }
            : detail
        ),
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrderId();
  }, []);

  const updateOrderDetails = (event, itemId) => {
    setFormData({
      ...formData,
      orderDetails: formData.orderDetails.map(detail =>
        detail.id === itemId
          ? { ...detail, [event.target.name]: event.target.value }
          : detail
      ),
    });
  };

  const updateOrderDetailBook = (event, item) => {
    const value = event.target.value;
    const name = event.target.name;

    if (value) {
      getPrice(item, { name, value });
    }
  };
const getRetailerName = (retailerId) => {
    if (!retailerId) return 'N/A';
    if (!allRetailers || allRetailers.length === 0) return 'No retailers loaded';
    
    // Try multiple field name combinations
    const retailer = allRetailers.find(r => 
      String(r.RetailerID) === String(retailerId) || 
      String(r.ID) === String(retailerId) || 
      String(r.OutletID) === String(retailerId) ||
      String(r.id) === String(retailerId)
    );
    
    console.log('Found Retailer:', retailer);
    
    if (retailer) {
      setRetailerId(retailerId);
      setRetailerName(retailer.RetailerName);

      return retailer.RetailerName || retailer.Name || retailer.name || retailer.OutletName || 'Unknown';
    }
    
    return `ID: ${retailerId}`;
  };
useEffect(() => {
   getRetailerName(formData.OutletID);
},[formData.OutletID]);
  // Get party details with type conversion
  const getPartyDetails = async() => {
    if (!formData.PartyID ) return null;
    else{
      const res= await Axios.get(
        `?action=get_party&PartyID=${formData.PartyID}`
      );
      const party = res.data;
      setPartyDetails(party);
      return party;
    }
  };
useEffect(() => {
  getPartyDetails();
}, [formData.PartyID]);
  // Get selected retailer details
  const getSelectedRetailerDetails = () => {
    if (!formData.OutletID || !allRetailers || allRetailers.length === 0) return null;
    
    const retailer = allRetailers.find(r => 
      String(r.RetailerID) === String(formData.OutletID) || 
      String(r.ID) === String(formData.OutletID) ||
      String(r.OutletID) === String(formData.OutletID) ||
      String(r.id) === String(formData.OutletID)
    );
    
    return retailer;
  };

  const retailerDetails = getSelectedRetailerDetails();

  // Validation function
  const validateOrderDetails = () => {
    // Check if there are no order details
    if (formData.orderDetails.length === 0) {
      setValidationError('Please add at least one product to the order.');
      return false;
    }

    // Check each order detail
    for (let i = 0; i < formData.orderDetails.length; i++) {
      const detail = formData.orderDetails[i];
      
      if (!detail.ProductCategoryID || detail.ProductCategoryID === '') {
        setValidationError(`Row ${i + 1}: Please select a Product Category.`);
        return false;
      }
      
      if (!detail.ProductID || detail.ProductID === '') {
        setValidationError(`Row ${i + 1}: Please select a Product Name.`);
        return false;
      }

      if (!detail.Quantity || Number(detail.Quantity) <= 0) {
        setValidationError(`Row ${i + 1}: Please enter a valid Quantity.`);
        return false;
      }
    }

    setValidationError('');
    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    // Validate before submitting
    if (!validateOrderDetails()) {
      return;
    }

    setLoading(true);
   const userData = {
  SalesOrderNo: formData.SalesOrderNo,
  OrderDate: formData.OrderDate,
  PartyID: Number(formData.PartyID),
  TotalAmount: Number(formData.TotalAmount),
  DiscountAmount: Number(formData.DiscountAmount),
  DiscountPercentage: Number(formData.DiscountPercentage),
  UserID: Number(formData.UserID),
  SpecimenUserID: null,
  orderDetails: formData.orderDetails.map(detail => ({
    FinancialYearID: Number(session?.user?.financialYearId),
    ProductCategoryID: Number(detail.ProductCategoryID),
    ProductID: Number(detail.ProductID),
    Quantity: Number(detail.Quantity),
    Price: Number(detail.Price),
  }))
};
    try {
      const res = await Axios.post(
        '?action=create_order',
        userData
      );
      console.log( res.data);
      router.push('/dashboard/sales-order');
    } catch (error) {
      console.error('Error creating order:', error);
      setValidationError('Error saving order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold capitalize ml-3">Add Sales Order</h1>
      </div>

      {/* Main Card */}
      <div className="w-full bg-white shadow-lg rounded-xl p-6 border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Order Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormInput
              name="SalesOrderNo"
              label="Sales Order No"
              value={formData.SalesOrderNo}
              readOnly
            />
            
            <FormDatePicker
              label="Sales Order Date"
              selected={formData.OrderDate}
              onChange={(date) => setFormData(prev => ({ ...prev, OrderDate: date }))}
              required={true}
            />

            <div>
            
                
              <FormSelect
                label="Party Name"
                id="PartyID"
                value={formData.PartyID}
                onChange={(e) => setFormData({ ...formData, PartyID: e.target.value })}
                options={allParties.data || []}
                valueKey="PartyID"
                labelKey="PartyName"
                searchable={true}
                searchKeys={['PartyName', 'PartyID', 'ID']}
                required={true}
              />
              
              
              {/* Party Details - Show below dropdown */}
              {Object.keys(partyDetails).length > 0 && (
                <div className="border rounded-lg bg-blue-50 p-3 mt-2">
                  <h4 className="text-sm font-semibold mb-2 text-primary1">Party Details</h4>
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    <div>
                      <span className="font-medium text-gray-700">Contact Person: </span>
                      <span className="text-gray-600">{partyDetails.ContactPersonName || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Address: </span>
                      <span className="text-gray-600">{partyDetails.Address || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Credit Limit: </span>
                      <span className="text-gray-600">{partyDetails.CreditLimit || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Outstanding: </span>
                      <span className="text-gray-600">{partyDetails.Outstanding || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
            
              <RetailerById
                partyID={formData.PartyID}
                setFormData={setFormData}
                fromData={formData}
                allRetailers={allRetailers}
                setAllRetailers={setAllRetailers}
                refreshTrigger={refreshKey} 
              />
                
              {/* Retailer Details - Show below dropdown */}
              {retailerDetails && (
                <div className="border rounded-lg bg-green-50 p-3 mt-2">
                  <h4 className="text-sm font-semibold mb-2 text-green-700">Retailer Details</h4>
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    <div>
                      <span className="font-medium text-gray-700">Shop Name: </span>
                      <span className="text-gray-600">{retailerDetails.ShopName || retailerDetails.OutletName || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Contact: </span>
                      <span className="text-gray-600">{retailerDetails.ContactPhone1 || retailerDetails.Phone || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Address: </span>
                      <span className="text-gray-600">{retailerDetails.Address || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">City: </span>
                      <span className="text-gray-600">{retailerDetails.City || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              )}
                  {
              open ? (
                <RetailerModalForm
                  partyID={formData.PartyID}
                  setAllRetailers={setAllRetailers}
                  setRefreshKey={setRefreshKey}
                  UserID={session.user.id}
                  open={open} 
                  setOpen={setOpen}
                />
              ) : (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="px-3 py-1 mt-3 bg-primary1 text-white rounded-md shadow hover:bg-primary1 transition"
                    onClick={() => setOpen(!open)}
                  >
                    Add Retailer
                  </button>
                </div>
              )
            }
            </div>

        
          </div>

          {/* Order Details */}
          <div className="border rounded-xl bg-gray-50  shadow-inner mt-6">

            <div className="">
              <table className="w-full text-sm ">
                <thead className="bg-primary1 text-white">
                  <tr>
                    <th className="w-[40%] px-1 py-1 text-center font-normal">Product Name</th>
                    <th className="w-[20%] px-1 py-2 text-center font-normal">Product Type</th>
                    <th className="w-[12%] px-1 py-1 text-center font-normal">Qty</th>
                    <th className="w-[6%] px-1 py-1 text-center font-normal">Price</th>
                    <th className="w-[8%] px-1 py-1 text-center font-normal">Amount</th>
                    <th className="w-[10%] px-1 py-1 text-center font-normal">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {formData.orderDetails.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100 transition">
                       {/* PRODUCT NAME (COMPONENT) */}
                      <td className="px-3 py-3">
                        <ProductById name="ProductID" item={item} update={updateOrderDetailBook} />
                      </td>
                      {/* PRODUCT CATEGORY */}
                      <td className="px-1 py-1">
                        <FormSelect
                          id="ProductCategoryID"
                          value={item.ProductCategoryID}
                          onChange={(e) => {
                            updateOrderDetails(e, item.id);
                            setCategoryId(e.target.value);
                          }}
                          options={bookGroups.data || []}
                          valueKey="ID"
                          labelKey="CategoryName"
                          placeholder='Category'
                          searchKeys={['CategoryName']}
                          
                        />
                      </td>

                     

                      {/* QTY */}
                      <td className="px-1 py-2 text-center">
                        <FormInput
                        px='px-4'
                        py="py-1.6"
                          value={item.Quantity}
                          name="Quantity"
                          placeholder='Qty'
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              orderDetails: formData.orderDetails.map((detail) =>
                                detail.id === item.id
                                  ? {
                                      ...detail,
                                      Quantity: e.target.value,
                                      TotalPrice: Number(e.target.value) * Number(detail.Price || 0),
                                    }
                                  : detail
                              ),
                            })
                          }
                        />

                      </td>

                      {/* PRICE */}
                      <td className="px-1 py-1 text-center">
                        <span className="font-semibold">{item.Price ? item.Price : "-"}</span>
                      </td>

                      {/* TOTAL */}
                      <td className="px-1 py-1 text-center font-semibold text-green-600">
                        {item.TotalPrice || 0}
                      </td>

                      {/* REMOVE ROW */}
                      <td className="px-7 py-1   text-center flex justify-center items-center gap-2">
                        <AiOutlineCloseCircle
                          className="text-2xl mt-6 text-red-500 cursor-pointer hover:scale-110 transition mx-auto"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              orderDetails: formData.orderDetails.filter(
                                (d) => d.id !== item.id
                              ),
                            })
                          }
                        />
                        
                        <AiOutlinePlus 
                           className="text-xl mt-6 text-white bg-green-500 rounded-full cursor-pointer hover:scale-110 transition mx-auto"
                          onClick={() =>
                          setFormData({
                            ...formData,
                            orderDetails: [
                              ...formData.orderDetails,
                              {
                                id: uuidv4(),
                                FinancialYearID:session?.user?.financialYearId,
                                ProductCategoryID: "",
                                ProductID: "",
                                RetailerID: formData.OutletID || "", // Capture current OutletID
                                Quantity: "",
                                Price: "",
                                TotalPrice: 0,
                              },
                            ],
                          })
                        }
                        />
                      </td>
                    </tr>
                  ))}

                  {/* DISCOUNT AND TOTAL ROWS */}
                  <tr className="bg-gray-100 font-semibold">
                    <td colSpan={5} className="px-4 py-3 text-right">
                      Sub Total:
                    </td>
                    <td className="px-4 py-3 text-center" colSpan={2}>
                      {formatAmountWithCommas(formData.TotalAmount) || '0.00'}
                    </td>
                  </tr>
                  
                  <tr className="bg-blue-50 font-semibold">
                    <td colSpan={5} className="px-4 py-3 text-right">
                      Discount ({formData.DiscountPercentage}%):
                    </td>
                    <td className="px-4 py-3 text-center text-green-700" colSpan={2}>
                       {formatAmountWithCommas(formData.DiscountAmount) || '0.00'}
                    </td>
                  </tr>
                  
                  <tr className="bg-green-50 font-semibold border-t-2 border-gray-300">
                    <td colSpan={5} className="px-4 py-3 text-right text-lg">
                      Final Amount:
                    </td>
                    <td className="px-4 py-3 text-center text-lg text-green-700" colSpan={2}>
                      {formatAmountWithCommas(formData.FinalAmount) || '0.00'}
                    </td>
                  </tr>

                  {/* ADD ROW */}
                  {/* <tr>
                    <td colSpan={7} className="py-4 text-right">
                      <button
                        type="button"
                        className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            orderDetails: [
                              ...formData.orderDetails,
                              {
                                id: uuidv4(),
                                FinancialYearID:session?.user?.financialYearId,
                                ProductCategoryID: "",
                                ProductID: "",
                                RetailerID: formData.OutletID || "", // Capture current OutletID
                                Quantity: "",
                                Price: "",
                                TotalPrice: 0,
                              },
                            ],
                          })
                        }
                      >
                        <AiOutlinePlus className="inline mr-1" />
                        Add Product
                      </button>
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>

            {/* Validation Error Message - Below Table */}
            {validationError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
                <strong className="font-bold">Validation Error: </strong>
                <span className="block sm:inline">{validationError}</span>
                <button
                  type="button"
                  className="absolute top-0 bottom-0 right-0 px-4 py-3"
                  onClick={() => setValidationError('')}
                >
                  <AiOutlineCloseCircle className="text-xl" />
                </button>
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-end mt-4">
            <button 
              type="submit"
              disabled={loading}
              className="bg-primary1 text-white px-6 py-2 rounded-lg text-base shadow hover:bg-primary2 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Save Order'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SalesOrderForm;