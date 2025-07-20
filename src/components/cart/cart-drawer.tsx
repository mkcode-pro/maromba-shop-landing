import { Minus, Plus, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartContext } from "@/contexts/cart-context";
import { products } from "@/data/products";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGoToCheckout: () => void;
}

export function CartDrawer({ open, onOpenChange, onGoToCheckout }: CartDrawerProps) {
  const { cartItems, updateQuantity, removeFromCart } = useCartContext();

  const getProductById = (productId: string) => {
    return products.find(product => product.id === productId);
  };

  const subtotal = cartItems.reduce((total, item) => {
    const product = getProductById(item.productId);
    return total + (product?.discountPrice || 0) * item.quantity;
  }, 0);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Cart Panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm border-l bg-background shadow-lg sm:max-w-md">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between border-b px-4 py-4">
            <h2 className="text-lg font-semibold">Seu Carrinho</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {cartItems.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <span className="text-2xl">🛒</span>
                </div>
                <h3 className="mb-2 text-lg font-medium">Carrinho vazio</h3>
                <p className="mb-6 text-sm text-muted-foreground">
                  Adicione produtos para começar suas compras
                </p>
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Continue Comprando
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => {
                  const product = getProductById(item.productId);
                  if (!product) return null;

                  return (
                    <div key={item.productId} className="flex gap-3 rounded-lg border p-3">
                      <div className="shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-16 w-16 rounded border object-cover"
                          loading="lazy"
                        />
                      </div>
                      
                      <div className="flex min-w-0 flex-1 flex-col justify-between">
                        <div>
                          <h4 className="line-clamp-2 text-sm font-medium leading-tight">
                            {product.name}
                          </h4>
                          <p className="mt-1 text-sm font-semibold text-primary">
                            R$ {product.discountPrice.toFixed(2)}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between gap-2 mt-2">
                          <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 w-7 p-0"
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            
                            <span className="flex h-7 w-8 items-center justify-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 w-7 p-0"
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10"
                            onClick={() => removeFromCart(item.productId)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="shrink-0 border-t bg-background p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {cartItems.reduce((total, item) => total + item.quantity, 0)} item(s)
                  </span>
                  <span className="text-muted-foreground">Subtotal</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-xl font-bold text-primary">
                    R$ {subtotal.toFixed(2)}
                  </span>
                </div>
                
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={onGoToCheckout}
                >
                  Finalizar Compra
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}