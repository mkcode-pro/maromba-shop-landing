
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, Check } from "lucide-react";

interface TermsStepProps {
  onAccept: () => void;
}

export function TermsStep({ onAccept }: TermsStepProps) {
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const scrollElement = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]') as HTMLDivElement;
    
    if (!scrollElement) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollElement;
      const maxScroll = scrollHeight - clientHeight;
      
      if (maxScroll <= 0) {
        // Conteúdo não é scrollável, habilitar botão imediatamente
        setHasScrolledToEnd(true);
        setScrollProgress(100);
        return;
      }
      
      const progress = Math.min((scrollTop / maxScroll) * 100, 100);
      setScrollProgress(progress);
      
      // Considerar "fim" quando chegou a 95% ou mais
      const isAtEnd = progress >= 95;
      
      if (isAtEnd && !hasScrolledToEnd) {
        setHasScrolledToEnd(true);
      }
    };

    // Verificar imediatamente se o conteúdo é scrollável
    handleScroll();
    
    scrollElement.addEventListener('scroll', handleScroll, { passive: true });
    
    // Cleanup
    return () => {
      scrollElement.removeEventListener('scroll', handleScroll);
    };
  }, [hasScrolledToEnd]);

  const termsText = `
TERMO DE RESPONSABILIDADE E ISENÇÃO DE RESPONSABILIDADE

ASSISTENTE ESPECIALIZADO EM PROTOCOLOS ERGOGÊNICOS

LEIA ATENTAMENTE ANTES DE PROSSEGUIR

1. NATUREZA ESTRITAMENTE EDUCACIONAL
As informações fornecidas pelo Assistente Maromba têm caráter exclusivamente educacional e científico sobre protocolos ergogênicos e anabolizantes. NÃO constituem prescrição médica, recomendação terapêutica ou orientação profissional de saúde.

2. CONSULTA MÉDICA ESPECIALIZADA OBRIGATÓRIA
Antes de iniciar qualquer protocolo, ciclo ou administração de substâncias ergogênicas, é OBRIGATÓRIO consultar um médico endocrinologista especializado em medicina esportiva. Apenas profissionais médicos qualificados podem:
- Avaliar sua condição hormonal atual
- Prescrever protocolos adequados ao seu perfil
- Monitorar sua saúde durante os ciclos
- Prescrever terapias pós-ciclo (PCT) apropriadas

3. RISCOS GRAVES À SAÚDE
O uso inadequado de substâncias anabolizantes pode causar:
- Supressão permanente da produção hormonal natural
- Danos hepáticos irreversíveis (hepatotoxicidade)
- Problemas cardiovasculares graves (hipertensão, alterações lipídicas)
- Alterações comportamentais (agressividade, depressão)
- Efeitos androgênicos indesejados (virilização em mulheres)
- Ginecomastia e atrofia testicular em homens
- Infertilidade temporária ou permanente
- Risco de morte em casos de overdose ou reações adversas

4. RESPONSABILIDADE INDIVIDUAL TOTAL
Você reconhece e aceita expressamente que:
- É TOTALMENTE responsável por suas decisões e ações
- O Império Farma NÃO se responsabiliza por QUALQUER consequência do uso das informações
- As sugestões são meramente informativas e NÃO substituem orientação médica
- Você assume TODOS os riscos envolvidos no uso de substâncias ergogênicas
- Compreende que ciclos mal planejados podem causar danos irreversíveis

5. MAIORIDADE E CAPACIDADE LEGAL
Ao prosseguir, você declara sob responsabilidade civil e criminal:
- Ser maior de 21 anos
- Ter plena capacidade civil e mental
- Compreender totalmente os riscos envolvidos
- Não estar sob efeito de substâncias que alterem seu julgamento

6. ISENÇÃO TOTAL DE RESPONSABILIDADE
O Império Farma, seus proprietários, funcionários, desenvolvedores e afiliados ficam COMPLETAMENTE ISENTOS de qualquer responsabilidade por:
- Danos físicos, mentais ou hormonais decorrentes do uso das informações
- Resultados obtidos ou não obtidos com os protocolos sugeridos
- Efeitos colaterais, complicações médicas ou emergências de saúde
- Decisões tomadas com base nas informações do assistente
- Problemas legais relacionados à posse ou uso de substâncias controladas

7. USO EXCLUSIVAMENTE POR CONTA E RISCO
Ao aceitar este termo, você reconhece que utiliza as informações EXCLUSIVAMENTE por sua conta e risco, assumindo TOTAL e IRRESTRITA responsabilidade por todas as consequências.

8. LEGALIDADE E REGULAMENTAÇÃO
Você declara estar ciente de que:
- Muitas substâncias ergogênicas são controladas pela ANVISA
- A posse e uso podem ter implicações legais
- É sua responsabilidade conhecer e respeitar as leis locais
- O Império Farma não incentiva atividades ilegais

ATENÇÃO CRÍTICA: Este assistente NÃO substitui acompanhamento médico especializado. Procure SEMPRE orientação de um endocrinologista antes de tomar qualquer decisão relacionada ao uso de substâncias ergogênicas.

A medicina esportiva é uma especialidade complexa que requer supervisão profissional rigorosa.
  `;

  return (
    <div className="flex flex-col h-screen p-4 sm:p-6">
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
          Termo de Responsabilidade
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Leia atentamente todo o conteúdo abaixo
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>Progresso da leitura</span>
          <span>{Math.round(scrollProgress)}%</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>

      <div className="flex-1 mb-4 sm:mb-6 min-h-0">
        <ScrollArea ref={scrollAreaRef} className="h-full border rounded-lg bg-background">
          <div 
            ref={contentRef}
            className="p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-line"
          >
            {termsText}
          </div>
        </ScrollArea>
      </div>

      {/* Scroll Indicator */}
      {!hasScrolledToEnd && (
        <div className="flex items-center justify-center mb-2 text-muted-foreground animate-bounce">
          <ChevronDown className="h-4 w-4 mr-2" />
          <span className="text-sm">Role para baixo para continuar</span>
        </div>
      )}

      <Button
        onClick={onAccept}
        disabled={!hasScrolledToEnd}
        className="w-full"
        size="lg"
      >
        {hasScrolledToEnd ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Li e Aceito
          </>
        ) : (
          "Role até o final para continuar"
        )}
      </Button>
    </div>
  );
}
