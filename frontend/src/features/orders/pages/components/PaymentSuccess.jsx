import { useEffect } from "react";
import { CheckCircle } from "lucide-react";

export default function CheckoutSuccess() {
  useEffect(() => {
    // optional: refetch order status
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <CheckCircle className="w-16 h-16 text-green-500 mb-6" />

      <h1 className="text-3xl font-bold">Payment Successful</h1>

      <p className="text-muted-foreground mt-2">Thank you for your order.</p>

      <a
        href="/orders"
        className="mt-6 bg-black text-white px-6 py-3 rounded-md">
        View Orders
      </a>
    </div>
  );
}
