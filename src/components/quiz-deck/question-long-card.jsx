const QuestionLongCard = ({ questionText, answer }) => {
  return (
    <div className="bg-slate-100 p-4 rounded-lg">
      <p className="text-lg text-gray-900 font-semibold font-inter">{questionText}</p>
      <p className="text-gray-700 font-inter font-light">{answer}</p>
    </div>
  );
};

export default QuestionLongCard;
