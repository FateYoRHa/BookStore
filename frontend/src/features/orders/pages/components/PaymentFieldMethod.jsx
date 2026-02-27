import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import DateInput from "./DateInput"

const PaymentFieldMethod = ({ method }) => {
  const PAYMENT_METHODS = {
    creditCard: "creditCard",
    paypal: "paypal",
    onlineBankTransfer: "onlineBankTransfer",
    CoD: "Cash on Delivery",
  };
  if (!method) return;

  switch (method) {
    case PAYMENT_METHODS.CoD:
      return (
        <Field>
          <FieldLabel
            className="text-sm font-normal"
            htmlFor="checkout-payment-payPalEmail">
            PayPal Email
          </FieldLabel>
          <Input
            // {...field}
            type="email"
            placeholder="you-email-here@email.com"
            id="checkout-payment-payPalEmail"
            // aria-invalid={fieldState.invalid}
          />
          {/* {fieldState.invalid && <FieldError errors={[fieldState.error]} />} */}
        </Field>
      );

    case PAYMENT_METHODS.creditCard:
      return (
        <div className="space-y-3.5">
          <Field>
            <FieldLabel
              className="text-sm font-normal"
              htmlFor="checkout-payment-cardholderName">
              Cardholder Name
            </FieldLabel>
            <Input
              // {...field}
              id="checkout-payment-cardholderName"
              // aria-invalid={fieldState.invalid}
            />
            {/* {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )} */}
          </Field>
          <Field>
            <FieldLabel
              className="text-sm font-normal"
              htmlFor="checkout-payment-cardNumber">
              Account Number
            </FieldLabel>
            <Input
            // {...field}
            // id="checkout-payment-cardNumber"
            // aria-invalid={fieldState.invalid}
            />
            {/* {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )} */}
          </Field>
          <div className="flex gap-3.5 max-sm:flex-col">
            <DateInput />
            <Field>
              <FieldLabel
                className="text-sm font-normal"
                htmlFor="checkout-payment-cvc">
                Card Number
              </FieldLabel>
              <Input
              // {...field}
              // id="checkout-payment-cvc"
              // aria-invalid={fieldState.invalid}
              />
              {/* {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )} */}
            </Field>
          </div>
        </div>
      );
    case PAYMENT_METHODS.paypal:
      return (
        <Field>
          <FieldLabel
            className="text-sm font-normal"
            htmlFor="checkout-payment-payPalEmail">
            PayPal Email
          </FieldLabel>
          <Input
            // {...field}
            type="email"
            placeholder="you-email-here@email.com"
            id="checkout-payment-payPalEmail"
            // aria-invalid={fieldState.invalid}
          />
          {/* {fieldState.invalid && <FieldError errors={[fieldState.error]} />} */}
        </Field>
      );
    case PAYMENT_METHODS.onlineBankTransfer:
      return (
        <div className="space-y-3.5">
          <Field>
            <FieldLabel
              className="text-sm font-normal"
              htmlFor="checkout-payment-bankName">
              Bank Name
            </FieldLabel>
            <Input
            // {...field}
            // placeholder="Bank Name"
            // id="checkout-payment-bankName"
            // aria-invalid={fieldState.invalid}
            />
            {/* {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )} */}
          </Field>
          <Field>
            <FieldLabel
              className="text-sm font-normal"
              htmlFor="checkout-payment-accountNumber">
              Account Number
            </FieldLabel>
            <Input
            // {...field}
            // id="checkout-payment-accountNumber"
            // aria-invalid={fieldState.invalid}
            />
            {/* {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )} */}
          </Field>
        </div>
      );
    default:
      return null;
  }
};

export default PaymentFieldMethod;
