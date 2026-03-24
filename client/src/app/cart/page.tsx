"use client";

import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const totalPrice = useCartStore((state) => state.getTotalPrice)();
  const totalItems = useCartStore((state) => state.getTotalItems)();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-24">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary/10">
            <ShoppingBag className="h-10 w-10 text-secondary" />
          </div>
          <h1 className="mt-6 font-heading text-3xl text-primary">Your Cart is Empty</h1>
          <p className="mt-2 text-secondary">
            Discover our premium beauty products and add your favorites.
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

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="font-heading text-3xl text-primary">Shopping Cart</h1>
        <p className="mt-1 text-sm text-secondary">
          {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {items.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 rounded-2xl border border-primary/10 bg-white/60 p-4"
              >
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-secondary/5">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-accent">
                          {item.category}
                        </p>
                        <h3 className="mt-0.5 font-heading text-lg text-primary line-clamp-1">
                          {item.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="rounded-full p-2 text-secondary transition-colors hover:bg-red-50 hover:text-red-500"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 rounded-full border border-primary/10 bg-white px-3 py-1.5">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="rounded-full p-1 text-primary hover:bg-secondary/10"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-6 text-center text-sm font-medium text-primary">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="rounded-full p-1 text-primary hover:bg-secondary/10"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="font-heading text-lg text-primary">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-primary/10 bg-white/80 p-6 shadow-sm">
              <h2 className="font-heading text-xl text-primary">Order Summary</h2>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-secondary">Subtotal</span>
                  <span className="font-medium text-primary">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-secondary">Shipping</span>
                  <span className="font-medium text-primary">Free</span>
                </div>
                <div className="mt-2 border-t border-primary/10 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-lg text-primary">Total</span>
                    <span className="font-heading text-2xl text-primary">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <Link
                href="/checkout"
                className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-button px-6 text-sm font-semibold text-white transition-colors hover:bg-button-hover"
              >
                Proceed to Checkout
              </Link>
              <Link
                href="/shop"
                className="mt-3 inline-flex h-12 w-full items-center justify-center rounded-full border border-primary/20 bg-white px-6 text-sm font-medium text-primary transition-colors hover:bg-white/80"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
