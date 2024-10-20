import { useState } from "react";
import mindMapIcon from "@/assets/images/mind-mapping.png";
import Ontology from "@/pages/ontology";
import { checkOntologyExists, createOntology } from "@/service/ontology";
import DialogBox from "../common/dialog";
import ScrollView from "../common/scrollable-view";
import OntologyPopup from "../ontology/ontology-popup";

const ContentCard = ({ content, lectureId }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDialog, setShowDialog] = useState(false); // Controls dialog visibility

  const handleClose = () => setIsVisible(false);

  const data = {
    userId: "66d97b6fc30a1f78cf41b620",
    lectureId: lectureId
  };

  const checkOntology = async () => {
    const result = await checkOntologyExists(data);
    if (result === true) {
      setIsVisible(true); // Directly show the main popup
    } else {
      setShowDialog(true); // Show the dialog box
    }
  };

  // Handle the "Okay" click in the dialog
  const handleOkay = () => {
    const generateOntology = async () => {
      await createOntology(data);
      setShowDialog(false);
      setIsVisible(true); // Show the main popup after confirmation
    };

    generateOntology();
  };

  // Handle "Cancel" click in the dialog
  const handleCancel = () => {
    setShowDialog(false);
  };

  return (
    <>
      <ScrollView>
        <div className="flex flex-col gap-6">
          <div className="prose prose-lg text-gray-800" dangerouslySetInnerHTML={{ __html: content }} />
          <button
            className="fixed bottom-16 right-8 bg-horizontal-gradient text-white py-3 px-3 rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
            onClick={checkOntology}
          >
            <img src={mindMapIcon} alt="Mind Map Icon" className="w-10 h-10" />
          </button>
        </div>
      </ScrollView>

      <DialogBox
        isVisible={showDialog}
        message="Do you want to generate an Ontology for this lecture?"
        onOkay={handleOkay}
        onCancel={handleCancel}
        okayLabel="Yes"
        cancelLabel="No"
      />

      <OntologyPopup isVisible={isVisible} onClose={handleClose} lectureId={lectureId}>
        <Ontology lectureId={lectureId} />
      </OntologyPopup>
    </>
  );
};

export default ContentCard;
