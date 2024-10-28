import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ModuleCard from "@/components/cards/module-card";
import ScrollView from "@/components/common/scrollable-view";
import MainSkeleton from "@/components/skeletons/main";
import useFetchData from "@/hooks/fetch-data";
import { getUserModules } from "@/service/user";
import { setCurrentModule } from "@/store/lecturesSlice";
import { setModules } from "@/store/moduleSlice";

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modules = useSelector((state) => state.modules.modules);

  const modulesData = useFetchData(getUserModules);

  useEffect(() => {
    if (modulesData && modulesData.data && modulesData.data.length > 0 && modules.length === 0) {
      // Only dispatch if modulesData is non-empty and not already set
      const modulesWithProgress = modulesData.data.map((module) => ({
        ...module,
        progress: 50
      }));

      dispatch(setModules(modulesWithProgress));

      const currentModule = localStorage.getItem("currentModule");
      if (!currentModule && modulesWithProgress.length > 0) {
        localStorage.setItem("currentModule", modulesWithProgress[0]._id);
      }
    }
  }, [modulesData, modules, dispatch]);

  const handleModuleClick = (moduleId) => {
    dispatch(setCurrentModule(moduleId));
    localStorage.setItem("currentModule", moduleId);
    navigate(`/study/${moduleId}`);
  };

  return (
    <div className="p-4 px-6">
      <h1 className="font-inter font-bold text-2xl">Welcome, Choose a module to get started!</h1>

      {!modulesData || modulesData.loading ? (
        <MainSkeleton />
      ) : (
        <ScrollView initialMaxHeight="0rem">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 mt-8 mb-4 mx-1 place-items-center">
            {modules.length > 0 ? (
              modules.map((module) => (
                <ModuleCard
                  key={module._id}
                  moduleId={module._id}
                  title={module.name}
                  progress={module.progress}
                  onClick={() => handleModuleClick(module._id)}
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
