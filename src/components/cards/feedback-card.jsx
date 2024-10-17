const FeedbackCard = ({ title, items, bgColor, noItemsText }) => (
  <div className={`${bgColor} p-8 rounded-lg`}>
    <p className="font-josfin-sans text-lg text-slate-600">{title}</p>
    <ul className="text-base text-slate-800 list-disc">
      {items?.length > 0 ? (
        items.map((item, index) => (
          <li
            key={index}
            className="mb-2 ml-8"
            dangerouslySetInnerHTML={{
              __html: item
            }}
          />
        ))
      ) : (
        <li>{noItemsText}</li>
      )}
    </ul>
  </div>
);

export default FeedbackCard;
