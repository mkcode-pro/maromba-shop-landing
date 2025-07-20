import { ProductCard } from "@/components/ui/product-card";
import { products, categories, brands } from "@/data/products";
import { useCartContext } from "@/contexts/cart-context";

interface ProductsSectionProps {
  selectedBrand?: string;
}

export function ProductsSection({ selectedBrand }: ProductsSectionProps) {
  const { addToCart } = useCartContext();

  // Se nenhuma marca está selecionada, não mostrar produtos
  if (!selectedBrand) {
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-md mx-auto">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted mx-auto">
              <span className="text-3xl">🏪</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Selecione uma Marca
            </h2>
            <p className="text-muted-foreground mb-6">
              Escolha uma das marcas acima para visualizar nossos produtos farmacêuticos de alta qualidade
            </p>
            <div className="inline-flex items-center gap-2 text-sm text-primary">
              <span>👆</span>
              <span>Clique em uma marca para começar</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Filtrar produtos por marca selecionada
  const filteredProducts = products.filter(p => p.brand === selectedBrand);
  const selectedBrandData = brands.find(b => b.id === selectedBrand);
  
  return (
    <section className="py-8 sm:py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center gap-4 mb-6 sm:mb-8">
          <img 
            src={selectedBrandData?.logo} 
            alt={`Logo ${selectedBrandData?.name}`}
            className="h-12 sm:h-16 object-contain"
          />
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
              {selectedBrandData?.name}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              {filteredProducts.length} produtos disponíveis
            </p>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted mx-auto">
              <span className="text-2xl">📦</span>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-muted-foreground">
              Esta marca não possui produtos disponíveis no momento
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                name={product.name}
                description={product.description}
                originalPrice={product.originalPrice}
                discountPrice={product.discountPrice}
                discountPercentage={product.discountPercentage}
                onAddToCart={() => addToCart(product.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}