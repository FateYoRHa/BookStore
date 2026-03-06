import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useContext } from "react";

import { SHIPPING_OPTIONS } from "../../constant_values";
import { ShippingContext } from "../../context/customer_context";

const ShippingField = () => {
  const { shipping, setShipping } = useContext(ShippingContext);

  return (
    <Field>
      <RadioGroup
        value={shipping?.id}
        onValueChange={(selectedId) => {
          const selected = SHIPPING_OPTIONS.find(
            (option) => option.id === selectedId,
          );

          if (selected) {
            setShipping(selected);
          }
        }}
        className="flex max-sm:flex-col gap-4">
        {SHIPPING_OPTIONS.map((option) => (
          <FieldLabel key={option.id} htmlFor={`shipping-${option.id}`}>
            <Field
              orientation="vertical"
              className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition">
              {/* LEFT SIDE — SHIPPING INFO */}
              <FieldContent>
                <FieldTitle>{option.name}</FieldTitle>
                <FieldDescription>{option.description}</FieldDescription>
              </FieldContent>

              {/* RIGHT SIDE — PRICE + RADIO */}
              <div className="flex items-center gap-3.5">
                <p className="text-sm font-medium">${option.fee.toFixed(2)}</p>

                <RadioGroupItem
                  value={option.id}
                  id={`shipping-${option.id}`}
                />
              </div>
            </Field>
          </FieldLabel>
        ))}
      </RadioGroup>
    </Field>
  );
};

export default ShippingField;
