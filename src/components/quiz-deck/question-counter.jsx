import { useEffect } from "react";

const QuestionCounter = ({ total, lapsed, review }) => {
  const targets = [
    { id: "starsCount", label: "Total Quizzes", count: total, suffix: "" },
    { id: "downloadsCount", label: "Total Lapsed", count: lapsed, suffix: "" },
    { id: "sponsorsCount", label: "In Review", count: review, suffix: "" }
  ];

  useEffect(() => {
    function animateCountUp(target, duration) {
      let currentCount = 0;
      const increment = Math.max(1, Math.ceil(target.count / (duration / 10)));

      const interval = setInterval(() => {
        currentCount += increment;
        if (currentCount >= target.count) {
          clearInterval(interval);
          currentCount = target.count;
          document.getElementById(target.id).textContent = currentCount + target.suffix;
        } else {
          document.getElementById(target.id).textContent = currentCount + target.suffix;
        }
      }, 20);
    }

    targets.forEach((target) => animateCountUp(target, 1000));
  }, [targets]);

  return (
    <dl className="w-full rounded-lg grid grid-cols-3 gap-4">
      {targets.map((target) => (
        <div
          key={target.id}
          className="flex flex-col p-6 text-center border rounded-lg border-gray-200"
          style={{ minWidth: "100px", minHeight: "120px" }}
        >
          <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">{target.label}</dt>
          <dd className="order-1 text-5xl font-extrabold leading-none text-primary-blue" id={target.id}>
            0
          </dd>
        </div>
      ))}
    </dl>
  );
};

export default QuestionCounter;
