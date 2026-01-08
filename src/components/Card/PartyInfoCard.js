

const PartyInfoCard = ({ icon, label, value }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="text-xs font-semibold text-gray-500 tracking-wide flex items-center gap-1">
        {icon}
        {label}
      </div>
      <div className="text-xs font-semibold text-gray-700">
        {value || 'N/A'}
      </div>
    </div>
  )
}

export default PartyInfoCard
