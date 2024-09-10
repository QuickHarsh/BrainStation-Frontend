import Scrollbars from "react-custom-scrollbars-2";

const ContentCard = ({ content }) => {
  return (
    <Scrollbars
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
      autoHeight
      autoHeightMin={0}
      autoHeightMax={"calc(100vh - 200px)"}
      thumbMinSize={30}
      universal={true}
      className="rounded-lg"
    >
      <div className="flex flex-col gap-6">
        <div className="prose prose-lg text-gray-800" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </Scrollbars>
  );
};

export default ContentCard;
