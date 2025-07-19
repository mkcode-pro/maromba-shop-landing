import { useState } from "react";
import { Header } from "@/components/layout/header";
import { HeroSection } from "@/components/sections/hero-section";
import { BrandsSection } from "@/components/sections/brands-section";
import { ProductsSection } from "@/components/sections/products-section";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { CartProvider } from "@/contexts/cart-context";
import { useCartContext } from "@/contexts/cart-context";

function IndexContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getTotalItems } = useCartContext();

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItemsCount={getTotalItems()} 
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <main>
        <HeroSection />
        <BrandsSection />
        <ProductsSection />
      </main>
      
      <Footer />
      
      <CartDrawer 
        open={isCartOpen} 
        onOpenChange={setIsCartOpen}
      />
    </div>
  );
}

export default function Index() {
  return (
    <CartProvider>
      <IndexContent />
    </CartProvider>
  );
}
