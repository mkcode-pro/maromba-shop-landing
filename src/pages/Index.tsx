import { useState } from "react";
import { Header } from "@/components/layout/header";
import { HeroSection } from "@/components/sections/hero-section";
import { BrandsSection } from "@/components/sections/brands-section";
import { ProductsSection } from "@/components/sections/products-section";
import { CheckoutSection } from "@/components/sections/checkout-section";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { CartProvider } from "@/contexts/cart-context";
import { useCartContext } from "@/contexts/cart-context";

function IndexContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);
  const { getTotalItems } = useCartContext();

  const handleGoToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutVisible(true);
    // Rolar suavemente para a seção de checkout
    setTimeout(() => {
      document.getElementById('checkout')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }, 100);
  };

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
        <CheckoutSection isVisible={isCheckoutVisible} />
      </main>
      
      <Footer />
      
      <CartDrawer 
        open={isCartOpen} 
        onOpenChange={setIsCartOpen}
        onGoToCheckout={handleGoToCheckout}
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
