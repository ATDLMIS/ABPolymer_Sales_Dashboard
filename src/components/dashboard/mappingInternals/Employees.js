import { useState, useEffect } from 'react';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const Employees = ({
  asmId,
  selectedUser,
  setSelectedUser,
  getUserDataById,
  mappingUser,
  setMappingUser,
}) => {
  const [employee, setEmployee] = useState([]);
  const [activeUsers, setActiveUsers] = useState('');
  useEffect(() => {
    if (asmId) {
      getUserDataById(
        '?action=get_userview&PDesignationID=',
        asmId,
        setEmployee
      );
    }
  }, [asmId]);
  return (
    <div>
      <h1 className="text-lg font-semibold">List of the Employee:</h1>
      <div className="max-h-[350px] overflow-y-auto bottom-[1px] border-gray-400 border-solid p-[10px]">
        {employee.length > 0 &&
          employee.map(item => (
            <div key={item.UserID}>
              <label>
                <input
                  type="checkbox"
                  value={item.UserID}
                  checked={activeUsers == item.UserID}
                  onChange={e => {
                    if (activeUsers == e.target.value) {
                      setActiveUsers('');
                      setMappingUser({
                        ...mappingUser,
                        user: '',
                      });
                      setSelectedUser({
                        ...selectedUser,
                        userId: '',
                      });
                    } else {
                      setActiveUsers(e.target.value);
                      setMappingUser({
                        ...mappingUser,
                        user: e.target.value,
                      });
                      setSelectedUser({
                        ...selectedUser,
                        userId: e.target.value,
                      });
                    }
                  }}
                  className="mx-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                {item.EmpName}
              </label>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Employees;
