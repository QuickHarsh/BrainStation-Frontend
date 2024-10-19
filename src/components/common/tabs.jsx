const Tabs = ({ tabs, selectedTab, handleTabClick }) => {
  return (
    <ul className="flex w-full" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
      {tabs.map((tab) => (
        <li key={tab.id} className="flex-1" role="presentation">
          <button
            className={`w-full py-4 text-sm font-medium text-center border-b-2 rounded-none ${
              selectedTab === tab.id
                ? "text-[#0b54a0] border-[#0b54a0]"
                : "text-gray-500 hover:text-gray-600 hover:border-gray-300 border-transparent"
            }`}
            id={`${tab.id}-tab`}
            data-tabs-target={`#${tab.id}`}
            type="button"
            role="tab"
            aria-controls={tab.id}
            aria-selected={selectedTab === tab.id}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
