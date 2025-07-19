import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TermsStepProps {
  onAccept: () => void;
}

export function TermsStep({ onAccept }: TermsStepProps) {
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);
  
  const checkScrollPosition = (element: HTMLDivElement) => {
    const { scrollTop, scrollHeight, clientHeight } = element;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 20;
    setHasScrolledToEnd(isAtBottom);
  };

  const termsText = `
TERMO DE RESPONSABILIDADE E ISENÇÃO DE RESPONSABILIDADE

LEIA ATENTAMENTE ANTES DE PROSSEGUIR

1. NATUREZA EDUCACIONAL
As informações fornecidas pelo Assistente Maromba têm caráter exclusivamente educacional e informativo. Não constituem prescrição médica, recomendação terapêutica ou orientação profissional de saúde.

2. CONSULTA MÉDICA OBRIGATÓRIA
Antes de iniciar qualquer protocolo, suplementação ou alteração em sua rotina de treinamento, é OBRIGATÓRIO consultar um médico especialista. Apenas profissionais de saúde qualificados podem avaliar sua condição individual e prescrever tratamentos adequados.

3. RISCOS À SAÚDE
O uso inadequado de substâncias pode causar:
- Alterações hormonais graves
- Danos hepáticos e cardiovasculares
- Efeitos colaterais permanentes
- Complicações de saúde sérias
- Risco de vida em casos extremos

4. RESPONSABILIDADE INDIVIDUAL
Você reconhece e aceita que:
- É totalmente responsável por suas decisões e ações
- O Império Farma não se responsabiliza por consequências do uso das informações
- As sugestões não substituem orientação médica profissional
- Você está ciente dos riscos envolvidos

5. MAIORIDADE E CAPACIDADE
Ao prosseguir, você declara:
- Ser maior de 18 anos
- Ter plena capacidade civil
- Compreender totalmente este termo

6. ISENÇÃO DE RESPONSABILIDADE
O Império Farma, seus proprietários, funcionários e afiliados ficam completamente isentos de qualquer responsabilidade por:
- Danos à saúde decorrentes do uso das informações
- Resultados obtidos ou não obtidos
- Efeitos colaterais ou complicações
- Decisões tomadas com base nas informações fornecidas

7. USO POR SUA CONTA E RISCO
Ao aceitar este termo, você reconhece que utiliza as informações por sua conta e risco, assumindo total responsabilidade pelas consequências.

ATENÇÃO: Este assistente NÃO substitui acompanhamento médico. Procure sempre orientação profissional antes de tomar qualquer decisão relacionada à sua saúde.
  `;

  return (
    <div className="flex flex-col h-full p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-pharma-dark mb-2">
          Termo de Responsabilidade
        </h2>
        <p className="text-muted-foreground">
          Leia atentamente e role até o final para continuar
        </p>
      </div>

      <div className="flex-1 relative mb-6">
        <ScrollArea 
          className="h-full border rounded-lg"
          onScrollCapture={(e) => checkScrollPosition(e.currentTarget)}
        >
          <div className="p-4 text-sm leading-relaxed whitespace-pre-line">
            {termsText}
          </div>
        </ScrollArea>
      </div>

      <Button
        onClick={onAccept}
        disabled={!hasScrolledToEnd}
        className="w-full"
        size="lg"
      >
        {hasScrolledToEnd ? "Li e Aceito" : "Role até o final para continuar"}
      </Button>
    </div>
  );
}