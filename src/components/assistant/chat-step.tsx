import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, RotateCcw } from "lucide-react";
import { marked } from "marked";
import type { ProfileData } from "./profile-form-step";

interface ChatStepProps {
  profileData: ProfileData;
  onNewConsultation: () => void;
}

export function ChatStep({ profileData, onNewConsultation }: ChatStepProps) {
  const [response, setResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    generateSuggestion();
  }, []);

  const generateSuggestion = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      const systemInstructions = `
Você é um especialista em protocolos de musculação chamado "Assistente Maromba". Sua personalidade é amigável, direta e focada em segurança. Sua tarefa é analisar o perfil do usuário e a lista de produtos disponíveis para criar sugestões de ciclos.

### REGRAS CRÍTICAS PARA PERFIL FEMININO:
1. **FOCO EM BAIXA VIRILIZAÇÃO:** Sua prioridade máxima é a segurança. Sugira APENAS substâncias com baixo risco androgênico.
2. **SUBSTÂNCIAS RECOMENDADAS (ÚNICAS PERMITIDAS):** Baseie suas sugestões EXCLUSIVAMENTE em: Oxandrolona, Primobolan, Stanozolol, e Hemogenin. Para Hemogenin e Stanozolol, sempre recomende doses baixas e explique que são opções que exigem mais cautela.
3. **PROIBIÇÃO ABSOLUTA:** É terminantemente proibido sequer MENCIONAR as seguintes substâncias para mulheres: qualquer tipo de Testosterona, Trembolona, Dianabol. Foque apenas no que é seguro e recomendado.
4. **MÚLTIPLAS OPÇÕES:** Ofereça pelo menos duas opções de ciclos diferentes se houver produtos adequados.

### REGRAS GERAIS:
1. **BASEADO NA LISTA:** Suas sugestões devem usar APENAS os produtos da "lista de produtos disponíveis" fornecida.
2. **ESTRUTURA DA RESPOSTA:** Comece se apresentando, crie sugestões de ciclo de 8 semanas para um usuário intermediário, inclua dosagens, proteções e TPC.
3. **FORMATAÇÃO:** Use Markdown simples (### para títulos, ** para negrito, - para listas).
      `;

      const productsList = `
LISTA DE PRODUTOS DISPONÍVEIS:
- Whey Protein Premium 1kg
- Whey Isolado Chocolate 2kg  
- Whey Hidrolisado Baunilha
- Creatina Monohidratada 300g
- Creatina Creapure 500g
- Pré-Treino Explosive 300g
- Pré-Treino Pump Formula
- Multivitamínico Complete
- Vitamina D3 2000UI
- BCAA 2:1:1 240 cápsulas
- Glutamina Powder 300g
- Termogênico Fire 60 caps
- L-Carnitina Liquid 500ml
      `;

      const userProfile = `
PERFIL DO USUÁRIO:
- Gênero: ${profileData.gender}
- Objetivo Principal: ${profileData.objective}
- Preferência de Administração: ${profileData.preference}
      `;

      const fullPrompt = `${systemInstructions}\n\n${userProfile}\n\n${productsList}`;

      // Note: This is a mock implementation since we don't have the actual Gemini API key
      // In a real implementation, you would call the Gemini API here
      const mockResponse = `
### Olá! Sou o Assistente Maromba 💪

Analisei seu perfil e tenho algumas sugestões baseadas nos produtos disponíveis na loja. Como você é **${profileData.gender}** e busca **${profileData.objective}**, vou focar em suplementos seguros e eficazes.

### 🎯 Sugestões Personalizadas

**Opção 1: Stack Básico para Iniciantes**
- **Whey Protein Premium 1kg**: 30g após o treino
- **Creatina Monohidratada 300g**: 3g diários
- **Multivitamínico Complete**: 1 cápsula no café da manhã
- **BCAA 2:1:1**: 10g durante o treino

**Opção 2: Stack Avançado para Resultados Otimizados**
- **Whey Isolado Chocolate 2kg**: 25g pós-treino + 25g entre refeições
- **Creatina Creapure 500g**: 5g pós-treino
- **Pré-Treino Explosive**: 1 dose 30min antes do treino
- **Glutamina Powder**: 10g antes de dormir
- **Termogênico Fire**: 1 cápsula em jejum

### ⚠️ Recomendações Importantes

- **Hidratação**: Beba pelo menos 3L de água por dia
- **Acompanhamento**: Consulte um nutricionista para ajustes
- **Progressão**: Avalie resultados a cada 4 semanas
- **Descanso**: Respeite os dias de recuperação

### 📋 Protocolo de 8 Semanas

**Semanas 1-2**: Adaptação (doses menores)
**Semanas 3-6**: Protocolo completo
**Semanas 7-8**: Manutenção e avaliação

Lembre-se: Esta é uma sugestão educativa. Sempre consulte profissionais de saúde antes de iniciar qualquer protocolo!
      `;

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const htmlResponse = await marked(mockResponse);
      setResponse(htmlResponse);
    } catch (err) {
      setError("Erro ao gerar sugestão. Tente novamente.");
      console.error("Error generating suggestion:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b p-4 bg-background">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-pharma-dark">
              Assistente Maromba
            </h2>
            <p className="text-sm text-muted-foreground">
              Suas sugestões personalizadas estão prontas!
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onNewConsultation}
            className="gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Nova Consulta
          </Button>
        </div>
      </div>

      {/* Chat Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center space-y-3">
                <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                <p className="text-muted-foreground">
                  Analisando seu perfil e gerando sugestões...
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <p className="text-destructive text-center">{error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={generateSuggestion}
                className="mx-auto mt-3 flex gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Tentar Novamente
              </Button>
            </div>
          ) : (
            <div className="bg-card border rounded-lg p-6">
              <div 
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: response }}
              />
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t p-4 bg-background">
        <Button
          onClick={onNewConsultation}
          className="w-full"
          size="lg"
        >
          Fazer Nova Consulta
        </Button>
      </div>
    </div>
  );
}