import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCart, useClearCart } from "@/features/cart/hooks/cart_hooks.js";

import Checkout from "../../orders/pages/components/Checkout";

import { Card, CardContent } from "@/components/ui/card";

import CartItem from "./CartItem";
const Cart = () => {
  const { data: cart, isPending } = useCart();
  const { mutate: clearCart, isLoading } = useClearCart();
  const items = cart?.items;
  const subtotal =
    items?.reduce((acc, item) => acc + item.priceSnapshot, 0) || 0;

  const shipping = 5;
  const total = subtotal + shipping;
  return (
    <div className="container p-4 lg:p-8">
      <Card className=" mx-auto max-w-7xl p-6">
        {/* MAIN GRID LAYOUT */}
        {!isLoading && items?.length === 0 ? (
          <div className="text-center mx-auto py-20">
            <p className="text-lg font-medium">Empty Cart</p>
            <p className="text-sm text-muted-foreground">
              Continue shopping and add books you fancy to cart.
            </p>
            <div className="mt-10 flex">
              <Link to={`/books`}>
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
            {/* LEFT SIDE — CART ITEMS */}
            <CardContent className="lg:col-span-2 space-y-6">
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
              {/* Price Breakdown */}
              <div className="border-t space-y-3 text-sm">
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

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link to={`/books`}>
                  <Button variant="outline" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Continue Shopping
                  </Button>
                </Link>

                <Button variant="destructive" onClick={clearCart}>
                  {isLoading ? "Clearing cart..." : "Clear Cart"}
                </Button>
              </div>
            </CardContent>

            {/* ========================= */}
            {/* RIGHT SIDE — ORDER SUMMARY */}
            {/* ========================= */}
            <div className="mb-auto h-fit space-y-6">
              <h1 className="text-2xl font-semibold">Checkout</h1>
              <div className="space-y-4">
                <Checkout items={items} />
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
export default Cart;
