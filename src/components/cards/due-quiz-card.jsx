import LockIcon from "../icons/lock-closed";

const DueQuizCard = ({ question, ease, status, attempt, isLocked = false }) => {
  return (
    <div
      className={`${isLocked ? "bg-slate-300" : "bg-slate-100"} rounded-lg p-4 my-3 shadow-sm shadow-slate-100 relative`}
    >
      {isLocked && (
        <div className="absolute top-2 right-2">
          <LockIcon size={3} />
        </div>
      )}
      <p className={`text-sm ${isLocked ? "mt-2" : "mt-1"} font-inter font-semibold text-left`}>{question}</p>
      <div className="text-xs  grid grid-cols-3 mt-3 text-gray-600 font-inter">
        <p>Ease: {ease.toFixed(2)}</p>
        <p>Attempt: {attempt}</p>
        <p>Status: {status}</p>
      </div>
    </div>
  );
};

export default DueQuizCard;
