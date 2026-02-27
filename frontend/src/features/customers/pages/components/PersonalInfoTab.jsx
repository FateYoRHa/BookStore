import { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import FormFieldError from "@/components/forms/FormFieldError";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";

import { EditingContext } from "../../context/customer_context";
import { useAuthStore } from "@/features/auth/store/authStore";
import { updateCustomer } from "../../customerSchema";
import { useUpdateCustomer } from "../../hooks/customer_hooks";
const PersonalInfoTab = () => {
  const { isEditing, setEditing } = useContext(EditingContext);
  const customer = useAuthStore((state) => state.customer).customer;
  const address = customer?.address[0];

  const { mutate, isPending } = useUpdateCustomer();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(updateCustomer),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        setEditing(false);
      },
      onError: (error) => {
        if (error.response?.data?.errors) {
          error.response.data.errors.forEach((err) => {
            setError(err.field, {
              type: "server",
              message: err.message,
            });
          });
        } else if (error.request) {
          // Request made but no response
          toast.error("Server not responding");
        } else {
          // Something else
          toast.error("Unexpected error occurred");
        }
      },
    });
  };
  const handleClick = () => {
    if (!isPending) return;
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                {...register("name")}
                id="name"
                defaultValue={customer?.name}
                disabled={!isEditing}
                className={cn(
                  errors?.name && "border-red-500 focus-visible:ring-red-500",
                )}
              />
              <FormFieldError error={errors.name} helper="" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                // {...register("email")}
                id="email"
                type="email"
                defaultValue={customer?.user?.email}
                disabled
                // className={cn(
                //   errors?.email && "border-red-500 focus-visible:ring-red-500",
                // )}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                {...register("phone")}
                id="phone"
                defaultValue={customer?.phone}
                disabled={!isEditing}
                className={cn(
                  errors?.phone && "border-red-500 focus-visible:ring-red-500",
                )}
              />
              <FormFieldError error={errors.phone} helper="" />
            </div>
          </div>

          <Separator />
          {/* ADDRESS */}
          <h2 className="font-semibold">Address</h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="street">Street</Label>
              <Input
                {...register("address.street")}
                id="street"
                defaultValue={address?.street}
                disabled={!isEditing}
                className={cn(
                  errors?.address?.street &&
                    "border-red-500 focus-visible:ring-red-500",
                )}
              />
              <FormFieldError error={errors?.address?.street} helper="" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                {...register("address.city")}
                id="city"
                defaultValue={address?.city}
                disabled={!isEditing}
                className={cn(
                  errors?.address?.city &&
                    "border-red-500 focus-visible:ring-red-500",
                )}
              />
              <FormFieldError error={errors?.address?.city} helper="" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode">ZipCode</Label>
              <Input
                {...register("address.zipCode")}
                id="zipCode"
                type="text"
                inputMode="numeric"
                pattern="\d*"
                defaultValue={address?.zipCode}
                disabled={!isEditing}
                className={`[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none appearance-none ${
                  errors?.address?.zipCode &&
                  "border-red-500 focus-visible:ring-red-500"
                }`}
              />
              <FormFieldError error={errors?.address?.zipCode} helper="" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                {...register("address.country")}
                id="country"
                defaultValue={address?.country}
                disabled={!isEditing}
                className={cn(
                  errors?.address?.country &&
                    "border-red-500 focus-visible:ring-red-500",
                )}
              />
              <FormFieldError error={errors?.address?.country} helper="" />
            </div>
          </div>
          <div
            className="float-right justify-end"
            hidden={!isEditing}
            // onClick={handleClick}
          >
            <Button type="submit">{isPending ? "Updating..." : "Save"}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoTab;
