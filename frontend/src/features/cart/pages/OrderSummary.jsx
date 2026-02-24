import { Button } from "@/components/ui/button";
const OrderSummary = ({ items }) => {
  const subtotal =
    items?.reduce((acc, item) => acc + item.priceSnapshot, 0) ||
    0;

  const shipping = 5;
  const total = subtotal + shipping;

  return (
    <div className="rounded-2xl border p-6 space-y-6">
      <h2 className="text-xl font-semibold">Order Summary</h2>

      {/* Price Breakdown */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>

        <div className="border-t pt-3 flex justify-between font-semibold text-base">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <Button className="w-full">Proceed to Checkout</Button>
    </div>
  );
};
export default OrderSummary;
