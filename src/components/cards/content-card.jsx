const ContentCard = ({ title, content }) => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-semibold text-3xl">{title}</h1>
      <div className="prose text-lg" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default ContentCard;
