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
      <DrawerContent className="fixed right-0 top-0 bottom-0 left-auto h-screen w-full max-w-md rounded-none border-l">
        <DrawerHeader className="flex items-center justify-between border-b p-4">
          <DrawerTitle className="text-lg font-semibold">Seu Carrinho</DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="sm" className="p-1">
              <X className="h-5 w-5" />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-muted-foreground mb-4">Seu carrinho está vazio</p>
              <DrawerClose asChild>
                <Button variant="outline">Continue Comprando</Button>
              </DrawerClose>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => {
                const product = getProductById(item.productId);
                if (!product) return null;

                return (
                  <div key={item.productId} className="flex gap-3 p-3 border rounded-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2 mb-1">
                        {product.name}
                      </h4>
                      <p className="text-primary font-semibold">
                        R$ {product.discountPrice.toFixed(2)}
                      </p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-destructive"
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
          <DrawerFooter className="border-t p-4 space-y-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Subtotal:</span>
              <span className="text-primary">R$ {subtotal.toFixed(2)}</span>
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