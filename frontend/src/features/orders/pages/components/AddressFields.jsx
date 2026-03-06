import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import FormFieldError from "@/components/forms/FormFieldError";
const AddressField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <FieldGroup className="gap-3.5">
      <Field>
        <FieldLabel className="text-sm font-normal" htmlFor="checkout-address">
          Street
        </FieldLabel>
        <Input
          id="street"
          {...register("address.street")}
          className={cn(
            errors?.address?.street &&
              "border-red-500 focus-visible:ring-red-500",
          )}
        />
        <FormFieldError error={errors?.address?.street} helper="" />
      </Field>
      <div className="flex gap-3.5 max-sm:flex-col">
        <Field>
          <FieldLabel className="text-sm font-normal" htmlFor="checkout-city">
            City
          </FieldLabel>
          <Input
            id="city"
            {...register("address.city")}
            className={cn(
              errors?.address?.city &&
                "border-red-500 focus-visible:ring-red-500",
            )}
          />
          <FormFieldError error={errors?.address?.city} helper="" />
        </Field>
        <Field>
          <FieldLabel
            className="text-sm font-normal"
            htmlFor="checkout-postalCode">
            Zip Code
          </FieldLabel>
          <Input
            id="zipCode"
            type="text"
            inputMode="numeric"
            pattern="\d*"
            {...register("address.zipCode")}
            className={cn(
              errors?.address?.zipCode &&
                "border-red-500 focus-visible:ring-red-500",
            )}
          />
          <FormFieldError error={errors?.address?.zipCode} helper="" />
        </Field>
      </div>
      <Field>
        <FieldLabel className="text-sm font-normal" htmlFor="checkout-country">
          Country
        </FieldLabel>
        <Input
          id="address"
          {...register("address.country")}
          className={cn(
            errors?.address?.country &&
              "border-red-500 focus-visible:ring-red-500",
          )}
        />
        <FormFieldError error={errors?.address?.country} helper="" />
      </Field>
    </FieldGroup>
  );
};

export default AddressField;
