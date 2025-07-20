
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
    generateProtocolSuggestion();
  }, []);

  const generateProtocolSuggestion = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      const systemInstructions = `
Você é um especialista em protocolos farmacológicos ergogênicos chamado "Assistente Maromba". Sua personalidade é técnica, precisa e focada em segurança clínica. Sua tarefa é analisar o perfil do usuário e a lista de compostos disponíveis para criar protocolos ergogênicos estruturados.

### REGRAS CRÍTICAS PARA PERFIL FEMININO:
1. **PRIORIDADE ABSOLUTA EM SEGURANÇA HORMONAL:** Foque exclusivamente em compostos com baixíssimo potencial androgênico e risco mínimo de virilização.
2. **COMPOSTOS APROVADOS (ÚNICOS PERMITIDOS):** Baseie protocolos EXCLUSIVAMENTE em: Oxandrolona (Anavar), Primobolan (Metenolona), Stanozolol (doses baixas), e Hemogenin (doses mínimas). Para Stanozolol e Hemogenin, sempre enfatize monitoramento rigoroso.
3. **COMPOSTOS PROIBIDOS:** É terminantemente proibido mencionar para mulheres: Testosterona (qualquer éster), Trembolona, Dianabol, Boldenona ou qualquer composto com alto potencial androgênico.
4. **PROTOCOLOS MÚLTIPLOS:** Sempre ofereça pelo menos duas opções de ciclos com diferentes níveis de intensidade.

### REGRAS GERAIS PARA PROTOCOLOS:
1. **BASEADO EXCLUSIVAMENTE NA LISTA:** Utilize APENAS os compostos da "lista de produtos disponíveis" fornecida.
2. **ESTRUTURA TÉCNICA OBRIGATÓRIA:** 
   - Apresentação como especialista em farmacologia esportiva
   - Protocolos de 6-8 semanas para perfil intermediário
   - Dosagens precisas com frequência de administração
   - Ancilares para proteção e controle hormonal
   - Protocolo de PCT (Terapia Pós-Ciclo) detalhado
3. **FORMATAÇÃO PROFISSIONAL:** Use Markdown estruturado (### para seções, ** para compostos, - para dosagens).
4. **LINGUAGEM TÉCNICA:** Utilize terminologia farmacológica precisa, evite linguagem coloquial.
      `;

      // Import product list
      const { products } = await import("@/data/products");
      
      // Filter products by user preference
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
LISTA DE COMPOSTOS FARMACOLÓGICOS DISPONÍVEIS:
${availableProducts.map(p => `- ${p.name}: ${p.description}`).join('\n')}
      `;

      const userProfile = `
