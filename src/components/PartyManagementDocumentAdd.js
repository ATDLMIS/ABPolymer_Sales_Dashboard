'use client';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import useGetData from '@/utils/useGetData';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const PartyManagementDocumentAdd = ({ id }) => {
  const { status, data } = useGetData(
    '?action=get_partydoctypes'
  );

  const partyDocument = useGetData(
    `?action=get_partyDocs&PartyID=${id}`
  );

  const [formData, setFormData] = useState([
    {
      id: uuidv4(),
      docId: '',
      docName: '',
      file: '',
    },
  ]);

  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    const dataWillBeSubmit = new FormData();

    formData.forEach(item => {
      dataWillBeSubmit.append('PartyDocsTypeID[]', item.docId);
      dataWillBeSubmit.append('PartyDocsPath[]', item.file);
    });
    const res = await Axios.post(
      `?action=create_partyDocs&PartyID=${id}`,
      dataWillBeSubmit
    );
    router.push('/dashboard/party-management');
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl capitalize mb-3">Add Party Documents</h1>
      </div>
      <div className="max-w-full bg-gray-200 rounded-md px-4 py-4">
        <form onSubmit={handleSubmit}>
          <table className="max-w-full w-full border border-neutral-200 text-center text-sm font-light text-surface dark:border-white/10 dark:text-white">
            <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
              <tr className="bg-text1 text-white">
                <th
                  scope="col"
                  className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                >
                  Documents Name
                </th>
                <th
                  scope="col"
                  className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                >
                  Attachment
                </th>
                <th scope="col" className="px-6 py-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {formData.length &&
                formData.map(item => (
                  <tr
                    className="border-b border-neutral-200 dark:border-white/10"
                    key={item.id}
                  >
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-1 font-medium dark:border-white/10">
                      <select
                        name="institutionType"
                        className="w-full rounded-md"
                        defaultValue=""
                        onChange={e => {
                          const { docType, docName } = JSON.parse(
                            e.target.value
                          );
                          setFormData(
                            formData.map(currentData =>
                              currentData.id === item.id
                                ? {
                                    ...currentData,
                                    docId: docType,
                                    docName: docName,
                                  }
                                : currentData
                            )
                          );
                        }}
                      >
                        <option value="" disabled={true} selected>
                          Select Document Name
                        </option>
                        {data.length &&
                          data.map(docType => (
                            <option
                              value={JSON.stringify({
                                docType: docType.PartyDocsTypeID,
                                docName: docType.PartyDocName,
                              })}
                              key={docType.PartyDocsTypeID}
                            >
                              {docType.PartyDocName}
                            </option>
                          ))}
                      </select>
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-1 font-medium dark:border-white/10">
                      {item.docName && (
                        <div className="border-[1px] border-[#6b7280] p-1 rounded-md bg-white">
                          <input
                            type="file"
                            name="file"
                            className="w-full rounded-md mb-1"
                            onChange={e => {
                              const file = e.target.files[0];
                              setFormData(
                                formData.map(currentData =>
                                  currentData.id === item.id
                                    ? { ...currentData, file }
                                    : currentData
                                )
                              );
                            }}
                          />
                        </div>
                      )}
                    </td>
                    <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-1 font-medium dark:border-white/10">
                      <div className="whitespace-nowrap px-6 py-4 flex justify-center items-end h-full gap-3">
                        <AiOutlineCloseCircle
                          className="text-4xl text-red-500 cursor-pointer"
                          onClick={() => {
                            setFormData(
                              formData.filter(
                                currentData => currentData.id !== item.id
                              )
                            );
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              <tr>
                <td
                  className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium "
                  colSpan="3"
                >
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="bg-green-300 text-md rounded-md px-4 py-2"
                      onClick={() => {
                        setFormData([
                          ...formData,
                          {
                            id: uuidv4(),
                            docName: '',
                            file: '',
                          },
                        ]);
                      }}
                    >
                      Add More Document
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="capitalize bg-primary1 px-5 py-1 text-white rounded-md mt-9"
            >
              Save Document
            </button>
          </div>
        </form>
      </div>

      <div>
        {partyDocument.status === 'pending' ? (
          <div>Loading...</div>
        ) : partyDocument.data.Documents?.length === 0 ? (
          <div>No Document Added To Display</div>
        ) : (
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold pt-6 pb-3 text-center">
              Document Already Added
            </h1>
            <div>
              <div className="inline-block max-w-full w-full pt-5">
                <div className="overflow-x-scroll">
                  <table className="max-w-full w-full overflow-x-scroll border border-neutral-200 text-center text-sm font-light text-surface dark:border-white/10 dark:text-white">
                    <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                      <tr className="bg-text1 text-white">
                        <th
                          scope="col"
                          className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                        >
                          Document Name
                        </th>
                        <th
                          scope="col"
                          className="border-e border-neutral-200 px-6 py-4 dark:border-white/10"
                        >
                          Document Type
                        </th>

                        <th scope="col" className="px-6 py-4">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {partyDocument.data.Documents?.length &&
                        partyDocument.data.Documents.map(item => (
                          <tr
                            className="border-b border-neutral-200 dark:border-white/10"
                            key={item.PartyDocsID}
                          >
                            <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                              {item.PartyDocName}
                            </td>
                            <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                              {item.PartyDocsPath.split('.').pop()}
                            </td>

                            <td className="whitespace-nowrap px-6 py-4 flex justify-center items-center gap-3">
                              Added
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PartyManagementDocumentAdd;
