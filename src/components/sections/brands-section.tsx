import { BrandCard } from "@/components/ui/brand-card";

const brands = [
  {
    id: "whey-protein",
    name: "Whey Protein",
    logo: "https://via.placeholder.com/120x60/3B82F6/FFFFFF?text=WHEY"
  },
  {
    id: "creatina", 
    name: "Creatina",
    logo: "https://via.placeholder.com/120x60/10B981/FFFFFF?text=CREATINA"
  },
  {
    id: "pre-treino",
    name: "Pré-Treino", 
    logo: "https://via.placeholder.com/120x60/F59E0B/FFFFFF?text=PRE-TREINO"
  },
  {
    id: "vitaminas",
    name: "Vitaminas",
    logo: "https://via.placeholder.com/120x60/8B5CF6/FFFFFF?text=VITAMINAS"
  },
  {
    id: "aminoacidos",
    name: "Aminoácidos",
    logo: "https://via.placeholder.com/120x60/EF4444/FFFFFF?text=AMINO"
  },
  {
    id: "queimadores",
    name: "Queimadores",
    logo: "https://via.placeholder.com/120x60/F97316/FFFFFF?text=BURN"
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
          <h2 className="text-2xl md:text-3xl font-bold text-pharma-dark mb-2">
            Navegue por Categorias
          </h2>
          <p className="text-muted-foreground">
            Encontre os melhores produtos para seus objetivos
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