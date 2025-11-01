import convertDateFormat from '@/utils/convertDateFormat'

const PlanInfo = ({VisitPlan}) => {
  return (
    <div className="flex justify-center">
            <div className="min-w-[600px] rounded-md bg-gray-300 p-5">
                <h1 className="text-center text-xl font-semibold mb-3">
                Visit Entry Details
                </h1>
                <div className="flex items-center gap-2">
                    <h1 className="text-lg">Date:</h1>
                    <h1>{convertDateFormat(VisitPlan.VisitPlanDate)}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <h1 className="text-lg">Visit Plan No:</h1>
                    <h1>{VisitPlan.VisitPlanNo}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <h1 className="text-lg">Institution Type:</h1>
                    <h1>{VisitPlan.InstitutionTypeName}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <h1 className="text-lg">Institute Name:</h1>
                    <h1>{VisitPlan.InstituteName}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <h1 className="text-lg">Purpose Name:</h1>
                    <h1>{VisitPlan.PurposeName}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <h1 className="text-lg">Visit User Name:</h1>
                    <h1>{VisitPlan.VisitUserName}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <h1 className="text-lg">Check In Time:</h1>
                    <h1>{VisitPlan.CheckInTime && VisitPlan.CheckInTime.date}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <h1 className="text-lg">Check Out Time:</h1>
                    <h1>{VisitPlan.CheckOutTime && VisitPlan.CheckOutTime.date}</h1>
                </div>
            </div>
        </div>
  )
}

export default PlanInfo