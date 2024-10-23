import ScrollView from "@/components/common/scrollable-view";
import AppUsageProgress from "../components/charts/AppUsageProgress";
import ChapterPerformence from "../components/charts/ChapterPerformence";
import CurrentProgressGauge from "../components/charts/CurrentProgressGauge";
import DailyAverage from "../components/charts/DailyAverage";
import ExamReadinessGauge from "../components/charts/ExamReadinessGauge";
import MarksComparison from "../components/charts/MarksComparison";
import QuizMarksLatestAttempt from "../components/charts/QuizMarksLatestAttempt";
import TimeSpentChapter from "../components/charts/TimeSpentChapter";

const analysis = () => {
  return (
    <div className="p-4 px-6">
      <h1 className="font-inter font-bold text-2xl p-3">Analysis Dashboard</h1>

      <ScrollView>
        <div className="h-screen flex flex-col md:flex-row gap-10">
          <div className="md:w-1/2 w-full ">
            {/* Flexbox for Left Side Split */}
            <div className="flex gap-10">
              {/* Left Side */}
              <div className="w-1/2 flex flex-col ">
                <div className="h-full p-6 bg-white border border-gray-200 rounded-lg flex flex-col items-center gap-10 ">
                  <div className="flex flex-col items-center ">
                    <h6 className="mb-3 font-bold">Your Current Progress</h6>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <CurrentProgressGauge />
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <h6 className="mb-3 font-bold">Exam Readiness</h6>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <ExamReadinessGauge />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side */}
              <div className="w-full flex flex-col">
                <div className="h-full p-6 bg-white border border-gray-200 rounded-lg flex flex-col justify-center items-center">
                  <h6 className="mb-3 font-bold">Task Completion Status</h6>

                  <div className="w-full p-5 bg-white border border-gray-200 rounded-lg flex justify-center flex-col gap-2">
                    <div>
                      <p>Completed Tasks = 20</p>
                    </div>

                    <div className="flex gap-2">
                      <div>Current Task group Tasks =</div>
                      <div>
                        <div className="rounded-md bg-blue-100 text-blue-800 font-bold py-0.5 px-2.5 border border-transparent text-sm transition-all">
                          View
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between gap-2 mt-2">
                      <div className="rounded-md bg-blue-100 font-bold py-0.5 px-2.5 border border-transparent text-sm text-slate-600 transition-all">
                        Pending = 4
                      </div>
                      <div className="rounded-md bg-blue-100 font-bold py-0.5 px-2.5 border border-transparent text-sm text-slate-600 transition-all">
                        Completed = 2
                      </div>
                    </div>
                  </div>

                  <h6 className="mb-3 mt-5 font-bold">App usage Progress</h6>
                  <div className="h-72">
                    <AppUsageProgress />
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Width Bottom Section */}
            <div className="mt-4">
              <div className="w-full h-full bg-white border border-gray-200 rounded-lg p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p>Daily Average (Study Hours with focus)</p>
                    <h2 className="text-2xl font-bold">2h 20m</h2>
                  </div>
                  <div>
                    <span className="text-orange-600 mx-1">+30m</span> this week
                  </div>
                </div>

                <div className="h-96 w-full mt-3">
                  <DailyAverage />
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 w-full h-full">
            <div className="p-6 bg-white border border-gray-200 rounded-lg">
              <div className="flex">
                <div className="w-1/2 p-4">
                  <h2 className="text-center font-bold mb-3">Quiz Marks vs Latest Attempt</h2>
                  <QuizMarksLatestAttempt />
                </div>

                <div className="w-1/2 p-4">
                  <div className="flex items-center justify-between flex-col gap-5">
                    <h2 className="text-center font-bold">Time Spent on Each Chapter</h2>
                    <div className="w-full h-72 flex justify-center">
                      <TimeSpentChapter />
                    </div>
                  </div>

                  <div className="flex items-center justify-between flex-col gap-5 mt-5 align-baseline">
                    <h2 className="text-center font-bold">Chapter Performance</h2>
                    <div className="w-full h-72 flex justify-center">
                      <ChapterPerformence />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <h2 className="text-center font-bold mb-2">
                  Focus Level, Study Hours & Average Chapter Marks Comparison
                </h2>
                <div className="h-96 w-full">
                  <MarksComparison />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollView>
    </div>
  );
};

export default analysis;
