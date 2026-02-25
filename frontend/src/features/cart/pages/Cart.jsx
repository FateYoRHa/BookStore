import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useCart } from "@/features/cart/hooks/cart_hooks.js";

import OrderSummary from "./OrderSummary";

import { Card, CardContent } from "@/components/ui/card";

import CartItem from "./CartItem";
const Cart = () => {
  const { data: cart, isPending } = useCart();

  const items = cart?.items;
  return (
    <div className="container p-4 lg:p-8">
      <Card className="mx-auto max-w-7xl p-6">
        {/* MAIN GRID LAYOUT */}
        <CardContent className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* LEFT SIDE — CART ITEMS */}
          <div className="lg:col-span-2 space-y-6">
            {/* lg:col-span-2 → takes 2/3 width on desktop */}

            <h1 className="text-2xl font-semibold">Shopping Cart</h1>

            {/* Cart Items List */}
            <div className="space-y-4">
              {isPending ? (
                <div className="text-muted-foreground">Loading...</div>
              ) : (
                items?.map((item) => (
                  <CartItem key={item?.book.bookCode} item={item} />
                ))
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Button>

              <Button variant="destructive">Clear Cart</Button>
            </div>
          </div>

          {/* ========================= */}
          {/* RIGHT SIDE — ORDER SUMMARY */}
          {/* ========================= */}
          <div className="lg:sticky lg:top-45 h-fit">
            <OrderSummary items={items} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default Cart;
