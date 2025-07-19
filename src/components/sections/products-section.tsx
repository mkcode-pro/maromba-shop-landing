import { ProductCard } from "@/components/ui/product-card";
import { products, categories } from "@/data/products";

interface ProductsSectionProps {
  onAddToCart: (productId: string) => void;
}

export function ProductsSection({ onAddToCart }: ProductsSectionProps) {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto space-y-16">
        {categories.map((category) => {
          const categoryProducts = products.filter(p => p.category === category.id);
          
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
                  <h2 className="text-2xl md:text-3xl font-bold text-pharma-dark">
                    {category.name}
                  </h2>
                  <p className="text-muted-foreground">
                    Os melhores produtos para seus objetivos
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
                    onAddToCart={() => onAddToCart(product.id)}
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