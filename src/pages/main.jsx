import ModuleCard from "@/components/cards/module-card";

// Sample data, ensure you have correct data structure
const modules = [
  { moduleId: 1, title: "Foundations of Computing: Data Structures, Algorithms, and Operating Systems", progress: 50 },
  { moduleId: 2, title: "Module 2", progress: 30 },
  { moduleId: 3, title: "Module 3", progress: 70 }
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
            progress={module.progress}
          />
        ))}
      </div>
    </div>
  );
};

export default Main;
