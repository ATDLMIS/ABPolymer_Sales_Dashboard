import React from 'react'
import { IndentIcon, User, Phone, MapPin, CheckCircle } from 'lucide-react'
import PartyInfoCard from './PartyInfoCard'
import { GiDistressSignal } from 'react-icons/gi'
import { FaComment } from 'react-icons/fa6'


const RetailerCard = ({
  title ,
  data,
}) => {
  return (
    title === 'Retailer Information' ? (
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-300">
          <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
            <IndentIcon className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-sm font-semibold font-poppins text-gray-600">
            {title}
          </h3>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <PartyInfoCard
            icon={<User className="w-3 h-3" />}
            label="Retailer Name"
            value={data.partyName}
          />

          <PartyInfoCard
            icon={<Phone className="w-3 h-3" />}
            label="Contact Number"
            value={data.contactName}
          />

          <PartyInfoCard
            icon={<MapPin className="w-3 h-3" />}
            label="Address"
            value={data.address}
          />
        </div>
      </div>
    ) : (
       <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-300">
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-sm font-semibold font-poppins text-gray-600">
            {title}
          </h3>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <PartyInfoCard
            icon={<User className="w-3 h-3" />}
            label="Approved By"
            value={data.ApprovedBy}
          />

          <PartyInfoCard
            icon={<MapPin className="w-3 h-3" />}
            label="Designation"
            value={data.Designation}
          />

          <PartyInfoCard
            icon={<FaComment className="w-3 h-3" />}
            label="Comments"
            value={data.ApprovalComments}
          />
        </div>
      </div>
    )
  )
}

export default RetailerCard
