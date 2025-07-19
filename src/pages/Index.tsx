import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { BrandsSection } from "@/components/sections/brands-section";
import { ProductsSection } from "@/components/sections/products-section";
import { useCart } from "@/hooks/use-cart";

const Index = () => {
  const { addToCart, getTotalItems } = useCart();

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={getTotalItems()} />
      
      <main>
        <HeroSection />
        <BrandsSection />
        <ProductsSection onAddToCart={addToCart} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