PERFIL CLÍNICO DO USUÁRIO:
- Sexo Biológico: ${profileData.gender}
- Objetivo do Protocolo: ${profileData.objective}
- Via de Administração Preferencial: ${profileData.preference}
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
        console.log("Using clinical mock response:", apiError);
        // Enhanced clinical mock response
        let mockResponse;
      
      if (profileData.gender === "feminino") {
        mockResponse = `
### Assistente Maromba - Consultor em Farmacologia Esportiva 🧬

Analisei seu perfil clínico e desenvolverei protocolos ergogênicos com **foco primário em segurança hormonal** para o objetivo: **${profileData.objective}**

### 🎯 Protocolos Clínicos para Perfil Feminino

**PROTOCOLO CONSERVADOR (Primeira Abordagem)**
- **Oxandrolona**: 5-10mg/dia (via oral) por 6 semanas
- **Tamoxifeno**: 10mg/dia durante todo o ciclo (proteção estrogênica)
- **Anastrozol**: 0,25mg 2x/semana (modulação aromatase)

**PROTOCOLO INTERMEDIÁRIO (Experiência Prévia)**
- **Primobolan (Metenolona)**: 50mg 2x/semana (via intramuscular)
- **Oxandrolona**: 10mg/dia (potencialização oral)
- **Ancilares**: Tamoxifeno 10mg/dia + Anastrozol conforme protocolo 1

### ⚠️ Monitoramento Clínico Obrigatório

**Sinais de Alerta Imediato**: Interrompa IMEDIATAMENTE se observar:
- Alterações na voz (rouquidão, grave)
- Crescimento piloso facial/corporal anormal
- Hipertrofia clitoriana
- Irregularidades menstruais severas

**Exames Laboratoriais**: 
- Perfil hormonal completo a cada 4 semanas
- Função hepática (TGO, TGP, bilirrubinas)
- Perfil lipídico completo

### 📋 PCT Feminina Especializada (4 semanas)

**Semanas 1-2**: 
- Tamoxifeno 20mg/dia
- Clomifeno 25mg/dia

**Semanas 3-4**: 
- Tamoxifeno 10mg/dia
- Suporte hepático com Silimarina

**DISCLAIMER MÉDICO**: Este protocolo é baseado exclusivamente nos compostos disponíveis em estoque. Acompanhamento endocrinológico especializado é OBRIGATÓRIO antes, durante e após qualquer protocolo.`;
      } else {
        mockResponse = `
### Assistente Maromba - Especialista em Protocolos Ergogênicos 💪

Baseado em seu perfil clínico (**${profileData.gender}**, objetivo: **${profileData.objective}**), desenvolvi protocolos farmacológicos estruturados utilizando compostos de nossa linha disponível.

### 🎯 Protocolo Intermediário Estruturado (8 semanas)

**BASE ANABÓLICA PRINCIPAL**
- **Enantato de Testosterona**: 250mg 2x/semana (500mg/semana total)
- **Decanoato de Nandrolona**: 200mg/semana (ganhos em massa magra)
- **Anastrozol**: 0,5mg 2x/semana (controle aromático essencial)

**POTENCIALIZADOR ORAL (Primeiras 4 semanas)**
- **Metandrostenolona**: 20mg/dia dividido em 2 tomadas
- **Silimarina**: 150mg 3x/dia (proteção hepática)

### 🔄 Protocolo Avançado de Alta Performance (10 semanas)

**STACK ANABÓLICO INTENSIVO**
- **Enantato de Testosterona**: 400mg/semana (base hormonal)
- **Acetato de Trembolona**: 300mg/semana (recomposição corporal)
- **Stanozolol**: 50mg/dia (6 últimas semanas - definição)

**ANCILARES OBRIGATÓRIOS**
- **Anastrozol**: 0,5mg EOD (controle estrogênico)
- **Cabergolina**: 0,25mg 2x/semana (controle prolactina - Trembolona)

### 🛡️ PCT Farmacológica Estruturada (4 semanas pós-ciclo)

**Fase Intensiva (Semanas 1-2)**
- **Tamoxifeno**: 40mg/dia (modulação estrogênica)
- **Clomifeno**: 100mg/dia (estimulação LH/FSH)

**Fase de Transição (Semanas 3-4)**
- **Tamoxifeno**: 20mg/dia
- **Clomifeno**: 50mg/dia
- **HCG**: 1500ui 2x/semana (se disponível)

### 📊 Monitoramento Clínico Rigoroso

**Exames Pré-Ciclo Obrigatórios**
- Hemograma completo + plaquetas
- Perfil hormonal (Test total/livre, LH, FSH, E2)
- Função hepática completa
- Perfil lipídico e cardiovascular

**Acompanhamento Durante o Protocolo**
- Pressão arterial semanal
- Peso corporal e composição 2x/semana
- Sinais de ginecomastia ou retenção hídrica

**FUNDAMENTAL**: Todo protocolo ergogênico requer supervisão médica especializada. Esta consulta é puramente educacional e não substitui acompanhamento clínico profissional.`;
        }
        responseText = mockResponse;
      }

      // Simulate API processing time for mock
      if (!apiKey) {
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
      
      const htmlResponse = await marked(responseText);
      setResponse(htmlResponse);
    } catch (err) {
      setError("Erro ao calcular protocolo ergogênico. Tente novamente.");
      console.error("Error generating protocol:", err);
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
                {apiKey ? "IA Gemini Pro ativada" : "Modo simulação clínica ativa"}
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
                {apiKey ? "IA Configurada" : "Configurar IA"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onNewConsultation}
                className="gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Novo Protocolo
              </Button>
            </div>
          </div>
          
          {/* API Key Input */}
          {showApiKeyInput && (
            <div className="mt-4 p-4 bg-muted rounded-lg space-y-3">
              <Label htmlFor="apikey" className="text-sm font-medium">
                Chave da API Gemini Pro (opcional - para IA real)
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
                  Configurar
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Obtenha sua chave gratuita em: https://makersuite.google.com/app/apikey
              </p>
            </div>
          )}
      </div>

      {/* Protocol Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center space-y-3">
                <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                <p className="text-muted-foreground">
                  Calculando protocolo ergogênico personalizado...
                </p>
                <p className="text-xs text-muted-foreground">
                  Analisando perfil clínico e compostos disponíveis
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <p className="text-destructive text-center font-medium">{error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={generateProtocolSuggestion}
                className="mx-auto mt-3 flex gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Recalcular Protocolo
              </Button>
            </div>
          ) : (
            <div className="bg-card border rounded-lg p-6">
              <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800 font-medium">
                  ⚠️ AVISO MÉDICO: Este protocolo é meramente educacional. Consulte sempre um endocrinologista especializado antes de iniciar qualquer protocolo ergogênico.
                </p>
              </div>
              <div 
                className="prose prose-sm max-w-none prose-headings:text-foreground prose-p:text-muted-foreground"
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
          Calcular Novo Protocolo
        </Button>
      </div>
    </div>
  );
}
