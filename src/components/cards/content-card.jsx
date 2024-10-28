import { useState } from "react";
import mindMapIcon from "@/assets/images/mind-mapping.png";
import Loader from "@/components/common/loader";
import Ontology from "@/pages/ontology";
import { checkOntologyExists, createOntology } from "@/service/ontology";
import DialogBox from "../common/dialog";
import ScrollView from "../common/scrollable-view";
import OntologyPopup from "../ontology/ontology-popup";

const ContentCard = ({ content, lectureId }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDialog, setShowDialog] = useState(false); // Controls dialog visibility
  const [loading, setLoading] = useState(false); // Loading state

  const handleClose = () => setIsVisible(false);

  const data = {
    lectureId: lectureId
  };

  const checkOntology = async () => {
    const result = await checkOntologyExists(data);
    if (result === true) {
      setIsVisible(true);
    } else {
      setShowDialog(true);
    }
  };

  const handleOkay = () => {
    const generateOntology = async () => {
      setLoading(true); // Start loading animation
      setShowDialog(false); // Hide dialog box while loading
      await createOntology(data);
      setLoading(false); // Stop loading animation
      setIsVisible(true);
    };

    generateOntology();
  };

  // Handle "Cancel" click in the dialog
  const handleCancel = () => {
    setShowDialog(false);
  };

  return (
    <>
      <ScrollView initialMaxHeight="13rem">
        <div className="w-full flex flex-col items-center justify-center gap-6">
          <div
            className="prose prose-lg text-gray-800 text-justify mx-auto w-full max-w-4xl"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <button
            className="fixed bottom-16 right-8 bg-horizontal-gradient text-white py-3 px-3 rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
            onClick={checkOntology}
          >
            <img src={mindMapIcon} alt="Mind Map Icon" className="w-10 h-10" />
          </button>
        </div>
      </ScrollView>

      {/* Display Loader when loading is true */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Loader /> {/* Show loading component in the center of the screen */}
        </div>
      )}

      {/* Show DialogBox only when not loading */}
      {!loading && (
        <DialogBox
          isVisible={showDialog}
          message="Do you want to generate an Ontology for this lecture?"
          onOkay={handleOkay}
          onCancel={handleCancel}
          okayLabel="Yes"
          cancelLabel="No"
        />
      )}

      <OntologyPopup isVisible={isVisible} onClose={handleClose} lectureId={lectureId}>
        <Ontology lectureId={lectureId} />
      </OntologyPopup>
    </>
  );
};

export default ContentCard;
