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
    <section className="py-12 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Navegue por Marcas
          </h2>
          <p className="text-muted-foreground">
            Laboratórios farmacêuticos certificados internacionalmente
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-6">
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

        {selectedBrand && (
          <div className="text-center">
            <button
              onClick={() => onBrandSelect(undefined)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Mostrar todas as marcas
            </button>
          </div>
        )}
      </div>
    </section>
  );
}