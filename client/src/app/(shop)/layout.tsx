import React from "react";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="shop-layout">
      <nav className="bg-gray-800 p-4 text-white">
        <span>Shop Navigation</span>
      </nav>
      <main>{children}</main>
    </div>
  );
}
