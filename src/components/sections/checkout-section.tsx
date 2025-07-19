import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useCartContext } from "@/contexts/cart-context";
import { products } from "@/data/products";
import { toast } from "sonner";

interface CheckoutSectionProps {
  isVisible: boolean;
}

interface FormData {
  fullName: string;
  whatsapp: string;
  address: string;
  cityState: string;
  cep: string;
}

export function CheckoutSection({ isVisible }: CheckoutSectionProps) {
  const { cartItems } = useCartContext();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    whatsapp: "",
    address: "",
    cityState: "",
    cep: ""
  });
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [pixKeyCopied, setPixKeyCopied] = useState(false);

  const pixKey = "imperio.farma@email.com";
  const whatsappNumber = "5511999999999"; // Substitua pelo número real

  const getProductById = (productId: string) => {
    return products.find(product => product.id === productId);
  };

  const total = cartItems.reduce((total, item) => {
    const product = getProductById(item.productId);
    return total + (product?.discountPrice || 0) * item.quantity;
  }, 0);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const copyPixKey = () => {
    navigator.clipboard.writeText(pixKey);
    setPixKeyCopied(true);
    toast.success("Chave PIX copiada!");
    setTimeout(() => setPixKeyCopied(false), 2000);
  };

  const isFormValid = () => {
    return Object.values(formData).every(field => field.trim() !== "") && paymentConfirmed;
  };

  const formatWhatsAppMessage = () => {
    const itemsList = cartItems.map(item => {
      const product = getProductById(item.productId);
      return `• ${product?.name} - Qtd: ${item.quantity} - R$ ${((product?.discountPrice || 0) * item.quantity).toFixed(2)}`;
    }).join('\n');

    const message = `🛒 *NOVO PEDIDO - IMPÉRIO FARMA*

📋 *DADOS DO CLIENTE:*
Nome: ${formData.fullName}
WhatsApp: ${formData.whatsapp}
Endereço: ${formData.address}
Cidade/Estado: ${formData.cityState}
CEP: ${formData.cep}

🛍️ *PRODUTOS:*
${itemsList}

💰 *TOTAL: R$ ${total.toFixed(2)}*

✅ *PAGAMENTO PIX CONFIRMADO PELO CLIENTE*

Chave PIX utilizada: ${pixKey}`;

    return encodeURIComponent(message);
  };

  const handleWhatsAppSend = () => {
    const message = formatWhatsAppMessage();
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isVisible) return null;

  return (
    <section id="checkout" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Finalizar Pedido
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Formulário de Dados */}
            <div className="bg-background rounded-lg border shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-6 text-foreground">
                Dados para Entrega
              </h3>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Nome Completo *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <Label htmlFor="whatsapp">WhatsApp *</Label>
                  <Input
                    id="whatsapp"
                    value={formData.whatsapp}
                    onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div>
                  <Label htmlFor="address">Endereço Completo *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Rua, número, complemento"
                  />
                </div>

                <div>
                  <Label htmlFor="cityState">Cidade/Estado *</Label>
                  <Input
                    id="cityState"
                    value={formData.cityState}
                    onChange={(e) => handleInputChange("cityState", e.target.value)}
                    placeholder="São Paulo/SP"
                  />
                </div>

                <div>
                  <Label htmlFor="cep">CEP *</Label>
                  <Input
                    id="cep"
                    value={formData.cep}
                    onChange={(e) => handleInputChange("cep", e.target.value)}
                    placeholder="00000-000"
                  />
                </div>
              </div>
            </div>

            {/* Instruções de Pagamento */}
            <div className="bg-background rounded-lg border shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-6 text-foreground">
                Pagamento via PIX
              </h3>

              <div className="space-y-6">
                <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                  <p className="text-2xl font-bold text-primary mb-2">
                    Total: R$ {total.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Valor total do pedido
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-muted rounded-lg p-8 mb-4">
                    <p className="text-muted-foreground">QR Code PIX</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      [QR Code será gerado aqui]
                    </p>
                  </div>
                </div>

                <div>
                  <Label>Chave PIX</Label>
                  <div className="flex gap-2 mt-1">
                    <Input value={pixKey} readOnly className="bg-muted" />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={copyPixKey}
                      className="shrink-0"
                    >
                      {pixKeyCopied ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="payment-confirmed"
                      checked={paymentConfirmed}
                      onCheckedChange={(checked) => setPaymentConfirmed(checked as boolean)}
                    />
                    <Label 
                      htmlFor="payment-confirmed" 
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Confirmo que realizei o pagamento via PIX
                    </Label>
                  </div>

                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    size="lg"
                    disabled={!isFormValid()}
                    onClick={handleWhatsAppSend}
                  >
                    Finalizar e Enviar no WhatsApp
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Ao clicar, você será redirecionado para o WhatsApp com todos os dados do pedido
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}