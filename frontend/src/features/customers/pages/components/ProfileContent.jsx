import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import PersonalInfoTab from "./PersonalInfoTab";
import AccountTab from "./AccountTab";
import SecurityTab from "./SecurityTab";
import NotificationsTab from "./NotificationsTab";

const ProfileContent = ({ isEditing, setEditing, customer }) => {
  return (
    <Tabs defaultValue="personal" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="personal">Personal</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>

      {/* Personal Information */}
      <TabsContent value="personal" className="space-y-6">
        <PersonalInfoTab
          isEditing={isEditing}
          setEditing={setEditing}
          customer={customer}
        />
      </TabsContent>

      {/* Account Settings */}
      <TabsContent value="account" className="space-y-6">
        <AccountTab />
      </TabsContent>

      {/* Security Settings */}
      <TabsContent value="security" className="space-y-6">
        <SecurityTab />
      </TabsContent>

      {/* Notification Settings */}
      <TabsContent value="notifications" className="space-y-6">
        <NotificationsTab />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileContent;
