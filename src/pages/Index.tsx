import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
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

  const handleBackToShopping = () => {
    setIsCheckoutVisible(false);
    // Rolar para o topo da página
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  // Funções para navegação mobile
  const scrollToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBrands = () => {
    const brandsSection = document.querySelector('section');
    if (brandsSection) {
      brandsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header 
        cartItemsCount={getTotalItems()} 
        onCartClick={() => setIsCartOpen(true)}
      />
      
      {/* Botão de voltar quando está no checkout */}
      {isCheckoutVisible && (
        <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b px-4 py-2">
          <div className="container mx-auto">
            <Button
              variant="ghost"
              onClick={handleBackToShopping}
              className="flex items-center gap-2 text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar às compras
            </Button>
          </div>
        </div>
      )}
      
      <main className="w-full pb-16 md:pb-0">
        {/* Seções principais - ocultar quando checkout estiver visível */}
        <div className={isCheckoutVisible ? 'hidden' : 'block'}>
          <HeroSection />
          <BrandsSection selectedBrand={selectedBrand} onBrandSelect={handleBrandSelect} />
          <div id="products">
            <ProductsSection selectedBrand={selectedBrand} />
          </div>
        </div>

        {/* Seção de checkout */}
        <CheckoutSection isVisible={isCheckoutVisible} />
      </main>
      
      {!isCheckoutVisible && <Footer />}
      
      {/* Barra de navegação inferior para mobile */}
      <MobileBottomNav
        cartItemsCount={getTotalItems()}
        onCartClick={() => setIsCartOpen(true)}
        onBrandsClick={scrollToBrands}
        onProductsClick={scrollToProducts}
        onHomeClick={scrollToHome}
        isCheckoutVisible={isCheckoutVisible}
      />
      
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
