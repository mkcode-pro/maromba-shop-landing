import { ShoppingCart, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  cartItemsCount: number;
}

export function Header({ cartItemsCount }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background shadow-header">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Zap className="h-8 w-8 text-pharma-yellow fill-pharma-yellow" />
          </div>
          <h1 className="text-xl font-bold text-pharma-dark">
            Império Farma
          </h1>
        </div>

        {/* Carrinho */}
        <div className="relative">
          <button className="relative p-2 hover:bg-pharma-light rounded-lg transition-colors">
            <ShoppingCart className="h-6 w-6 text-pharma-dark" />
            {cartItemsCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-pharma-red"
              >
                {cartItemsCount > 99 ? '99+' : cartItemsCount}
              </Badge>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}