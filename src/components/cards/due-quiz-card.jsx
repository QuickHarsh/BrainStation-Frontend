const DueQuizCard = ({ question, ease, status }) => {
  return (
    <div className="bg-slate-100 rounded-lg p-4 my-2 shadow-sm shadow-slate-100">
      <p className="text-sm font-inter font-semibold text-left">{question}</p>
      <div className="text-xs flex justify-between mt-2 text-gray-600 font-inter">
        <p>Ease: {ease}</p>
        <p>Status: {status}</p>
      </div>
    </div>
  );
};

export default DueQuizCard;
