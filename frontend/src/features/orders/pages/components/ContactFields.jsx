import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const ContactFields = () => {
  return (
    <FieldGroup className="gap-3.5">
      <Field>
        <FieldLabel className="text-sm font-normal" htmlFor="checkout-email">
          Email
        </FieldLabel>
        <Input
          // {...field}
          // id="checkout-email"
          // aria-invalid={fieldState.invalid}
        />
        {/* {fieldState.invalid && <FieldError errors={[fieldState.error]} />} */}
      </Field>
      <Field orientation="horizontal">
        <Checkbox
          id="checkout-subscribe"
          // name={field.name}
          // checked={field.value}
          // onCheckedChange={field.onChange}
        />
        <FieldLabel htmlFor="checkout-subscribe" className="font-normal">
          Email me with news and offers
        </FieldLabel>
      </Field>
    </FieldGroup>
  );
};

export default ContactFields;
