import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import FormFieldError from "@/components/forms/FormFieldError";

const ContactFields = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <FieldGroup className="gap-3.5">
      <Field>
        <FieldLabel
          className="text-sm font-normal"
          htmlFor="checkout-firstName">
          Name
        </FieldLabel>
        <Input
          id="name"
          {...register("name")}
          className={cn(
            errors?.name && "border-red-500 focus-visible:ring-red-500",
          )}
        />
        <FormFieldError error={errors?.name} helper="" />
      </Field>
      <Field>
        <FieldLabel className="text-sm font-normal" htmlFor="checkout-email">
          Email
        </FieldLabel>
        <Input
          {...register("email")}
          id="email"
          type="email"
          readOnly
        />
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="checkout-subscribe" />
        <FieldLabel htmlFor="checkout-subscribe" className="font-normal">
          Email me with news and offers
        </FieldLabel>
      </Field>
      <Field>
        <FieldLabel className="text-sm font-normal" htmlFor="checkout-phone">
          Phone
        </FieldLabel>
        <Input
          id="phone"
          {...register("phone")}
          className={cn(
            errors?.phone && "border-red-500 focus-visible:ring-red-500",
          )}
        />
        <FormFieldError error={errors?.phone} helper="" />
      </Field>
    </FieldGroup>
  );
};

export default ContactFields;
