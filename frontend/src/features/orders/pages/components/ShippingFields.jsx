import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
const ShippingField = () => {
  return (
    <Field>
      <RadioGroup
        // name={field.name}
        // value={field.value}
        // onValueChange={field.onChange}
        className="flex max-sm:flex-col">
        <FieldLabel htmlFor="checkout-shippingMethod-1">
          <Field orientation="vertical">
            <FieldContent>
              <FieldTitle>UPS</FieldTitle>
              <FieldDescription>Delivery: Tomorrow</FieldDescription>
            </FieldContent>
            <div className="flex gap-3.5">
              <p className="text-sm">$10.00</p>
              <RadioGroupItem
                value="UPS"
                id="checkout-shippingMethod-1"
                // aria-invalid={fieldState.invalid}
              />
            </div>
          </Field>
        </FieldLabel>
        <FieldLabel htmlFor="checkout-shippingMethod-2">
          <Field orientation="vertical">
            <FieldContent>
              <FieldTitle>FedEx</FieldTitle>
              <FieldDescription>Delivery: Next Week</FieldDescription>
            </FieldContent>
            <div className="flex gap-3.5">
              <p className="text-sm">$2.99</p>
              <RadioGroupItem
                value="FedEx"
                id="checkout-shippingMethod-2"
                // aria-invalid={fieldState.invalid}
              />
            </div>
          </Field>
        </FieldLabel>
      </RadioGroup>
      {/* {fieldState.invalid && <FieldError errors={[fieldState.error]} />} */}
    </Field>
  );
};

export default ShippingField;
