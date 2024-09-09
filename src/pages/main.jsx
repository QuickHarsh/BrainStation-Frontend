import Scrollbars from "react-custom-scrollbars-2";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "@/components";
import ModuleCard from "@/components/cards/module-card";
import useFetchData from "@/hooks/fetch-data";
import { getAllModules } from "@/service/module";
import { setModules } from "@/store/moduleSlice";

const Main = () => {
  const dispatch = useDispatch();
  const modules = useSelector((state) => state.modules.modules);

  const modulesData = useFetchData(getAllModules);
  console.log(modulesData);

  if (modulesData && modules.length === 0) {
    const modulesWithProgress = modulesData.data.docs.map((module) => ({
      ...module,
      progress: 50
    }));
    dispatch(setModules(modulesWithProgress));
  }

  return (
    <div className="p-4 px-6">
      {/* header */}
      <h1 className="font-inter font-bold text-2xl">Welcome, Choose a module to get started!</h1>

      {!modulesData ? (
        <div className="flex justify-center items-center">
          <Loader /> {/* Show loader while fetching data */}
        </div>
      ) : (
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
          <div className="grid grid-cols-3 gap-4 mt-8 mb-4 mx-1">
            {modules.length > 0 ? (
              modules.map((module) => (
                <ModuleCard key={module._id} moduleId={module._id} title={module.name} progress={module.progress} />
              ))
            ) : (
              <div className="text-center text-lg font-bold">No modules available.</div>
            )}
          </div>
        </Scrollbars>
      )}
    </div>
  );
};

export default Main;
