import ModuleCard from "@/components/cards/module-card";

// Sample data with the full object
const modules = [
  {
    moduleId: 1,
    title: "Foundations of Computing: Data Structures, Algorithms, and Operating Systems",
    data: {
      final_classification: "No ADHD symptoms",
      focus_time: 8.933333333333312,
      total_movements: 37,
      erratic_movements: 0,
      erratic_percentage: 0,
      emotion_distribution: {
        Happy: 92.2972972972973,
        Angry: 7.7027027027027026
      }
    }
  }
  // More modules...
];

const Main = () => {
  return (
    <div className="p-4 px-6">
      {/* header */}
      <h1 className="font-inter font-bold text-2xl">Welcome, Choose a module to get started!</h1>
      {/* Module cards */}
      <div className=" flex gap-4 mt-8">
        {modules.map((module) => (
          <ModuleCard
            key={module.moduleId}
            moduleId={module.moduleId}
            title={module.title}
            data={module.data} // Pass the full data object
          />
        ))}
      </div>
    </div>
  );
};

export default Main;
