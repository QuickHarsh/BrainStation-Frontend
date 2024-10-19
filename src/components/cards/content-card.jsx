import ScrollView from "../common/scrollable-view";

const ContentCard = ({ content }) => {
  return (
    <ScrollView initialMaxHeight="13rem">
      <div className="flex flex-col gap-6">
        <div className="prose prose-lg text-gray-800" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </ScrollView>
  );
};

export default ContentCard;
