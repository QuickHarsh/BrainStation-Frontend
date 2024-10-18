const DueQuizCard = ({ question, ease, status, attempt }) => {
  return (
    <div className="bg-slate-100 rounded-lg p-4 my-3 shadow-sm shadow-slate-100">
      <p className="text-sm font-inter font-semibold text-left">{question}</p>
      <div className="text-xs  grid grid-cols-3 mt-3 text-gray-600 font-inter">
        <p>Ease: {ease.toFixed(2)}</p>
        <p>Attempt: {attempt}</p>
        <p>Status: {status}</p>
      </div>
    </div>
  );
};

export default DueQuizCard;
