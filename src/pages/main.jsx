import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ModuleCard from "@/components/cards/module-card";
import ScrollView from "@/components/common/scrollable-view";
import MainSkeleton from "@/components/skeletons/main";
import useFetchData from "@/hooks/fetch-data";
import { getAllModules } from "@/service/module";
import { setCurrentModule } from "@/store/lecturesSlice";
import { setModules } from "@/store/moduleSlice";

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modules = useSelector((state) => state.modules.modules);

  // Fetch modules data
  const modulesData = useFetchData(getAllModules);

  // Check if modulesData is available and contains docs before proceeding
  if (modulesData && modulesData.data?.docs && modules.length === 0) {
    const modulesWithProgress = modulesData.data.docs.map((module) => ({
      ...module,
      progress: 50 // Add progress field to each module
    }));

    dispatch(setModules(modulesWithProgress));

    const currentModule = localStorage.getItem("currentModule");
    if (!currentModule && modulesWithProgress.length > 0) {
      localStorage.setItem("currentModule", modulesWithProgress[0]._id);
    }
  }

  const handleModuleClick = (moduleId) => {
    dispatch(setCurrentModule(moduleId)); // Set the selected module
    navigate(`/study/${moduleId}`); // Navigate to the Study page with moduleId
  };

  return (
    <div className="p-4 px-6">
      <h1 className="font-inter font-bold text-2xl">Welcome, Choose a module to get started!</h1>

      {!modulesData || modulesData.loading ? (
        <MainSkeleton />
      ) : (
        <ScrollView>
          <div className="grid grid-cols-3 gap-4 mt-8 mb-4 mx-1">
            {modules.length > 0 ? (
              modules.map((module) => (
                <ModuleCard
                  key={module._id}
                  moduleId={module._id}
                  title={module.name}
                  progress={module.progress}
                  onClick={() => handleModuleClick(module._id)} // Handle click on module
                />
              ))
            ) : (
              <div className="text-center text-lg font-bold">No modules available.</div>
            )}
          </div>
        </ScrollView>
      )}
    </div>
  );
};

export default Main;
