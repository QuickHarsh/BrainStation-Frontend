import { Route, Routes, useLocation } from "react-router-dom";
import { DefaultLayout } from "@/components";
import { Main, Study } from "@/pages";
import NotFound from "@/pages/404";
import QuizDeck from "@/pages/quiz-deck";

// Ensure Loader is imported correctly

const coreRoutes = [
  {
    path: "/",
    title: "Home",
    component: Main
  },
  {
    path: "/study/:moduleId",
    title: "study",
    component: Study
  },
  {
    path: "/quiz-deck",
    title: "quiz-deck",
    component: QuizDeck
  }
];

const CustomRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location}>
      {/* Routes with DefaultLayout */}
      <Route element={<DefaultLayout />}>
        {coreRoutes.map((route, index) => {
          const { path, component: Component } = route;

          return <Route key={index} path={path} element={<Component />} />;
        })}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default CustomRoutes;
