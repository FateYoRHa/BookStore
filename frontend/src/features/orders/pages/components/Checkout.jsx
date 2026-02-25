import { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import ContactFields from "./ContactFields";
import AddressFields from "./AddressFields";
import PaymentFields from "./PaymentFields";
import ShippingFields from "./ShippingFields";
const Checkout = ({ items }) => {
  const [activeAccordion, setActiveAccordion] = useState("item-1");
  const onSubmit = (data) => {
    console.log(data);
  };

  const onContinue = (value) => {
    setActiveAccordion(value);
  };

  const handleOnValueChange = (value) => {
    setActiveAccordion(value);
  };

  return (
    <div className="rounded-2xl border p-6">
      {/* Price Breakdown */}
      <div className="space-y-3 text-sm">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          value={activeAccordion}
          onValueChange={handleOnValueChange}>
          {/* CONTACT */}
          <AccordionItem value="item-1">
            <AccordionTrigger className="px-1 py-7 text-lg font-semibold hover:no-underline [&>svg:last-child]:hidden [&[data-state=closed]>svg:nth-of-type(2)]:hidden [&[data-state=open]>svg:nth-of-type(1)]:hidden [&[data-state=open]>svg:nth-of-type(2)]:block">
              Contact Information
              <Plus className="pointer-events-none size-4 shrink-0 self-center text-muted-foreground" />
              <Minus className="pointer-events-none hidden size-4 shrink-0 self-center text-muted-foreground" />
            </AccordionTrigger>
            <AccordionContent className="px-1 pb-7">
              <div className="space-y-7">
                <ContactFields />
                <Button
                  type="button"
                  className="w-full"
                  variant="secondary"
                  onClick={() => onContinue("item-2")}>
                  Continue
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          {/* ADDRESS */}
          <AccordionItem value="item-2">
            <AccordionTrigger className="px-1 py-7 text-lg font-semibold hover:no-underline [&>svg:last-child]:hidden [&[data-state=closed]>svg:nth-of-type(2)]:hidden [&[data-state=open]>svg:nth-of-type(1)]:hidden [&[data-state=open]>svg:nth-of-type(2)]:block">
              Address
              <Plus className="pointer-events-none size-4 shrink-0 self-center text-muted-foreground" />
              <Minus className="pointer-events-none hidden size-4 shrink-0 self-center text-muted-foreground" />
            </AccordionTrigger>
            <AccordionContent className="px-1 pb-7">
              <div className="space-y-7">
                <AddressFields />
                <Button
                  type="button"
                  className="w-full"
                  variant="secondary"
                  onClick={() => onContinue("item-3")}>
                  Continue
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
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
                  onClick={() => onContinue("item-4")}>
                  Continue
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="px-1 py-7 text-lg font-semibold hover:no-underline [&>svg:last-child]:hidden [&[data-state=closed]>svg:nth-of-type(2)]:hidden [&[data-state=open]>svg:nth-of-type(1)]:hidden [&[data-state=open]>svg:nth-of-type(2)]:block">
              Payment
              <Plus className="pointer-events-none size-4 shrink-0 self-center text-muted-foreground" />
              <Minus className="pointer-events-none hidden size-4 shrink-0 self-center text-muted-foreground" />
            </AccordionTrigger>
            <AccordionContent className="px-1 pb-7">
              <div className="space-y-7">
                <PaymentFields />
                <Button type="submit" className="w-full">
                  Checkout
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Checkout Button */}
      {/* <Button className="w-full">Proceed to Checkout</Button> */}
    </div>
  );
};
export default Checkout;
