import { useState } from 'react';
import NSM from './NSM';
import RSM from './RSM';
import DSM from './DSM';
import ASM from './ASM';
import Employees from './Employees';
import Axios from '@/utils/axios';

const MappingUser = ({ mappingUser, setMappingUser }) => {
  const [selectedUser, setSelectedUser] = useState({
    nsmId: '',
    rsmId: '',
    dsmId: '',
    asmId: '',
    userId: '',
  });
  const { nsmId, rsmId, dsmId, asmId } = selectedUser;
  const getUserDataById = async (url, id, cb) => {
    const res = await Axios.get(`${url}${id}`);
    cb(res.data.data);
  };

  return (
    <div>
      <NSM selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      <RSM
        nsmId={nsmId}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        getUserDataById={getUserDataById}
      />

      <DSM
        rsmId={rsmId}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        getUserDataById={getUserDataById}
      />
      <ASM
        dsmId={dsmId}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        getUserDataById={getUserDataById}
      />

      <Employees
        asmId={asmId}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        getUserDataById={getUserDataById}
        mappingUser={mappingUser}
        setMappingUser={setMappingUser}
      />
    </div>
  );
};

export default MappingUser;
