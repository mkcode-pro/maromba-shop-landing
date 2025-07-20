import { Minus, Plus, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
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

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="fixed right-0 top-0 bottom-0 left-auto h-screen w-full max-w-sm sm:max-w-md rounded-none border-l bg-background flex flex-col">
        <DrawerHeader className="flex items-center justify-between border-b p-4 shrink-0">
          <DrawerTitle className="text-lg font-semibold">Seu Carrinho</DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="sm" className="p-1 hover:bg-muted">
              <X className="h-5 w-5" />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-4 min-h-0">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="rounded-full bg-muted p-8 mb-4">
                <div className="w-16 h-16 rounded-full bg-muted-foreground/20 flex items-center justify-center">
                  <span className="text-2xl">🛒</span>
                </div>
              </div>
              <h3 className="text-lg font-medium mb-2">Carrinho vazio</h3>
              <p className="text-muted-foreground mb-6 text-sm">
                Adicione produtos para começar suas compras
              </p>
              <DrawerClose asChild>
                <Button variant="outline" className="w-full max-w-48">
                  Continue Comprando
                </Button>
              </DrawerClose>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item) => {
                const product = getProductById(item.productId);
                if (!product) return null;

                return (
                  <div key={item.productId} className="flex gap-3 p-3 border rounded-lg bg-card hover:bg-muted/50 transition-colors">
                    <div className="shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded border"
                        loading="lazy"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm leading-tight mb-1 line-clamp-2">
                          {product.name}
                        </h4>
                        <p className="text-primary font-semibold text-sm">
                          R$ {product.discountPrice.toFixed(2)}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3 gap-2">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 w-7 p-0 shrink-0"
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          
                          <div className="min-w-[32px] text-center">
                            <span className="text-sm font-medium">
                              {item.quantity}
                            </span>
                          </div>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 w-7 p-0 shrink-0"
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
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

        {cartItems.length > 0 && (
          <DrawerFooter className="border-t p-4 space-y-4 shrink-0 bg-background">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)} item(s)
                </span>
                <span className="text-sm text-muted-foreground">
                  Subtotal
                </span>
              </div>
              <div className="flex justify-between items-center text-lg font-semibold">
                <span></span>
                <span className="text-primary">R$ {subtotal.toFixed(2)}</span>
              </div>
            </div>
            
            <Button 
              className="w-full" 
              size="lg"
              onClick={onGoToCheckout}
            >
              Ir para o Pagamento
            </Button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}