import useGetData from '@/utils/useGetData';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const PartyCoveredAreaView = ({ id }) => {
  const [state, setState] = useState({
    status: 'pending',
    data: [],
  });

  const getData = async () => {
    try {
      const res = await Axios.get(
        `?action=get_partydetailsAreas&PartyID=${id}`
      );
      const { PartyAreas } = res.data;
      setState({
        ...state,
        status: 'idle',
        data: PartyAreas,
      });
    } catch (error) {
      setState({
        ...state,
        status: 'idle',
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (state.status === 'pending') {
    return (
      <div className="my-3 text-center text-xl font-semibold">Loading...</div>
    );
  }
  if (state.data.length === 0) {
    return (
      <div className="my-3 text-center text-xl font-semibold">
        User not assign any area yet
      </div>
    );
  }
  return (
    <>
      {state.data.length ? (
        <div className="flex flex-col">
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
                        Id
                      </th>

                      <th scope="col" className="px-6 py-4">
                        Location
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.data.map(item => (
                      <tr
                        className="border-b border-neutral-200 dark:border-white/10"
                        key={item.RegionID}
                      >
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {item.RegionID}
                        </td>

                        <td className="whitespace-nowrap px-6 py-4 flex justify-center items-center gap-3">
                          {item.RegionName}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="my-3 text-center text-xl font-semibold">
          User not assigned yet
        </div>
      )}
    </>
  );
};

export default PartyCoveredAreaView;
