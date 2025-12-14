import { useState } from "react";
import FormInput from "../fromField/FormInput";
import Axios from "@/utils/axios";

export default function RetailerModalForm({open, setOpen, partyID, UserID,setRefreshKey}) {
  const [formData, setFormData] = useState({
    RetailerCode: '',
    RetailerName: '',
    ContactPersonName: '',
    ContactPhone1: '',
    Address: '',
    UserID,
    status: true
  });

    // Update form state
  const handleInputChange = (field, value) => {
   setFormData({...formData, [field]: value});
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    const res = await Axios.post(`?action=create_retailers&PartyID=${partyID}`, formData);
    if (res.status === 200) {
       setRefreshKey(prev => prev + 1);
       setOpen(false);
    }
  }
  return (
    <div className="w-full h-screen flex items-center justify-center">

      {open && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center transition-opacity"
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-xl transform transition-all sm:max-w-lg sm:w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Add Retailer</h3>
                <p className="mt-1 text-sm text-gray-500">Fill in the form below to add a new retailer</p>
              </div>
              <span className="cursor-pointer" onClick={() => setOpen(false)}>✕</span>
            </div>

            {/* Modal Body */}
            <div className="text-left my-2">
              <FormInput label="Retailer Name"
               id="ShopName" type="text"
                placeholder="Enter Shop Name"
                value={formData.RetailerName}
                onChange={(e) => handleInputChange("RetailerName", e.target.value)}
                 />
              <FormInput label="Retailer ID/Code" id="RetailerCode" type="text"
               placeholder="Enter Retailer Code"
                value={formData.RetailerCode}
                onChange={(e) => handleInputChange("RetailerCode", e.target.value)}
                />
              <FormInput label="Contact Person Name"
               id="ContactName" type="text" 
               placeholder="Enter Contact person Name" 
               value={formData.ContactPersonName}
               onChange={(e) => handleInputChange("ContactPersonName", e.target.value)}
               />
              <FormInput label="Designation" 
              id="Designation"
               type="text"
                placeholder="Enter Designation"
                 value={formData.Designation}
                 onChange={(e) => handleInputChange("Designation", e.target.value)}
                 />
              <FormInput label="Contact Number"
               id="ContactNumber" type="number"
                placeholder="Enter Contact Number" 
                value={formData.ContactPhone1}
                onChange={(e) => handleInputChange("ContactPhone1", e.target.value)}
                />
              <FormInput label="Address"
               id="Address" type="text" 
               placeholder="Address" 
               value={formData.Address}
               onChange={(e) => handleInputChange("Address", e.target.value)}
               />
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-2 mt-4">
              <button
                type="button"
                className="w-full sm:w-auto inline-flex justify-center rounded-md border border-red-600 px-4 py-2 text-base font-medium text-red-600  sm:text-sm"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent px-4 py-2 bg-primary1 text-base font-medium text-white  sm:text-sm"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
