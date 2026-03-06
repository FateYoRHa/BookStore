import { useFormContext } from "react-hook-form";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import FormFieldError from "@/components/forms/FormFieldError";

const DateInput = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // remove non-digits

    if (value.length > 4) value = value.slice(0, 4);

    if (value.length >= 3) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }

    setValue("payment.expiryDate", value, {
      shouldValidate: true,
    });
  };

  return (
    <Field>
      <FieldLabel
        className="text-sm font-normal"
        htmlFor="checkout-payment-expiryDate">
        Expiry Date
      </FieldLabel>

      <Input
        id="checkout-payment-expiryDate"
        placeholder="MM/YY"
        maxLength={5}
        {...register("payment.expiryDate")}
        onChange={handleExpiryChange}
        className={cn(
          errors?.payment?.expiryDate &&
            "border-red-500 focus-visible:ring-red-500",
        )}
      />

      <FormFieldError error={errors?.payment?.expiryDate} />
    </Field>
  );
};

export default DateInput;
