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
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>(undefined);
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

  const handleBrandSelect = (brandId: string | undefined) => {
    setSelectedBrand(brandId);
    // Scroll para a seção de produtos quando uma marca for selecionada
    if (brandId) {
      setTimeout(() => {
        document.getElementById('products')?.scrollIntoView({ 
          behavior: 'smooth' 
        });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItemsCount={getTotalItems()} 
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <main>
        <HeroSection />
        <BrandsSection selectedBrand={selectedBrand} onBrandSelect={handleBrandSelect} />
        <div id="products">
          <ProductsSection selectedBrand={selectedBrand} />
        </div>
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
