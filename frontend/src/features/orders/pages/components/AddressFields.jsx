import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
const AddressField = () => {
  return (
    <FieldGroup className="gap-3.5">
      <Field>
        <FieldLabel className="text-sm font-normal" htmlFor="checkout-country">
          Country
        </FieldLabel>
        <Input
        // {...field}
        // id="checkout-country"
        // aria-invalid={fieldState.invalid}
        />
        {/* {fieldState.invalid && <FieldError errors={[fieldState.error]} />} */}
      </Field>
      <div className="flex gap-3.5 max-sm:flex-col">
        <Field>
          <FieldLabel
            className="text-sm font-normal"
            htmlFor="checkout-firstName">
            First Name
          </FieldLabel>
          <Input
          // {...field}
          // id="checkout-firstName"
          // aria-invalid={fieldState.invalid}
          />
          {/* {fieldState.invalid && <FieldError errors={[fieldState.error]} />} */}
        </Field>
        <Field>
          <FieldLabel
            className="text-sm font-normal"
            htmlFor="checkout-lastName">
            Last Name
          </FieldLabel>
          <Input
          // {...field}
          // id="checkout-lastName"
          // aria-invalid={fieldState.invalid}
          />
          {/* {fieldState.invalid && <FieldError errors={[fieldState.error]} />} */}
        </Field>
      </div>
      <Field>
        <FieldLabel className="text-sm font-normal" htmlFor="checkout-address">
          Address
        </FieldLabel>
        <Input
        // {...field}
        // id="checkout-address"
        // aria-invalid={fieldState.invalid}
        />
        {/* {fieldState.invalid && <FieldError errors={[fieldState.error]} />} */}
      </Field>
      <div className="flex gap-3.5 max-sm:flex-col">
        <Field>
          <FieldLabel
            className="text-sm font-normal"
            htmlFor="checkout-postalCode">
            Postal Code
          </FieldLabel>
          <Input
          // {...field}
          // id="checkout-postalCode"
          // aria-invalid={fieldState.invalid}
          />
          {/* {fieldState.invalid && <FieldError errors={[fieldState.error]} />} */}
        </Field>
        <Field>
          <FieldLabel className="text-sm font-normal" htmlFor="checkout-city">
            City
          </FieldLabel>
          <Input
          // {...field}
          // id="checkout-city"
          // aria-invalid={fieldState.invalid}
          />
          {/* {fieldState.invalid && <FieldError errors={[fieldState.error]} />} */}
        </Field>
      </div>
      <Field>
        <FieldLabel className="text-sm font-normal" htmlFor="checkout-phone">
          Phone
        </FieldLabel>
        <Input
        // {...field}
        // id="checkout-phone"
        // aria-invalid={fieldState.invalid}
        />
        {/* {fieldState.invalid && <FieldError errors={[fieldState.error]} />} */}
      </Field>
    </FieldGroup>
  );
};

export default AddressField;
