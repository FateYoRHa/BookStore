import { useState } from "react";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import PaymentFieldMethod from "./PaymentFieldMethod";
const PaymentFields = () => {
  const [method, setMethod] = useState("CoD");

  const handleOnValueChange = (value) => {
    setMethod(value);
  };
  return (
    <div className="space-y-7">
      <Field>
        <RadioGroup
          //     name={field.name}
          value={method}
          onValueChange={handleOnValueChange}>
          <FieldLabel htmlFor="checkout-payment-method-0">
            <Field orientation="horizontal">
              <FieldContent className="flex-1">
                <FieldTitle>Cash on Delivery</FieldTitle>
              </FieldContent>
              <RadioGroupItem
                value="CoD"
                id="checkout-payment-method-0"
                // aria-invalid={fieldState.invalid}
              />
            </Field>
          </FieldLabel>
          <FieldLabel htmlFor="checkout-payment-method-1">
            <Field orientation="horizontal">
              <FieldContent className="flex-1">
                <FieldTitle>Credit Card</FieldTitle>
              </FieldContent>
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/visa-icon.svg"
                alt="Credit Card"
                className="size-5"
              />
              <RadioGroupItem
                value="creditCard"
                id="checkout-payment-method-1"
                // aria-invalid={fieldState.invalid}
              />
            </Field>
          </FieldLabel>
          <FieldLabel htmlFor="checkout-payment-method-2">
            <Field orientation="horizontal">
              <FieldContent className="flex-1">
                <FieldTitle>PayPal</FieldTitle>
              </FieldContent>
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/paypal-icon.svg"
                alt="PayPal"
                className="size-5"
              />
              <RadioGroupItem
                value="paypal"
                id="checkout-payment-method-2"
                // aria-invalid={fieldState.invalid}
              />
            </Field>
          </FieldLabel>
          <FieldLabel htmlFor="checkout-payment-method-3">
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>Online Bank Transfer</FieldTitle>
              </FieldContent>
              <RadioGroupItem
                value="onlineBankTransfer"
                id="checkout-payment-method-3"
                // aria-invalid={fieldState.invalid}
              />
            </Field>
          </FieldLabel>
        </RadioGroup>
        {/* {fieldState.invalid && <FieldError errors={[fieldState.error]} />} */}
      </Field>
      <PaymentFieldMethod method={method} />
    </div>
  );
};

export default PaymentFields;
