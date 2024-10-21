import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Loader from "@/components/common/animating-dots";
import { updateOntology } from "@/service/ontology";
import RefreshIcon from "../icons/refresh-icon";

const OntologyPopup = ({ isVisible, onClose, children, className = "", contentClassName = "", lectureId }) => {
  const [loading, setLoading] = useState(false);

  const requestData = {
    userId: "66d97b6fc30a1f78cf41b620",
    lectureId: lectureId
  };

  const handleApiCall = async () => {
    setLoading(true);
    await updateOntology(requestData); // Call the backend API
    setLoading(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className={twMerge(
        `fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] transition-opacity duration-300`,
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none",
        className
      )}
    >
      <div
        className={twMerge(
          `bg-[#fdf5ea] relative rounded-xl shadow-lg w-[90%] h-[90%] p-6 transform transition-all duration-300 overflow-hidden`,
          isVisible ? "scale-100" : "scale-90",
          contentClassName
        )}
      >
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Loader /> {/* Display the loading component */}
          </div>
        ) : (
          <>
            {children}
            <button className="absolute top-2 right-4 text-xl" onClick={onClose}>
              x
            </button>
            <button
              className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
              onClick={handleApiCall}
              disabled={loading} // Disable the button while loading
            >
              <RefreshIcon color="white" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default OntologyPopup;
