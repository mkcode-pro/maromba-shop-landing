import { ProductCard } from "@/components/ui/product-card";
import { products, categories, brands } from "@/data/products";
import { useCartContext } from "@/contexts/cart-context";

interface ProductsSectionProps {
  selectedBrand?: string;
}

export function ProductsSection({ selectedBrand }: ProductsSectionProps) {
  const { addToCart } = useCartContext();

  // Filtrar produtos por marca se uma marca estiver selecionada
  const filteredProducts = selectedBrand 
    ? products.filter(p => p.brand === selectedBrand)
    : products;

  // Se uma marca está selecionada, mostrar todos os produtos dessa marca
  // Caso contrário, agrupar por categoria
  if (selectedBrand) {
    const selectedBrandData = brands.find(b => b.id === selectedBrand);
    
    return (
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <img 
              src={selectedBrandData?.logo} 
              alt={`Logo ${selectedBrandData?.name}`}
              className="h-16 object-contain"
            />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {selectedBrandData?.name}
              </h2>
              <p className="text-muted-foreground">
                {filteredProducts.length} produtos disponíveis
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
        </div>
      </section>
    );
  }

  // Exibição por categorias (quando nenhuma marca está selecionada)
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto space-y-16">
        {categories.map((category) => {
          const categoryProducts = filteredProducts.filter(p => p.category === category.id);
          
          if (categoryProducts.length === 0) return null;

          return (
            <div key={category.id} id={category.id} className="scroll-mt-20">
              {/* Header da categoria */}
              <div className="flex items-center gap-4 mb-8">
                <img 
                  src={category.logo} 
                  alt={`Logo ${category.name}`}
                  className="h-12 object-contain"
                />
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    {category.name}
                  </h2>
                  <p className="text-muted-foreground">
                    Compostos de qualidade farmacêutica certificada
                  </p>
                </div>
              </div>

              {/* Grid de produtos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryProducts.map((product) => (
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
            </div>
          );
        })}
      </div>
    </section>
  );
}