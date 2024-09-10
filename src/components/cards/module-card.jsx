import { useNavigate } from "react-router-dom";
import DonutChart from "../charts/donut-chart";
import SmileFaceIcon from "../icons/smile-face-icon";

const ModuleCard = ({ moduleId, title, progress }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.setItem("currentModule", moduleId);
    navigate(`/study/${moduleId}`);
  };

  return (
    <div
      onClick={handleClick}
      className="select-none w-[26rem] h-[25rem] p-4 flex flex-col items-center text-center rounded-xl cursor-pointer hover:opacity-75"
      style={{ boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.24)" }}
    >
      {/* Title */}
      <div className="flex-grow flex items-center">
        <p className="text-[1.15rem] font-bold ">{title}</p>
      </div>

      {/* Donut Chart */}
      <div className="mt-2">
        <DonutChart progress={progress} />
      </div>

      <div className="w-full flex flex-col items-center">
        {/* Divider */}
        <hr className="w-[calc(100%-6rem)] border-t mt-6 mb-2.5" />

        {/* Icon */}
        <div className="h-full flex items-center gap-2">
          <div className="bg-[#ECEAF8] rounded-full p-2">
            <SmileFaceIcon size={7} color="#0B54A0" />
          </div>
          <div className="text-left mt-1">
            <p className="font-bold text-gray-600 leading-4">You are doing good!</p>
            <p className="text-sm text-gray-700 font-thin">You almost reached your goal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;
