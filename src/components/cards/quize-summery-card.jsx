// QuizSummeryCard.jsx

const QuizSummeryCard = ({ dueTodayCount, learningPhaseCount }) => {
  const totalCount = dueTodayCount + learningPhaseCount;

  return (
    <div
      className="mt-4 h-[10rem] overflow-hidden relative p-4 mx-[0.4rem] rounded-xl text-white hover:opacity-80"
      style={{ boxShadow: "0px 2px 8.3px rgba(0, 0, 0, 0.09)" }}
    >
      <img src="/assets/images/gradient.svg" alt="quiz deck gradient" className="absolute w-40 top-0 left-0 z-[-1]" />
      <p className="text-white font-josfin-sans text-lg">Memory Vault</p>
      {/* Summery */}
      <div className="w-[40%] absolute right-5 text-black leading-6">
        <div className="flex justify-between font-josfin-sans">
          <p>Due: </p>
          <p>{dueTodayCount}</p>
        </div>
        <div className="flex justify-between font-josfin-sans">
          <p>Learning: </p>
          <p>{learningPhaseCount}</p>
        </div>
        <div className="flex justify-between font-josfin-sans text-[#497C8D]">
          <p>Total: </p>
          <p>{totalCount}</p>
        </div>
      </div>
      <p className="absolute bottom-2 text-xs text-black left-1/2 transform -translate-x-1/2 font-inter w-[80%] text-center">
        Today&apos;s Recall, Every Deck in Sync.
      </p>
    </div>
  );
};

export default QuizSummeryCard;
