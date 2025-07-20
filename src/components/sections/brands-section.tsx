import { BrandCard } from "@/components/ui/brand-card";
import { brands } from "@/data/products";

interface BrandsSectionProps {
  selectedBrand?: string;
  onBrandSelect: (brandId: string | undefined) => void;
}

export function BrandsSection({ selectedBrand, onBrandSelect }: BrandsSectionProps) {
  const handleBrandClick = (brandId: string) => {
    // Se a marca já está selecionada, deseleciona (mostra todos)
    if (selectedBrand === brandId) {
      onBrandSelect(undefined);
    } else {
      onBrandSelect(brandId);
    }
  };

  return (
    <section className="py-8 sm:py-12 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Navegue por Marcas
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground px-4">
            Laboratórios farmacêuticos certificados internacionalmente
          </p>
        </div>

        {/* Grid responsivo com gap adequado */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6">
          {brands.map((brand) => (
            <BrandCard
              key={brand.id}
              name={brand.name}
              logo={brand.logo}
              onClick={() => handleBrandClick(brand.id)}
              isSelected={selectedBrand === brand.id}
            />
          ))}
        </div>

        {/* Botão para mostrar todas as marcas */}
        {selectedBrand && (
          <div className="text-center">
            <button
              onClick={() => onBrandSelect(undefined)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 underline underline-offset-4"
            >
              ← Mostrar todas as marcas
            </button>
          </div>
        )}
      </div>
    </section>
  );
}