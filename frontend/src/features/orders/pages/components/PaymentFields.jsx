import { Controller, useFormContext } from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import PaymentFieldMethod from "./PaymentFieldMethod";

const PaymentFields = () => {
  // const { control, watch } = useFormContext();
  const { control } = useFormContext();
  // const method = watch("payment.type");
  return (
    <div className="space-y-7">
      <Controller
        name="payment.type"
        control={control}
        render={({ field }) => (
          <Field>
            <RadioGroup
              value={field.value ?? "CoD"}
              onValueChange={field.onChange}>
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
                    value="card"
                    id="checkout-payment-method-1"
                    // aria-invalid={fieldState.invalid}
                  />
                </Field>
              </FieldLabel>
              {/* <FieldLabel htmlFor="checkout-payment-method-2">
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
              </FieldLabel> */}
              <FieldLabel htmlFor="checkout-payment-method-3">
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>Online Bank Transfer</FieldTitle>
                  </FieldContent>
                  <RadioGroupItem
                    value="qrph"
                    id="checkout-payment-method-3"
                    // aria-invalid={fieldState.invalid}
                  />
                </Field>
              </FieldLabel>
              <FieldLabel htmlFor="checkout-payment-method-4">
                <Field orientation="horizontal">
                  <FieldContent className="flex-1">
                    <FieldTitle>GCash</FieldTitle>
                  </FieldContent>
                  <img
                    src="https://res.cloudinary.com/dfmczwzb8/image/upload/v1772419164/GCash_idOP67IR4D_1_mw73cn.png"
                    alt="GCash"
                    className="size-5"
                  />
                  <RadioGroupItem
                    value="gcash"
                    id="checkout-payment-method-4"
                    // aria-invalid={fieldState.invalid}
                  />
                </Field>
              </FieldLabel>
            </RadioGroup>
          </Field>
        )}
      />
      {/* <PaymentFieldMethod method={method} /> */}
    </div>
  );
};

export default PaymentFields;
