'use client';
import useGetData from '@/utils/useGetData';
import PartyCoveredAreaView from './PartyCoveredAreaView';
import PartyDocumentView from './PartyDocumentView';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const PartyManagementView = ({ id }) => {
  const { status, data } = useGetData(
    `?action=get_party&PartyID=${id}`
  );
  const partyDocument = useGetData(
    `?action=get_partyDocs&PartyID=${id}`
  );
  if (status === 'pending') {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="flex justify-center mb-5">
        <div className="min-w-[600px] rounded-md bg-gray-300 p-5">
          <h1 className="text-center text-xl font-semibold mb-3">
            Party Information
          </h1>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Party Name:</h1>
            <h1>{data.PartyName}</h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">Address:</h1>
            <h1>{data.Address}</h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg">RegionID:</h1>
            <h1>{data.RegionID}</h1>
          </div>
          {data.ContactPersonName ? (
            <div className="flex items-center gap-2">
              <h1 className="text-lg">Contact Person Name:</h1>
              <h1>{data.ContactPersonName}</h1>
            </div>
          ) : (
            ''
          )}
          {data.ContactNumber ? (
            <div className="flex items-center gap-2">
              <h1 className="text-lg">Contact Number:</h1>
              <h1>{data.ContactNumber}</h1>
            </div>
          ) : (
            ''
          )}
          {data.Email ? (
            <div className="flex items-center gap-2">
              <h1 className="text-lg">Email:</h1>
              <h1>{data.Email}</h1>
            </div>
          ) : (
            ''
          )}
          {data.Website ? (
            <div className="flex items-center gap-2">
              <h1 className="text-lg">Website:</h1>
              <h1>{data.Website}</h1>
            </div>
          ) : (
            ''
          )}
          {data.OwnerName ? (
            <div className="flex items-center gap-2">
              <h1 className="text-lg">Owner Name:</h1>
              <h1>{data.OwnerName}</h1>
            </div>
          ) : (
            ''
          )}
          {data.OwnerPermanentAddress ? (
            <div className="flex items-center gap-2">
              <h1 className="text-lg">Owner Permanent Address:</h1>
              <h1>{data.OwnerPermanentAddress}</h1>
            </div>
          ) : (
            ''
          )}
          {data.OwnerCurrentAddress ? (
            <div className="flex items-center gap-2">
              <h1 className="text-lg">Owner Current Address:</h1>
              <h1>{data.OwnerCurrentAddress}</h1>
            </div>
          ) : (
            ''
          )}
          {data.OwnerContactNumber ? (
            <div className="flex items-center gap-2">
              <h1 className="text-lg">Owner Contact Number:</h1>
              <h1>{data.OwnerContactNumber}</h1>
            </div>
          ) : (
            ''
          )}
          {data.OwnerDateOfBirth ? (
            <div className="flex items-center gap-2">
              <h1 className="text-lg">Owner Date Of Birth:</h1>
              <h1>{data.OwnerDateOfBirth}</h1>
            </div>
          ) : (
            ''
          )}
          {data.BusinessStartYear ? (
            <div className="flex items-center gap-2">
              <h1 className="text-lg">Business Start Year:</h1>
              <h1>{data.BusinessStartYear}</h1>
            </div>
          ) : (
            ''
          )}
          {data.CreditLimit ? (
            <div className="flex items-center gap-2">
              <h1 className="text-lg">Credit Limit:</h1>
              <h1>{data.CreditLimit}</h1>
            </div>
          ) : (
            ''
          )}
          {data.DepositAmount ? (
            <div className="flex items-center gap-2">
              <h1 className="text-lg">Deposit Amount:</h1>
              <h1>{data.DepositAmount}</h1>
            </div>
          ) : (
            ''
          )}
          {data.OpeningBalance ? (
            <div className="flex items-center gap-2">
              <h1 className="text-lg">Opening Balance:</h1>
              <h1>{data.OpeningBalance}</h1>
            </div>
          ) : (
            ''
          )}
          {data.IsSamityMember ? (
            <div className="flex items-center gap-2">
              <h1 className="text-lg">IsSamityMember:</h1>
              <h1>{data.IsSamityMember}</h1>
            </div>
          ) : (
            ''
          )}
          {data.NoOfDistrict ? (
            <div className="flex items-center gap-2">
              <h1 className="text-lg">No Of District:</h1>
              <h1>{data.NoOfDistrict}</h1>
            </div>
          ) : (
            ''
          )}
          {data.NoOfThana ? (
            <div className="flex items-center gap-2">
              <h1 className="text-lg">No Of Thana:</h1>
              <h1>{data.NoOfThana}</h1>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="min-w-[600px] rounded-md bg-gray-300 p-5">
          <h1 className="text-center text-xl font-semibold mb-3">
            Covered Area
          </h1>
          <PartyCoveredAreaView id={id} />
        </div>
      </div>
      <div>
        <PartyDocumentView partydoc={partyDocument} />
      </div>
    </>
  );
};

export default PartyManagementView;
