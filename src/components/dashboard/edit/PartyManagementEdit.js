'use client';
import { useEffect, useState } from 'react';
import useGetData from '@/utils/useGetData';
import { useRouter } from 'next/navigation';
import LocationEdit from '@/components/location/LocationEdit';
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const PartyManagementEdit = ({ id }) => {
  const [formData, setFormData] = useState({
    PartyName: '',
    ContactPersonName: '',
    ContactNumber: '',
    Address: '',
    RegionID: '',
    Email: '',
    Website: '',
    CreditLimit: '',
    DepositAmount: '',
    OpeningBalance: '',
    OwnerName: '',
    OwnerContactNumber: '',
    OwnerCurrentAddress: '',
    OwnerPermanentAddress: '',
    OwnerDateOfBirth: '',
    BusinessStartYear: '',
    NoOfThana: '',
    NoOfDistrict: '',
    IsSamityMember: '',
    WayOfSendingLetters: '',
  });

  const [newRegion, setNewRegion] = useState('');

  const division = useGetData(
    '?action=get_regionDivision'
  );

  async function getPreviousData() {
    const res = await Axios.get(
      `?action=get_party&PartyID=${id}`
    );
    setFormData({
      ...res.data,
    });
  }

  useEffect(() => {
    getPreviousData();
  }, []);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    let dataWillBeSubmitted = {
      PartyName: formData.PartyName,
      Address: formData.Address,
      RegionID: newRegion || formData.RegionID,
    };

    if (formData.ContactPersonName) {
      dataWillBeSubmitted.ContactPersonName = formData.ContactPersonName;
    }
    if (formData.ContactNumber) {
      dataWillBeSubmitted.ContactNumber = formData.ContactNumber;
    }
    if (formData.Email) {
      dataWillBeSubmitted.Email = formData.Email;
    }
    if (formData.Website) {
      dataWillBeSubmitted.Website = formData.Website;
    }
    if (formData.CreditLimit) {
      dataWillBeSubmitted.CreditLimit = formData.CreditLimit;
    }
    if (formData.DepositAmount) {
      dataWillBeSubmitted.DepositAmount = formData.DepositAmount;
    }
    if (formData.OpeningBalance) {
      dataWillBeSubmitted.OpeningBalance = formData.OpeningBalance;
    }
    if (formData.OwnerName) {
      dataWillBeSubmitted.OwnerName = formData.OwnerName;
    }
    if (formData.ownerContact) {
      dataWillBeSubmitted.ownerContact = formData.ownerContact;
    }
    if (formData.OwnerCurrentAddress) {
      dataWillBeSubmitted.OwnerCurrentAddress = formData.OwnerCurrentAddress;
    }
    if (formData.OwnerPermanentAddress) {
      dataWillBeSubmitted.OwnerPermanentAddress =
        formData.OwnerPermanentAddress;
    }
    if (formData.OwnerDateOfBirth) {
      dataWillBeSubmitted.OwnerDateOfBirth = formData.OwnerDateOfBirth;
    }
    if (formData.BusinessStartYear) {
      dataWillBeSubmitted.BusinessStartYear = formData.BusinessStartYear;
    }
    if (formData.NoOfThana) {
      dataWillBeSubmitted.NoOfThana = formData.NoOfThana;
    }
    if (formData.NoOfDistrict) {
      dataWillBeSubmitted.NoOfDistrict = formData.NoOfDistrict;
    }
    if (formData.IsSamityMember) {
      dataWillBeSubmitted.IsSamityMember = formData.IsSamityMember;
    }
    if (formData.WayOfSendingLetters) {
      dataWillBeSubmitted.WayOfSendingLetters = formData.WayOfSendingLetters;
    }

    const res = await Axios.put(
      `?action=update_party&PartyID=${id}`,
      dataWillBeSubmitted
    );
    router.push('/dashboard/party-management');
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl capitalize mb-3">Party Management</h1>
        <form>
          <input
            name="search"
            type="text"
            placeholder="Search"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-[300px] text-sm"
          />
        </form>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6">
          {/* section one start */}
          <div className="bg-gray-200 rounded-md px-4 py-4 w-full">
            <div>
              <label
                className="block text-sm font-bold mb-1"
                htmlFor="partyName"
              >
                Party Name:
              </label>
              <input
                id="partyName"
                type="text"
                className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
                name="PartyName"
                value={formData.PartyName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-bold mb-1"
                htmlFor="ContactPerson"
              >
                Contact Person:
              </label>
              <input
                id="ContactPerson"
                type="text"
                className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
                name="ContactPersonName"
                value={formData.ContactPersonName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-sm font-bold mb-1"
                htmlFor="contactPhone"
              >
                Contact Phone:
              </label>
              <input
                id="contactPhone"
                type="text"
                className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
                name="ContactNumber"
                value={formData.ContactNumber}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1" htmlFor="address">
                Address:
              </label>
              <input
                id="address"
                type="text"
                className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
                name="Address"
                value={formData.Address}
                onChange={handleChange}
                required
              />
            </div>
            {division.status !== 'pending' && (
              <LocationEdit
                updateState={setNewRegion}
                regionId={formData.RegionID}
                division={division}
              />
            )}

            <div>
              <label
                className="block text-sm font-bold mb-1"
                htmlFor="PartyEmail"
              >
                Party's Email Address:
              </label>
              <input
                id="PartyEmail"
                type="text"
                className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-sm font-bold mb-1"
                htmlFor="PartyWebsite"
              >
                Party's Website:
              </label>
              <input
                id="PartyWebsite"
                type="text"
                className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
                name="Website"
                value={formData.Website}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-sm font-bold mb-1"
                htmlFor="creditLimit"
              >
                Credit Limit:
              </label>
              <input
                id="creditLimit"
                type="text"
                className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
                name="CreditLimit"
                value={formData.CreditLimit}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-sm font-bold mb-1"
                htmlFor="depositAmount"
              >
                Deposit Amount:
              </label>
              <input
                id="depositAmount"
                type="text"
                className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
                name="DepositAmount"
                value={formData.DepositAmount}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-sm font-bold mb-1"
                htmlFor="OpeningAmount"
              >
                Opening Amount:
              </label>
              <input
                id="OpeningAmount"
                type="text"
                className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
                name="OpeningBalance"
                value={formData.OpeningBalance}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-sm font-bold mb-1"
                htmlFor="ownerName"
              >
                Owner Name:
              </label>
              <input
                id="ownerName"
                type="text"
                className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
                name="OwnerName"
                value={formData.OwnerName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-sm font-bold mb-1"
                htmlFor="OwnerContact"
              >
                Owner Contact Number:
              </label>
              <input
                id="OwnerContact"
                type="text"
                className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
                name="OwnerContactNumber"
                value={formData.OwnerContactNumber}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-sm font-bold mb-1"
                htmlFor="OwnerAddress"
              >
                Owner Current Address:
              </label>
              <input
                id="OwnerAddress"
                type="text"
                className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
                name="OwnerCurrentAddress"
                value={formData.OwnerCurrentAddress}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* section one End */}
          {/* section two start */}
          <div className="bg-gray-200 rounded-md px-4 py-4">
            <div>
              <label
                className="block text-sm font-bold mb-1"
                htmlFor="OwnerPermanentAddress"
              >
                Owner Permanent Address:
              </label>
              <input
                id="OwnerPermanentAddress"
                type="text"
                className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
                name="OwnerPermanentAddress"
                value={formData.OwnerPermanentAddress}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-sm font-bold mb-1"
                htmlFor="OwnerDOB"
              >
                Owner Date Of Birth:
              </label>
              <input
                id="OwnerDOB"
                type="text"
                className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
                name="OwnerDateOfBirth"
                value={formData.OwnerDateOfBirth}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-sm font-bold mb-1"
                htmlFor="businessStartYear"
              >
                Business Start Year:
              </label>
              <input
                id="businessStartYear"
                type="text"
                className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
                name="BusinessStartYear"
                value={formData.BusinessStartYear}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-sm font-bold mb-1"
                htmlFor="ThanaUnderParty"
              >
                No Of Thana Under The Party:
              </label>
              <input
                id="ThanaUnderParty"
                type="text"
                className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
                name="NoOfThana"
                value={formData.NoOfThana}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-sm font-bold mb-1"
                htmlFor="districtUnderParty"
              >
                No Of District Under The Party:
              </label>
              <input
                id="districtUnderParty"
                type="text"
                className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
                name="NoOfDistrict"
                value={formData.NoOfDistrict}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-sm font-bold mb-1"
                htmlFor="IsMemberOfBPS"
              >
                Is The Party Member Of Books Publication Samity:
              </label>
              <input
                id="IsMemberOfBPS"
                type="text"
                className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
                name="IsSamityMember"
                value={formData.IsSamityMember}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-sm font-bold mb-1"
                htmlFor="WaySendLetter"
              >
                Way Of Send Letter:
              </label>
              <input
                id="WaySendLetter"
                type="text"
                className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full block text-sm"
                name="WayOfSendingLetters"
                value={formData.WayOfSendingLetters}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* section two end */}
        </div>
        <div className="mt-5 mb-3 flex justify-center">
          <button
            className="capitalize bg-primary1 px-7 py-1 text-white rounded-md"
            type="submit"
          >
            Update Party
          </button>
        </div>
      </form>
    </>
  );
};

export default PartyManagementEdit;
