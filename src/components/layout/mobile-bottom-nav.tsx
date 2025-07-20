import { Home, ShoppingBag, Store, Package, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MobileBottomNavProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onBrandsClick: () => void;
  onProductsClick: () => void;
  onHomeClick: () => void;
  isCheckoutVisible: boolean;
}

export function MobileBottomNav({ 
  cartItemsCount, 
  onCartClick, 
  onBrandsClick, 
  onProductsClick, 
  onHomeClick,
  isCheckoutVisible 
}: MobileBottomNavProps) {
  // Não mostrar a barra durante o checkout
  if (isCheckoutVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t shadow-lg md:hidden">
      <div className="flex items-center justify-around px-4 py-2">
        {/* Home */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onHomeClick}
          className="flex flex-col items-center gap-1 h-auto py-2 px-3"
        >
          <Home className="h-5 w-5" />
          <span className="text-xs">Início</span>
        </Button>

        {/* Marcas */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onBrandsClick}
          className="flex flex-col items-center gap-1 h-auto py-2 px-3"
        >
          <Store className="h-5 w-5" />
          <span className="text-xs">Marcas</span>
        </Button>

        {/* Produtos */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onProductsClick}
          className="flex flex-col items-center gap-1 h-auto py-2 px-3"
        >
          <Package className="h-5 w-5" />
          <span className="text-xs">Produtos</span>
        </Button>

        {/* Carrinho */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onCartClick}
          className="flex flex-col items-center gap-1 h-auto py-2 px-3 relative"
        >
          <div className="relative">
            <ShoppingCart className="h-5 w-5" />
            {cartItemsCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 text-xs p-0 flex items-center justify-center min-w-[20px]"
              >
                {cartItemsCount > 99 ? '99+' : cartItemsCount}
              </Badge>
            )}
          </div>
          <span className="text-xs">Carrinho</span>
        </Button>
      </div>
    </div>
  );
}