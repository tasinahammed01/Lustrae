"use client";

import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useCartStore, type CartItem } from "@/store/cartStore";

interface CartStateShape {
  items: CartItem[];
  clearCart: () => void;
  getTotalPrice: () => number;
}

export default function CheckoutPage() {
  const items = useCartStore((state: CartStateShape) => state.items);
  const clearCart = useCartStore((state: CartStateShape) => state.clearCart);
  const totalPrice = useCartStore((state: CartStateShape) => state.getTotalPrice)();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (items.length === 0 && !isSuccess) {
    return (
      <div className="min-h-screen bg-background pt-24">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h1 className="font-heading text-3xl text-primary">Your Cart is Empty</h1>
          <p className="mt-2 text-secondary">Add some items before checking out.</p>
          <Link
            href="/shop"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-button px-6 text-sm font-semibold text-white transition-colors hover:bg-button-hover"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background pt-24">
        <div className="mx-auto max-w-md px-6 py-16 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="mt-6 font-heading text-3xl text-primary">Order Placed!</h1>
          <p className="mt-2 text-secondary">
            Thank you, {form.name}. Your order has been received and is being processed.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-button px-6 text-sm font-semibold text-white transition-colors hover:bg-button-hover"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerInfo: form,
          items,
          total: totalPrice,
        }),
      });

      if (!res.ok) throw new Error("Failed to place order");

      toast.success("Order placed successfully!");
      clearCart();
      setIsSuccess(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="font-heading text-3xl text-primary">Checkout</h1>
        <p className="mt-1 text-sm text-secondary">Complete your order</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <form onSubmit={handleSubmit} className="space-y-4 lg:col-span-2">
            <div className="rounded-2xl border border-primary/10 bg-white/60 p-6">
              <h2 className="font-heading text-lg text-primary">Contact Information</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-secondary">Full Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="mt-1 w-full rounded-xl border border-primary/10 bg-white px-4 py-2.5 text-primary outline-none focus:border-accent"
                    placeholder="Jane Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="mt-1 w-full rounded-xl border border-primary/10 bg-white px-4 py-2.5 text-primary outline-none focus:border-accent"
                    placeholder="jane@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary">Phone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="mt-1 w-full rounded-xl border border-primary/10 bg-white px-4 py-2.5 text-primary outline-none focus:border-accent"
                    placeholder="(555) 000-0000"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/cart"
                className="inline-flex h-12 items-center justify-center rounded-full border border-primary/20 bg-white px-6 text-sm font-medium text-primary transition-colors hover:bg-white/80"
              >
                Back to Cart
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-12 items-center justify-center rounded-full bg-button px-6 text-sm font-semibold text-white transition-colors hover:bg-button-hover disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Place Order • $${totalPrice.toFixed(2)}`
                )}
              </button>
            </div>
          </form>

          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-primary/10 bg-white/80 p-6 shadow-sm">
              <h2 className="font-heading text-lg text-primary">Order Summary</h2>
              <div className="mt-4 space-y-3">
                {items.map((item: CartItem) => (
                  <div key={item._id} className="flex items-center justify-between text-sm">
                    <span className="text-secondary">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-medium text-primary">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="border-t border-primary/10 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-lg text-primary">Total</span>
                    <span className="font-heading text-2xl text-primary">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
