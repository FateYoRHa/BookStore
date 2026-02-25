import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
const DateInput = () => {
  // const form = useFormContext();

  return (
    <Field>
      <FieldLabel
        className="text-sm font-normal"
        htmlFor="checkout-payment-expiryDate">
        Expiry Date
      </FieldLabel>
    <Input
              /* // {...field}
            onChange={(e) => {
              let val = e.target.value;
              val = val.replace(/[^0-9/]/g, "");

              const prev = field.value ?? "";
              const isDeleting = val.length < prev.length;

              if (!isDeleting) {
                if (val.length === 2 && !val.includes("/")) {
                  val = val + "/";
                }
              }

              if (val.length > 5) {
                val = val.slice(0, 5);
              }

              field.onChange(val);
            }}
            pattern="^(0[1-9]|1[0-2])/[0-9]{2}$"
            placeholder="MM/YY"
            id="checkout-payment-expiryDate"
            aria-invalid={fieldState.invalid} */
          />
    </Field>
  );
};
export default DateInput;