import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  image: string;
  name: string;
  description: string;
  originalPrice: number;
  discountPrice: number;
  discountPercentage: number;
  onAddToCart: () => void;
}

export function ProductCard({
  image,
  name,
  description,
  originalPrice,
  discountPrice,
  discountPercentage,
  onAddToCart
}: ProductCardProps) {
  return (
    <Card className="group overflow-hidden border-0 bg-card-gradient shadow-card hover:shadow-button transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-pharma-red text-pharma-red-foreground px-2 py-1 rounded-md text-sm font-semibold">
            -{discountPercentage}%
          </div>
        )}
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-card-foreground line-clamp-2 min-h-[2.5rem]">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {description}
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {originalPrice > discountPrice && (
              <span className="text-sm text-muted-foreground line-through">
                R$ {originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-lg font-bold text-primary">
              R$ {discountPrice.toFixed(2)}
            </span>
          </div>
          
          <Button 
            onClick={onAddToCart}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-button"
            size="sm"
          >
            Adicionar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}