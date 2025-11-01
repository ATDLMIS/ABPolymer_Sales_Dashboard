import { useState, useEffect } from 'react';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const DSM = ({ rsmId, selectedUser, setSelectedUser, getUserDataById }) => {
  const [dsm, setDsm] = useState([]);
  useEffect(() => {
    if (rsmId) {
      getUserDataById(
        '?action=get_userview&PDesignationID=',
        rsmId,
        setDsm
      );
    }
  }, [rsmId]);
  return (
    <div>
      <label className="capitalize flex font-semibold text-md py-1">DSM:</label>

      <select
        name="Dsm"
        className="w-full rounded-md"
        defaultValue=""
        onChange={e => {
          setSelectedUser({
            ...selectedUser,
            dsmId: e.target.value,
          });
        }}
        disabled={dsm.length ? false : true}
      >
        <option value="" disabled={true} selected></option>
        {dsm.length &&
          dsm.map(item => (
            <option value={item.DesignationID} key={item.UserID}>
              {item.EmpName}
            </option>
          ))}
      </select>
    </div>
  );
};

export default DSM;
