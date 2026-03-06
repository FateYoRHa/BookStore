import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import DateInput from "./DateInput";
import FormFieldError from "@/components/forms/FormFieldError";

import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

const PaymentFieldMethod = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const method = watch("payment.type");
  const PAYMENT_METHODS = {
    credit: "credit",
    paypal: "paypal",
    bank: "bank",
    gcash: "gcash",
    cod: "CoD",
  };
  if (!method) return;

  switch (method) {
    case PAYMENT_METHODS.cod:
      return <Input value="CoD" hidden readOnly />;

    case PAYMENT_METHODS.credit:
      return (
        <div className="space-y-3.5">
          <Field>
            <FieldLabel
              className="text-sm font-normal"
              htmlFor="checkout-payment-cardholderName">
              Cardholder Name
            </FieldLabel>
            <Input
              {...register("payment.cardHolder")}
              id="cardholder"
              className={cn(
                errors?.payment?.cardHolder &&
                  "border-red-500 focus-visible:ring-red-500",
              )}
            />
            <FormFieldError error={errors?.payment?.cardHolder} helper="" />
          </Field>
          <Field>
            <FieldLabel
              className="text-sm font-normal"
              htmlFor="checkout-payment-cardNumber">
              Account Number
            </FieldLabel>
            <Input
              {...register("payment.accountNumber")}
              className={cn(
                errors?.payment?.accountNumber &&
                  "border-red-500 focus-visible:ring-red-500",
              )}
            />
            <FormFieldError error={errors?.payment?.accountNumber} helper="" />
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
                {...register("payment.cardNumber")}
                className={cn(
                  errors?.payment?.cardNumber &&
                    "border-red-500 focus-visible:ring-red-500",
                )}
              />
              <FormFieldError error={errors?.payment?.cardNumber} helper="" />
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
            {...register("payment.email")}
            type="email"
            placeholder="you-email-here@email.com"
            id="checkout-payment-payPalEmail"
            className={cn(
              errors?.payment?.email &&
                "border-red-500 focus-visible:ring-red-500",
            )}
          />
          <FormFieldError error={errors?.payment?.email} helper="" />
        </Field>
      );
    case PAYMENT_METHODS.bank:
      return (
        <div className="space-y-3.5">
          <Field>
            <FieldLabel
              className="text-sm font-normal"
              htmlFor="checkout-payment-bankName">
              Bank Name
            </FieldLabel>
            <Input
              {...register("payment.bankName")}
              className={cn(
                errors?.payment?.bankName &&
                  "border-red-500 focus-visible:ring-red-500",
              )}
            />
            <FormFieldError error={errors?.payment?.bankName} helper="" />
          </Field>
          <Field>
            <FieldLabel
              className="text-sm font-normal"
              htmlFor="checkout-payment-accountNumber">
              Account Number
            </FieldLabel>
            <Input
              {...register("payment.accountNumber")}
              className={cn(
                errors?.payment?.accountNumber &&
                  "border-red-500 focus-visible:ring-red-500",
              )}
            />
            <FormFieldError error={errors?.payment?.accountNumber} helper="" />
          </Field>
        </div>
      );
    case PAYMENT_METHODS.gcash:
      return (
        <div className="space-y-3.5">
          <Field>
            <FieldLabel
              className="text-sm font-normal"
              htmlFor="checkout-payment-accountName">
              Account Name
            </FieldLabel>
            <Input
              {...register("payment.accountName")}
              className={cn(
                errors?.payment?.accountName &&
                  "border-red-500 focus-visible:ring-red-500",
              )}
            />
            <FormFieldError error={errors?.payment?.accountName} helper="" />
          </Field>
          <Field>
            <FieldLabel
              className="text-sm font-normal"
              htmlFor="checkout-payment-accountNumber">
              Account/Phone Number
            </FieldLabel>
            <Input
              {...register("payment.accountNumber")}
              className={cn(
                errors?.payment?.accountNumber &&
                  "border-red-500 focus-visible:ring-red-500",
              )}
            />
            <FormFieldError error={errors?.payment?.accountNumber} helper="" />
          </Field>
        </div>
      );
    default:
      return null;
  }
};

export default PaymentFieldMethod;
