import { useEffect, useState } from "react";

const LastActivityCard = () => {
  const [lastActivity, setLastActivity] = useState("");

  useEffect(() => {
    const storedActivity = localStorage.getItem("lastActivity");
    setLastActivity(storedActivity || "No recent activity");
  }, []);

  return (
    <div className="mt-4 relative bg-horizontal-gradient p-6 mx-[0.4rem] rounded-xl text-white hover:opacity-80">
      <p className="font-josfin-sans text-xl mb-2">Where you left</p>
      <p className="text-xs font-inter">{lastActivity}</p>
    </div>
  );
};

export default LastActivityCard;
