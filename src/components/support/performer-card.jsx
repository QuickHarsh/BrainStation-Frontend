const performerData = {
  "Excellent Performer": { label: "Excellent", width: "100%", gradient: "from-green-400 to-green-600" },
  "Medium Performer": { label: "Medium", width: "65%", gradient: "from-yellow-400 to-yellow-600" },
  "Low Performer": { label: "Low", width: "30%", gradient: "from-red-400 to-red-600" }
};

const PerformerTypeCard = ({ performerType }) => {
  const selectedPerformer = performerData[performerType] || performerData["Low Performer"];

  return (
    <div className="p-6 bg-slate-100 rounded-lg shadow-md w-full">
      <h4 className="font-bold text-2xl text-gray-800 mb-6">Your Performance Level</h4>

      {/* Horizontal Gradient Indicator Bar */}
      <div className="relative w-full h-10 bg-gray-200 rounded-full overflow-hidden mb-6">
        <div
          className={`absolute top-0 h-full rounded-full bg-gradient-to-r ${selectedPerformer.gradient}`}
          style={{
            width: selectedPerformer.width
          }}
        />
        <div className="absolute inset-0 flex justify-between items-center px-4 text-sm font-bold text-gray-500">
          <span className={`${performerType === "Low Performer" ? "text-white" : ""}`}>Low</span>
          <span className={`${performerType === "Medium Performer" ? "text-white" : ""}`}>Medium</span>
          <span className={`${performerType === "Excellent Performer" ? "text-white" : ""}`}>Excellent</span>
        </div>
      </div>

      {/* Performance Level Description */}
      <div className="text-center">
        <span className="text-lg font-semibold" style={{ color: selectedPerformer.gradient.split(" ")[0] }}>
          {selectedPerformer.label} Performer
        </span>
      </div>
    </div>
  );
};

export default PerformerTypeCard;
