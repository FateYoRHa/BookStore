import { useContext, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Calendar, Mail, MapPin } from "lucide-react";
import { EditingContext } from "../../context/customer_context";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useUploadPicture } from "../../hooks/customer_hooks";
import toast from "react-hot-toast";
const ProfileHeader = () => {
  const { isEditing, setEditing } = useContext(EditingContext);
  const { mutate, isPending } = useUploadPicture();
  const customerData = useAuthStore((state) => state.customer);
  const customer = customerData?.customer;
  const dateObj = new Date(customer?.createdAt);
  const getInitials = (name) => {
    if (!name) return "";

    const words = name.split(" ");
    const firstLetters = words.map((word) => word.charAt(0));
    return firstLetters.join("");
  };
  const initials = getInitials(customer?.name).toUpperCase();
  const date = dateObj.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const address = customer?.address[0];

  const fileInputRef = useRef(null);
  const onSubmit = () => {
    const file = fileInputRef.current?.files?.[0];

    if (!file) {
      toast.error("Image is required");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    mutate(formData);
  };
  console.log(customer?.image);
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src={customer?.image?.url} alt={customer?.name} />
              <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              variant="outline"
              className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full"
              onClick={() => fileInputRef?.current?.click()}>
              <Camera />
            </Button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={onSubmit}
              className="hidden"
            />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <h1 className="text-2xl font-bold">{customer?.name}</h1>
              <Badge variant="secondary">{customer?.customerCode}</Badge>
            </div>
            <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Mail className="size-4" />
                {customer?.user.email}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="size-4" />
                {address?.country}, {address?.city}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="size-4" />
                Joined {date}
              </div>
            </div>
          </div>
          <Button
            variant="default"
            onClick={() => setEditing(true)}
            disabled={isEditing}>
            {isEditing ? "Editing..." : "Edit Profile"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
