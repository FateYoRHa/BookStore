import { XCircle } from "lucide-react";

export default function CheckoutCancel() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <XCircle className="w-16 h-16 text-red-500 mb-6" />

      <h1 className="text-3xl font-bold">Payment Cancelled</h1>

      <p className="text-muted-foreground mt-2">
        You can retry payment anytime.
      </p>

      <a href="/cart" className="mt-6 bg-black text-white px-6 py-3 rounded-md">
        Back to Cart
      </a>
    </div>
  );
}
