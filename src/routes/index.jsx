import { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { DefaultLayout, Loader } from "@/components";
import { Main, Study } from "@/pages";
import NotFound from "@/pages/404";
import QuizDeck from "@/pages/quiz-deck";
import Progress from "@/pages/Progress";
import support from "@/pages/support";
import analysis from "@/pages/analysis";

// Ensure Loader is imported correctly

const coreRoutes = [
  {
    path: "/",
    title: "Home",
    component: Main
  },
  {
    path: "/study",
    title: "study",
    component: Study
  },
  {
    path: "/quiz-deck",
    title: "quiz-deck",
    component: QuizDeck
  },
  {
    path: "/Progress",
    title: "Progress",
    component: Progress
  },
  {
    path: "/support",
    title: "support",
    component: support
  },
  {
    path: "/analysis",
    title: "analysis",
    component: analysis
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

          return (
            <Route
              key={index}
              path={path}
              element={
                <Suspense fallback={<Loader />}>
                  <Component />
                </Suspense>
              }
            />
          );
        })}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default CustomRoutes;
