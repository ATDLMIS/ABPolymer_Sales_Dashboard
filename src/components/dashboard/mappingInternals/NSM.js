import useGetData from '@/utils/useGetData';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const NSM = ({ selectedUser, setSelectedUser }) => {
  const nsmData = useGetData(
    '?action=get_userview&PDesignationID=1515'
  );
  if (nsmData.status === 'pending') {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <label className="capitalize flex font-semibold text-md py-1">NSM:</label>

      <select
        name="Nsm"
        className="w-full rounded-md"
        defaultValue=""
        onChange={e => {
          setSelectedUser({
            ...selectedUser,
            nsmId: e.target.value,
          });
        }}
      >
        <option value="" disabled={true} selected></option>
        {nsmData.data.data.length &&
          nsmData.data.data.map(item => (
            <option value={item.DesignationID} key={item.UserID}>
              {item.EmpName}
            </option>
          ))}
      </select>
    </div>
  );
};

export default NSM;
