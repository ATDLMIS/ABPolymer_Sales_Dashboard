'use client'
import {useState, useEffect} from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useGetData from "@/utils/useGetData";
import { useRouter } from 'next/navigation';
import Axios from '@/utils/axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const page = ({params}) => {
  const [name, setName] = useState('')
  const [intName ,setIntName] = useState([])
  const [formData, setFormData] = useState({
    VisitPlanNo: '',
    VisitPlanDate: new Date().toISOString().split('T')[0],
    InstitutionTypeID: '',
    InstitutionID: '',
    PurposeID: '',
    VisitUserID: '',
    UserID: ''
  })
const getPreviosData = async (id) =>{
    const res = await Axios.get(`?action=get_visit_plan&VisitPlanID=${id}`)
    setFormData({
        VisitPlanNo: res.data.VisitPlan.VisitPlanNo,
    VisitPlanDate: res.data.VisitPlan.VisitPlanDate,
    InstitutionTypeID: res.data.VisitPlan.InstitutionTypeID,
    InstitutionID: res.data.VisitPlan.InstitutionID,
    PurposeID: res.data.VisitPlan.PurposeID,
    VisitUserID: res.data.VisitPlan.VisitUserID,
    UserID: res.data.VisitPlan.UserID
    })
    setName(res.data.VisitPlan.VisitUserName)
}

useEffect(()=>{
    if(params.id){
        getPreviosData(params.id)
    }

}, [params.id])

const instutionType = useGetData('?action=get_institutiontypes')
const purposeCategory = useGetData('?action=get_visitpurposes')


const getInstutionName = async id => {
  const res = await Axios.get(
    `?action=get_institutionName&InstitutionTypeID=${id}`
  );
  if (res.data.length) {
    setIntName(res.data);
  }
};

useEffect(() => {
  if (formData.InstitutionTypeID) {
    getInstutionName(formData.InstitutionTypeID);
  }
}, [formData.InstitutionTypeID]);

const handleChange = e => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  })
}
const router = useRouter()
const handleSubmit = async e =>{
  e.preventDefault();
  const res = await Axios.put(`?action=update_visit_plan&VisitPlanID=${params.id}`, formData)
  router.push('/dashboard/visit-plan')
}

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl capitalize mb-3">Visit Plan Requisition</h1>
        <form>
          <input
            name="search"
            type="text"
            placeholder="Search"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-[300px] text-sm"
          />
        </form>
      </div>
      <div className="max-w-2xl bg-gray-200 rounded-md px-4 py-4">
        <h2 className="text-lg font-semibold mb-2 capitalize">
        Add New visit plan Requisition
        </h2>
        <form onSubmit={handleSubmit}>
        <div>
            <label className="capitalize flex font-semibold text-md py-1">
              Visit No:
            </label>

            <input
            type="text"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full text-sm"
            value={formData.VisitPlanNo}
            readOnly
          />
          </div>
          <div>
            <label className="capitalize flex font-semibold text-md py-1">
              Employee Name:
            </label>

            <input
            type="text"
            className="text-md outline-1 border-1 focus:ring-0 rounded-md w-full text-sm"
            value={name}
            readOnly
          />
          </div>
          <div className="w-full">
                    <label className="capitalize flex font-semibold text-md py-1">
                      Visit Date:
                    </label>
          
                    <DatePicker
                      selected={formData.VisitPlanDate}
                      onChange={date =>
                        setFormData({
                          ...formData,
                          VisitPlanDate: date.toISOString().split('T')[0],
                        })
                      }
                      className="rounded-md"
                    />
                  </div>
          <div>
            <label className="capitalize flex font-semibold text-md py-1">
            Institution/Party Type:
            </label>

            <select name="InstitutionTypeID" className="w-full rounded-md" value={formData.InstitutionTypeID} onChange={handleChange}>
              <option value="" disabled={true}></option>
              {instutionType.data.length && instutionType.data.map(item =>{
               return <option value={item.ID} key={item.ID}>{item.CategoryName}</option>
              })}
            </select>
          </div>
          <div>
          <label className="capitalize flex font-semibold text-md py-1">
          Institution/Party Name:
          </label>

          <select
            name="InstitutionID"
            className="w-full rounded-md"
            onChange={handleChange}
            value={formData.InstitutionID}
            required
            disabled={formData.InstitutionTypeID ? false : true}
          >
            <option value="" disabled={true}></option>
            {intName.length &&
              intName.map(item => (
                <option value={item.InstitutionID} key={item.InstitutionID}>
                  {item.InstitutionName}
                </option>
              ))}
          </select>
        </div>
          <div>
            <label className="capitalize flex font-semibold text-md py-1">
            Visit Purpose:
            </label>

            <select name="PurposeID" className="w-full rounded-md" value={formData.PurposeID} onChange={handleChange}>
              <option value="" disabled={true}></option>
              {purposeCategory.data.length && purposeCategory.data.map(item =>(
                <option value={item.ID} key={item.ID}>{item.CategoryName}</option>
              ))}
            </select>
          </div>
          <div className="mt-5">
            <button className="capitalize bg-primary1 px-5 py-1 text-white rounded-md" type="submit">
              save visit plan
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default page;
