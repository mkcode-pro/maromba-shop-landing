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
      <DrawerContent className="fixed right-0 top-0 bottom-0 left-auto h-screen w-full max-w-md rounded-none border-l bg-background">
        <DrawerHeader className="flex items-center justify-between p-6 border-b">
          <DrawerTitle className="text-xl font-medium text-foreground">Seu Carrinho</DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <X className="h-5 w-5" />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                <span className="text-3xl">🛒</span>
              </div>
              <p className="text-muted-foreground text-lg mb-6">Seu carrinho está vazio</p>
              <DrawerClose asChild>
                <Button variant="outline" size="lg">Continue Comprando</Button>
              </DrawerClose>
            </div>
          ) : (
            <div className="p-6 space-y-6">
              {cartItems.map((item) => {
                const product = getProductById(item.productId);
                if (!product) return null;

                return (
                  <div key={item.productId} className="flex items-center gap-4 pb-6 border-b border-border/50 last:border-0">
                    <div className="w-20 h-20 rounded-lg overflow-hidden border bg-muted/30">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="font-medium text-foreground leading-tight">
                          {product.name}
                        </h3>
                        <p className="text-lg font-semibold text-primary mt-1">
                          R$ {product.discountPrice.toFixed(2)}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-9 w-9 p-0 rounded-full"
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          
                          <span className="text-lg font-medium min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-9 w-9 p-0 rounded-full"
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-9 w-9 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => removeFromCart(item.productId)}
                        >
                          <Trash2 className="h-4 w-4" />
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
          <div className="border-t bg-background p-6">
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{cartItems.reduce((total, item) => total + item.quantity, 0)} item(s)</span>
                <span>Subtotal</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">Subtotal</span>
                <span className="text-2xl font-bold text-primary">
                  R$ {subtotal.toFixed(2)}
                </span>
              </div>
              
              <Button 
                className="w-full h-12 text-lg font-medium" 
                onClick={onGoToCheckout}
              >
                Ir para o Pagamento
              </Button>
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}