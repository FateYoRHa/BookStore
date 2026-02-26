import { useContext } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { EditingContext } from "../../context/customer_context";
import { useAuthStore } from "@/features/auth/store/authStore";
const PersonalInfoTab = () => {
  const { isEditing, setEditing } = useContext(EditingContext);
  const customer = useAuthStore((state) => state.customer).customer;
  const address = customer?.address[0];

  const handleClick = () => {
    setEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Update your personal details and profile information.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              defaultValue={customer?.name}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue={customer?.user?.email}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              defaultValue={customer?.phone}
              disabled={!isEditing}
            />
          </div>
        </div>

        <Separator />
        {/* ADDRESS */}
        <h2 className="font-semibold">Address</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="street">Street</Label>
            <Input
              id="street"
              defaultValue={address?.street}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              defaultValue={address?.city}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipCode">ZipCode</Label>
            <Input
              id="zipCode"
              type="number"
              defaultValue={address?.zipCode}
              disabled={!isEditing}
              className="[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none appearance-none"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              defaultValue={address?.country}
              disabled={!isEditing}
            />
          </div>
        </div>
        <div
          className="float-right justify-end"
          hidden={!isEditing}
          onClick={handleClick}>
          <Button>Save</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoTab;
