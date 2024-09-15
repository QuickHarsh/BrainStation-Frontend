const ChapterCard = ({ title, onClick, lectureNumber }) => {
  return (
    <div
      className="relative p-4 my-4 min-h-20 cursor-pointer bg-white rounded-xl hover:brightness-95 transition-all duration-300"
      style={{ boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.25)" }}
      onClick={onClick}
    >
      <h3 className="uppercase text-sm font-semibold">Lecture {lectureNumber}</h3>
      <p className="text-sm font-light">{title}</p>
    </div>
  );
};

export default ChapterCard;
