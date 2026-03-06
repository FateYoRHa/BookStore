import { useState, useEffect, useContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useForm, FormProvider } from "react-hook-form";

import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Spinner } from "@/components/ui/spinner";

import { toast } from "sonner";

import ContactFields from "./ContactFields";
import AddressFields from "./AddressFields";
import PaymentFields from "./PaymentFields";
import ShippingFields from "./ShippingFields";

import { ShippingContext } from "../../context/customer_context";
import { useCheckout } from "../../hooks/orders_hook";

import { customerInfoSchema } from "../../ordersSchema";
const Checkout = () => {
  const [checkout, setCheckout] = useState(false);
  const { shipping } = useContext(ShippingContext);
  const customer = useAuthStore((state) => state.customer).customer;
  const address = customer?.address[0];
  const { mutateAsync } = useCheckout();
  const methods = useForm({
    resolver: zodResolver(customerInfoSchema),
    defaultValues: {
      payment: { type: "CoD" },
      email: customer?.user?.email || "",
      name: customer?.name || "",
      phone: customer?.phone || "",
      address: {
        street: address?.street || "",
        city: address?.city || "",
        zipCode: address?.zipCode || "",
        country: address?.country || "",
      },
    },
    mode: "onChange",
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (errors) return console.log("Form Errors:", errors);
  }, [errors]);
  const [activeAccordion, setActiveAccordion] = useState("contact");
  const onSubmit = (data) => {
    console.log(`Submitted Data:\n`, JSON.stringify(data, null, 2));
  };

  const onContinue = (value) => {
    setActiveAccordion(value);
  };

  const handleOnValueChange = (value) => {
    setActiveAccordion(value);
  };

  const pay = (data) => {
    const order = {
      shippingFee: shipping.fee,
      address: data.address,
      paymentMethod: data.payment,
    };
    toast.promise(mutateAsync(order), {
      loading: "Processing payment...",
      success: () => {
        // Update UI state
        setCheckout(true);
        return `Redirecting to payment...`;
      },
      error: "Payment failed. Please try again.",
    });
    // toast.promise(
    //   new Promise((resolve, reject) => {
    //     //  Simulate API latency (like calling backend)
    //     setTimeout(() => {
    //       try {
    //         // This is where you would call:
    //         // await createOrderMutation.mutateAsync(orderPayload)

    //         console.log("Sending to backend:", orderPayload);

    //         // Simulate backend response
    //         resolve({
    //           orderId: "ORD-123456",
    //           amount: orderPayload.totalAmount,
    //         });
    //       } catch (err) {
    //         reject(err);
    //       }
    //     }, 3000);
    //   }),
    //   {
    //     loading: "Processing payment...",
    //     success: (data) => {
    //       // Update UI state
    //       setCheckout(true);
    //       return `Payment successful! Order #${data.orderId} created.`;
    //     },
    //     error: "Payment failed. Please try again.",
    //   },
    // );
  };

  return (
    <div className="rounded-2xl border p-6">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-3 text-sm">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              value={activeAccordion}
              onValueChange={handleOnValueChange}>
              {/* CONTACT */}
              <AccordionItem value="contact">
                <AccordionTrigger className="px-1 py-7 text-lg font-semibold hover:no-underline [&>svg:last-child]:hidden [&[data-state=closed]>svg:nth-of-type(2)]:hidden [&[data-state=open]>svg:nth-of-type(1)]:hidden [&[data-state=open]>svg:nth-of-type(2)]:block">
                  Contact Information
                  <Plus className="pointer-events-none size-4 shrink-0 self-center text-muted-foreground" />
                  <Minus className="pointer-events-none hidden size-4 shrink-0 self-center text-muted-foreground" />
                </AccordionTrigger>
                <AccordionContent className="px-1 pb-7">
                  <div className="space-y-7">
                    <ContactFields customer={customer} />
                    <Button
                      type="button"
                      className="w-full"
                      variant="secondary"
                      onClick={() => onContinue("address")}>
                      Continue
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              {/* ADDRESS */}
              <AccordionItem value="address">
                <AccordionTrigger className="px-1 py-7 text-lg font-semibold hover:no-underline [&>svg:last-child]:hidden [&[data-state=closed]>svg:nth-of-type(2)]:hidden [&[data-state=open]>svg:nth-of-type(1)]:hidden [&[data-state=open]>svg:nth-of-type(2)]:block">
                  Address
                  <Plus className="pointer-events-none size-4 shrink-0 self-center text-muted-foreground" />
                  <Minus className="pointer-events-none hidden size-4 shrink-0 self-center text-muted-foreground" />
                </AccordionTrigger>
                <AccordionContent className="px-1 pb-7">
                  <div className="space-y-7">
                    <AddressFields customer={customer} />
                    <Button
                      type="button"
                      className="w-full"
                      variant="secondary"
                      onClick={() => onContinue("shipping")}>
                      Continue
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger className="px-1 py-7 text-lg font-semibold hover:no-underline [&>svg:last-child]:hidden [&[data-state=closed]>svg:nth-of-type(2)]:hidden [&[data-state=open]>svg:nth-of-type(1)]:hidden [&[data-state=open]>svg:nth-of-type(2)]:block">
                  Shipping Method
                  <Plus className="pointer-events-none size-4 shrink-0 self-center text-muted-foreground" />
                  <Minus className="pointer-events-none hidden size-4 shrink-0 self-center text-muted-foreground" />
                </AccordionTrigger>
                <AccordionContent className="px-1 pb-7">
                  <div className="space-y-7">
                    <ShippingFields />
                    <Button
                      type="button"
                      className="w-full"
                      variant="secondary"
                      onClick={() => onContinue("payment")}>
                      Continue
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="payment">
                <AccordionTrigger className="px-1 py-7 text-lg font-semibold hover:no-underline [&>svg:last-child]:hidden [&[data-state=closed]>svg:nth-of-type(2)]:hidden [&[data-state=open]>svg:nth-of-type(1)]:hidden [&[data-state=open]>svg:nth-of-type(2)]:block">
                  Payment
                  <Plus className="pointer-events-none size-4 shrink-0 self-center text-muted-foreground" />
                  <Minus className="pointer-events-none hidden size-4 shrink-0 self-center text-muted-foreground" />
                </AccordionTrigger>
                <AccordionContent className="px-1 pb-7">
                  <div className="space-y-7">
                    <PaymentFields customer={customer} />
                    <Button
                      type="button"
                      className="w-full"
                      onClick={handleSubmit(pay)}>
                      Pay Now
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Checkout Button */}
          <Button className="w-full" type="submit" disabled={!checkout}>
            {!checkout ? (
              <>
                <Spinner /> <span>Proccessing info...</span>
              </>
            ) : (
              <span>Checkout</span>
            )}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
export default Checkout;
