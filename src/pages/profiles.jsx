import { useNavigate } from "react-router-dom";
import ProfileLayout from "@/components/layout/profile";

const ProfilePage = () => {
  const navigate = useNavigate();

  const navToMetrics = () => {
    navigate("/admin-portal/metrics");
  };

  // Sample data
  const userData = {
    userId: "1",
    profilePhoto: "https://example.com/sample-photo.jpg",
    userName: "Oshadha Thawalampola",
    email: "email@gmail.com",
    organization: "Sri Lanka Institute of Information Technology"
  };

  return (
    <div className="p-4 px-6">
      <ProfileLayout
        profilePhoto={userData.profilePhoto}
        userName={userData.userName}
        email={userData.email}
        organization={userData.organization}
        onClick={() => navToMetrics(userData.userId)}
      />
    </div>
  );
};

export default ProfilePage;
