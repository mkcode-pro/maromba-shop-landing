import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, RotateCcw, Settings } from "lucide-react";
import { marked } from "marked";
import { geminiService } from "@/lib/gemini";
import type { ProfileData } from "./profile-form-step";

interface ChatStepProps {
  profileData: ProfileData;
  onNewConsultation: () => void;
}

export function ChatStep({ profileData, onNewConsultation }: ChatStepProps) {
  const [response, setResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
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

      // Importar lista real de produtos
      const { products } = await import("@/data/products");
      
      // Filtrar produtos por preferência
      let availableProducts = products;
      if (profileData.preference === "oral") {
        availableProducts = products.filter(p => 
          p.category === "orais" || p.category === "pct"
        );
      } else if (profileData.preference === "injetavel") {
        availableProducts = products.filter(p => 
          !["orais", "dianabol"].includes(p.category)
        );
      }

      const productsList = `
LISTA DE PRODUTOS DISPONÍVEIS:
${availableProducts.map(p => `- ${p.name}: ${p.description}`).join('\n')}
      `;

      const userProfile = `
PERFIL DO USUÁRIO:
- Gênero: ${profileData.gender}
- Objetivo Principal: ${profileData.objective}
- Preferência de Administração: ${profileData.preference}
      `;

      const fullPrompt = `${systemInstructions}\n\n${userProfile}\n\n${productsList}`;

      // Try real Gemini API first, fallback to mock
      let responseText;
      
      try {
        if (apiKey) {
          geminiService.setApiKey(apiKey);
          responseText = await geminiService.generateResponse(fullPrompt);
        } else {
          throw new Error("No API key");
        }
      } catch (apiError) {
        console.log("Using mock response:", apiError);
        // Fallback to mock response
        let mockResponse;
      
      if (profileData.gender === "feminino") {
        mockResponse = `
### Olá! Sou o Assistente Maromba 🔬

Analisei seu perfil e vou focar em substâncias com **baixo risco androgênico** para seu objetivo: **${profileData.objective}**

### 🎯 Protocolos Seguros para Mulheres

**Protocolo 1: Iniciante (Baixo Risco)**
- **Oxandrolona**: 5-10mg/dia por 6-8 semanas
- **Tamoxifeno**: 10mg/dia durante o ciclo (proteção)
- **Anastrozol**: 0.25mg 2x/semana (controle estrogênico)

**Protocolo 2: Intermediário**
- **Primobolan**: 50mg 2x/semana (injetável) 
- **Oxandrolona**: 10mg/dia (oral)
- **Tamoxifeno + Anastrozol**: conforme protocolo 1

### ⚠️ Cuidados Específicos

- **Sinais de Virilização**: Interrompa imediatamente se notar voz grave, aumento de pelos ou alterações no clitóris
- **Monitoramento**: Exames hormonais a cada 4 semanas
- **Doses Baixas**: NUNCA exceda as dosagens recomendadas

### 📋 PCT Feminino (4 semanas)

**Semanas 1-2**: Tamoxifeno 20mg/dia
**Semanas 3-4**: Tamoxifeno 10mg/dia

**IMPORTANTE**: Este protocolo é baseado apenas nos produtos disponíveis. Consulte sempre um endocrinologista especializado!`;
      } else {
        mockResponse = `
### Olá! Sou o Assistente Maromba 💪

Com base no seu perfil (**${profileData.gender}**, objetivo: **${profileData.objective}**), criei protocolos específicos usando nossa linha de produtos.

### 🎯 Protocolo Intermediário (8 semanas)

**Ciclo Base**
- **Enantato de Testosterona**: 250mg 2x/semana (500mg/semana)
- **Decanoato de Nandrolona**: 200mg/semana (ganhos sólidos)
- **Anastrozol**: 0.5mg 2x/semana (controle estrogênico)

**Kickstart Oral (4 primeiras semanas)**
- **Metandrostenolona**: 20mg/dia (ganhos rápidos)

### 🔄 Protocolo Avançado (10 semanas)

**Base Anabólica**
- **Enantato de Testosterona**: 400mg/semana
- **Acetato de Trembolona**: 300mg/semana
- **Stanozolol**: 50mg/dia (últimas 6 semanas)

### 🛡️ PCT (4 semanas pós-ciclo)

**Semanas 1-2**: 
- Tamoxifeno 40mg/dia + Clomifeno 100mg/dia

**Semanas 3-4**: 
- Tamoxifeno 20mg/dia + Clomifeno 50mg/dia

### ⚠️ Monitoramento Obrigatório

- **Exames pré-ciclo**: Hemograma, lipidograma, função hepática
- **Durante**: Pressão arterial semanal
- **Pós-PCT**: Exames hormonais completos

**FUNDAMENTAL**: Acompanhamento médico especializado é obrigatório!`;
        }
        responseText = mockResponse;
      }

      // Simulate API delay only for mock
      if (!apiKey) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      const htmlResponse = await marked(responseText);
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
              <h2 className="text-lg font-semibold text-foreground">
                Assistente Maromba
              </h2>
              <p className="text-sm text-muted-foreground">
                {apiKey ? "IA Gemini ativada" : "Modo simulação ativa"}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowApiKeyInput(!showApiKeyInput)}
                className="gap-2"
              >
                <Settings className="h-4 w-4" />
                {apiKey ? "Configurado" : "Configurar IA"}
              </Button>
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
          
          {/* API Key Input */}
          {showApiKeyInput && (
            <div className="mt-4 p-4 bg-muted rounded-lg space-y-3">
              <Label htmlFor="apikey" className="text-sm font-medium">
                Chave da API Gemini (opcional - para IA real)
              </Label>
              <div className="flex gap-2">
                <Input
                  id="apikey"
                  type="password"
                  placeholder="Cole sua API key do Google Gemini aqui..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="flex-1"
                />
                <Button
                  size="sm"
                  onClick={() => setShowApiKeyInput(false)}
                  disabled={!apiKey}
                >
                  Salvar
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Obtenha sua chave gratuita em: https://makersuite.google.com/app/apikey
              </p>
            </div>
          )}
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