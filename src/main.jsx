import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { default as App } from "@/app";
import "@/styles/index.css";
import store from "./store";

const Root = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 400);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isSmallScreen) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <p style={{ fontSize: "1.5rem", textAlign: "center" }}>
          Please use a desktop device to access this application.
        </p>
      </div>
    );
  }

  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter basename="/">
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
