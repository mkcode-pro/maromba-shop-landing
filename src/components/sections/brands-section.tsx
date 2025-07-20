import { BrandCard } from "@/components/ui/brand-card";

const brands = [
  {
    id: "testosterona",
    name: "Testosterona",
    logo: "https://via.placeholder.com/120x60/1F2937/FFFFFF?text=TEST"
  },
  {
    id: "orais", 
    name: "Orais",
    logo: "https://via.placeholder.com/120x60/7C3AED/FFFFFF?text=ORAIS"
  },
  {
    id: "trembolona",
    name: "Trembolona", 
    logo: "https://via.placeholder.com/120x60/DC2626/FFFFFF?text=TREN"
  },
  {
    id: "nandrolona",
    name: "Nandrolona",
    logo: "https://via.placeholder.com/120x60/059669/FFFFFF?text=DECA"
  },
  {
    id: "primobolan",
    name: "Primobolan",
    logo: "https://via.placeholder.com/120x60/0891B2/FFFFFF?text=PRIMO"
  },
  {
    id: "pct",
    name: "PCT & Proteções",
    logo: "https://via.placeholder.com/120x60/6B7280/FFFFFF?text=PCT"
  }
];

export function BrandsSection() {
  const scrollToBrand = (brandId: string) => {
    const element = document.getElementById(brandId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="py-12 px-4 bg-pharma-light">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Laboratórios Certificados
          </h2>
          <p className="text-muted-foreground">
            Produtos de qualidade farmacêutica para protocolos profissionais
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {brands.map((brand) => (
            <BrandCard
              key={brand.id}
              name={brand.name}
              logo={brand.logo}
              onClick={() => scrollToBrand(brand.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}