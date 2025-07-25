import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { AssistantModal } from "@/components/assistant/assistant-modal";
import mascotImage from "@/assets/robozinho-maromba.png";

export function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChatClick = () => {
    setIsModalOpen(true);
  };

  return (
    <section className="bg-hero-gradient text-white pt-20 pb-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Conteúdo à esquerda */}
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Expertise em Protocolos{" "}
              <span className="text-pharma-yellow">Ergogênicos</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              Assistente especializado em protocolos e ciclos anabolizantes. 
              Receba orientações técnicas baseadas em ciência e experiência prática 
              para maximizar seus resultados na musculação.
            </p>
            
              <Button 
              onClick={handleChatClick}
              size="lg"
              className="bg-pharma-yellow text-pharma-yellow-foreground hover:bg-pharma-yellow/90 shadow-button text-lg px-8 py-3 h-auto"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Consultar Especialista
            </Button>
          </div>

          {/* Imagem à direita */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <img 
                src={mascotImage} 
                alt="Assistente Maromba - Especialista em Protocolos Ergogênicos"
                className="w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-2xl"
              />
              <div className="absolute inset-0 bg-pharma-yellow/10 rounded-full blur-3xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
      
      <AssistantModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen}
      />
    </section>
  );
}