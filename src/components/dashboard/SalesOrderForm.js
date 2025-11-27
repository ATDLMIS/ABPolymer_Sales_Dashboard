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


const SalesOrderForm = ({ session }) => {
  const [CategoryId, setCategoryId] = useState('');
  const [open, setOpen] = useState(false);
  const [allRetailers, setAllRetailers] = useState([]);
  const[partyDetails,setPartyDetails]=useState({});
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

  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    // setLoading(true);
    const userData={
      SalesOrderNo: formData.SalesOrderNo,
      OrderDate: formData.OrderDate,
      PartyID: formData.PartyID,
      TotalAmount: formData.TotalAmount,
      UserID: formData.UserID,
      SpecimenUserID: null,
     orderDetails:[ formData.orderDetails.map(detail => {
      return {
        FinancialYearID:session?.user?.financialYearId,
        ProductCategoryID: detail.ProductCategoryID,
        ProductID: detail.ProductID,
        Quantity: detail.Quantity,
        Price: detail.Price,
        OutletID: detail.RetailerID
      }
    })]

  }
    
    try {
      const res = await Axios.post(
        '?action=create_order',
        userData
      );
      router.push('/dashboard/sales-order');
    } catch (error) {
      console.error('Error creating order:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get retailer name by ID - with debugging
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
      return retailer.RetailerName || retailer.Name || retailer.name || retailer.OutletName || 'Unknown';
    }
    
    return `ID: ${retailerId}`;
  };

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

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold capitalize ml-5">Add Sales Order</h1>
      </div>

      {/* Main Card */}
      <div className="w-full bg-white shadow-lg rounded-xl p-6 border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Order Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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

            <FormSelect
              label="Party Name"
              id="PartyID"
              value={formData.PartyID}
              onChange={(e) => setFormData({ ...formData, PartyID: e.target.value })}
              options={allParties.data || []}
              valueKey="PartyID"
              labelKey="PartyName"
              required={true}
            />
           

         
              <RetailerById
              partyID={formData.PartyID}
              setFormData={setFormData}
              fromData={formData}
              allRetailers={allRetailers}
              setAllRetailers={setAllRetailers}
            />
         
            
           
            <div>
               {
                allRetailers.length  ===0 &&
                  <button
                    type="button"
                    className="px-0.5 py-0.5 mt-5 bg-primary1 text-white rounded shadow hover:bg-primary1 transition"
                    onClick={() => setOpen(!open)}
                  >
                    <AiOutlinePlus />
                  </button>
                
              }
            </div>

              {
               open &&(  <RetailerModalForm
                   partyID={formData.PartyID}
                   UserID={session.user.id}
                    open={open} 
                    setOpen={setOpen}
                  />
                )
              }
          
          </div>

           {/* Party Details */}
       
          {Object.keys(partyDetails).length > 0 && (
            <div className="border rounded-lg bg-blue-50 p-4 mt-4">
              <h3 className="text-lg font-medium mb-3 text-primary1">Party Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className='flex justify-between'>
                  <span className="font-normal text-gray-600">Party Name:
                    <span className="font-normal text-gray-600 ml-1 elipsis">{partyDetails.PartyName || 'N/A'}</span>
                  </span>
                 
                </div>
                <div className='flex justify-between'>
                  <span className="font-normal text-gray-600">Contact Person:
                    <span className="font-normal text-gray-600 ml-1 elipsis">{partyDetails.ContactPersonName || 'N/A'}</span>
                   
                  </span>
                  
                </div>
                <div>
                  <span className="font-normal text-gray-600">Address: 
                    <span className="font-normal text-gray-600 ml-1 elipsis">{partyDetails.Address || 'N/A'}</span></span>
                 
                </div>
                <div>
                  <span className="font-normal text-gray-600">Credit Limit:
                     <span className="font-normaltext-gray-600 ml-1 elipsis">{partyDetails.CreditLimit|| 'N/A'}</span>
                  </span>
                 
                </div>
                <div>
                  <span className="font-normal text-gray-600">Deposit Amount:
                     <span className="font-normal text-gray-600 ml-1 elipsis">{partyDetails.DepositAmount || 'N/A'}</span>
                  </span>
                 
                </div>
                <div>
                  <span className="font-normal text-gray-600">OpeningBalance: 
                    <span className="font-normal text-gray-600 ml-1 elipsis">{partyDetails.OpeningBalance || 'N/A'}
                      </span></span>
                 
                </div>
              </div>
            </div>
          )}

          {/* Retailer Details */}
          {retailerDetails && (
            <div className="border rounded-lg bg-green-50 p-4 mt-4">
              <h3 className="text-lg font-medium mb-3 text-green-700">Retailer Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-normal text-gray-600">Retailer Name:</span>
                  <span className="font-normal text-gray-600 ml-1 elipsis">{retailerDetails.RetailerName || retailerDetails.Name || 'N/A'}</span>
                </div>
                <div>
                  <span className="font-normal text-gray-600">Contact:</span>
                  <span className="font-normal text-gray-600 ml-1 elipsis">{retailerDetails.ContactPhone1 || retailerDetails.Phone || retailerDetails.Contact || 'N/A'}</span>
                </div>
                <div>
                  <span className="font-normal text-gray-600">Address:</span>
                  <span className="font-normal text-gray-600 ml-1 elipsis">{retailerDetails.Address || 'N/A'}</span>
                </div>
                <div>
                  <span className="font-normal text-gray-600">Email:</span>
                  <span className="font-normal text-gray-600 ml-1 elipsis">{retailerDetails.Email || 'N/A'}</span>
                </div>
                <div>
                  <span className="font-normal text-gray-600">City:</span>
                  <span className="font-normal text-gray-600 ml-1 elipsis">{retailerDetails.City || 'N/A'}</span>
                </div>
                <div>
                  <span className="font-normal text-gray-600">Shop Name:</span>
                  <span className="font-normal text-gray-600 ml-1 elipsis">{retailerDetails.ShopName || retailerDetails.OutletName || 'N/A'}</span>
                </div>
              </div>
            </div>
          )}

          {/* Order Details */}
          <div className="border rounded-xl bg-gray-50 p-5 shadow-inner mt-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">Order Details</h2>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-300">
              <table className="w-full text-sm table-fixed">
                <thead className="bg-primary1 text-white sticky top-0">
                  <tr>
                    <th className="w-[18%] px-3 py-3 text-left">Retailer</th>
                    <th className="w-[15%] px-3 py-3 text-left font-semibold">Product Type</th>
                    <th className="w-[20%] px-3 py-3 text-left">Product Name</th>
                    <th className="w-[10%] px-3 py-3 text-center">Qty</th>
                    <th className="w-[12%] px-3 py-3 text-center">Price</th>
                    <th className="w-[12%] px-3 py-3 text-center">Amount</th>
                    <th className="w-[8%] px-3 py-3 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {formData.orderDetails.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-100 transition">
                        {/* RETAILER NAME (READ-ONLY) */}
                      <td className="px-3 py-3">
                        <div  className='w-[90%] mb-2 text-ellipsis px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg'>
                          {getRetailerName(item.RetailerID)}
                        </div>
                      </td>
                      {/* PRODUCT CATEGORY */}
                      <td className="px-3 py-3">
                        <FormSelect
                          width='w-[90%]'
                          id="ProductCategoryID"
                          value={item.ProductCategoryID}
                          onChange={(e) => {
                            updateOrderDetails(e, item.id);
                            setCategoryId(e.target.value);
                          }}
                          options={bookGroups.data || []}
                          valueKey="ID"
                          labelKey="CategoryName"
                          required={false}
                          placeholder='Category'
                        />
                      </td>

                      {/* PRODUCT NAME (COMPONENT) */}
                      <td className="px-3 py-3">
                        <ProductById name="ProductID" item={item} update={updateOrderDetailBook} />
                      </td>

                    

                      {/* QTY */}
                      <td className="px-3 py-3 text-center">
                        <FormInput
                          width='w-full'
                          type='number'
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
                      <td className="px-3 py-3 text-center">
                        <span className="font-semibold">{item.Price ? item.Price : "-"}</span>
                      </td>

                      {/* TOTAL */}
                      <td className="px-3 py-3 text-center font-semibold text-green-600">
                        {item.TotalPrice || 0}
                      </td>

                      {/* REMOVE ROW */}
                      <td className="px-3 py-3 text-center">
                        <AiOutlineCloseCircle
                          className="text-2xl text-red-500 cursor-pointer hover:scale-110 transition mx-auto"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              orderDetails: formData.orderDetails.filter(
                                (d) => d.id !== item.id
                              ),
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
                      {formData.TotalAmount || '0.00'}
                    </td>
                  </tr>
                  
                  <tr className="bg-blue-50 font-semibold">
                    <td colSpan={5} className="px-4 py-3 text-right">
                      Discount ({formData.DiscountPercentage}%):
                    </td>
                    <td className="px-4 py-3 text-center text-green-700" colSpan={2}>
                       {formData.DiscountAmount?.toFixed(2) || '0.00'}
                    </td>
                  </tr>
                  
                  <tr className="bg-green-50 font-semibold border-t-2 border-gray-300">
                    <td colSpan={5} className="px-4 py-3 text-right text-lg">
                      Final Amount:
                    </td>
                    <td className="px-4 py-3 text-center text-lg text-green-700" colSpan={2}>
                      {formData.FinalAmount?.toFixed(2) || '0.00'}
                    </td>
                  </tr>

                  {/* ADD ROW */}
                  <tr>
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
                  </tr>
                </tbody>
              </table>
            </div>
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