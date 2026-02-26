import { useState } from "react";
import ProfileHeader from "./components/ProfileHeader";
import ProfileContent from "./components/ProfileContent";

import { EditingContext } from "../context/customer_context";
const Profile = () => {
  const [isEditing, setEditing] = useState(false);

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-10">
      {/* use context to pass state to all children/grandchildren */}
      <EditingContext value={{ isEditing, setEditing }}>
        <ProfileHeader />
        <ProfileContent />
      </EditingContext>
    </div>
  );
};

export default Profile;
