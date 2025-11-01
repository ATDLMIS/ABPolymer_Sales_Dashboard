import { useState, useEffect } from 'react';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const RSM = ({ nsmId, selectedUser, setSelectedUser, getUserDataById }) => {
  const [rsm, setRsm] = useState([]);
  useEffect(() => {
    if (nsmId) {
      getUserDataById(
        '?action=get_userview&PDesignationID=',
        nsmId,
        setRsm
      );
    }
  }, [nsmId]);
  return (
    <div>
      <label className="capitalize flex font-semibold text-md py-1">RSM:</label>

      <select
        name="Rsm"
        className="w-full rounded-md"
        defaultValue=""
        onChange={e => {
          setSelectedUser({
            ...selectedUser,
            rsmId: e.target.value,
          });
        }}
        disabled={rsm.length ? false : true}
      >
        <option value="" disabled={true} selected></option>
        {rsm.length &&
          rsm.map(item => (
            <option value={item.DesignationID} key={item.UserID}>
              {item.EmpName}
            </option>
          ))}
      </select>
    </div>
  );
};

export default RSM;
