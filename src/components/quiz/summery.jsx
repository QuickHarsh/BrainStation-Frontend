import Scrollbars from "react-custom-scrollbars-2";
import DonutChart from "../charts/donut-chart";
import SummeryTable from "./summery-table";

const QuizSummery = ({ onClose }) => {
  return (
    <div>
      <button className="absolute top-4 right-4 text-xl" onClick={onClose}>
        &times;
      </button>
      <h2 className="text-xl font-semibold">Quiz Summery</h2>
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        autoHeight
        autoHeightMin={0}
        autoHeightMax={"calc(100vh - 150px)"}
        thumbMinSize={30}
        universal={true}
        className="rounded-lg"
      >
        <div className="w-full h-full flex flex-col gap-4 items-center mt-5">
          <DonutChart />
          <p className="text-lg font-inter">Lecturer 01: Comprehensive Guide to Data Structures and Algorithms</p>
          {/* feedback */}
          <div className="bg-gray-100 min-h-[160px] px-4 py-6 mt-2 rounded-xl">
            <h3 className="text-lg text-gray-600 font-semibold">Feedback</h3>
            <p className="mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </div>
          {/* Quiz table */}
          <div className="w-full">
            <SummeryTable />
          </div>
        </div>
      </Scrollbars>
    </div>
  );
};

export default QuizSummery;
