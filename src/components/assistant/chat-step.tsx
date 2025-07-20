import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, RotateCcw } from "lucide-react";
import { marked } from "marked";
import type { ProfileData } from "./profile-form-step";

interface ChatStepProps {
  profileData: ProfileData;
  onNewConsultation: () => void;
}

// Lista de produtos reais da loja, com a terminologia correta
const realProducts = [
    { name: 'Boldenona', type: 'Injetável' },
    { name: 'Cipionato de Testosterona', type: 'Injetável' },
    { name: 'Decanoato de Nandrolona (Deca)', type: 'Injetável' },
    { name: 'Metandrostenolona (Dianabol)', type: 'Oral' },
    { name: 'Estanozolol (Stanozolol)', type: 'Oral' },
    { name: 'Acetato de Trembolona', type: 'Injetável' },
    { name: 'Drostanolona (Masteron)', type: 'Injetável' },
    { name: 'Oxandrolona (Anavar)', type: 'Oral' },
    { name: 'Metenolona (Primobolan)', type: 'Injetável' },
    { name: 'Enantato de Testosterona', type: 'Injetável' },
    { name: 'Oximetolona (Hemogenin)', type: 'Oral' }
];

export function ChatStep({ profileData, onNewConsultation }: ChatStepProps) {
  const [response, setResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    generateSuggestion();
  }, [profileData]); // Adicionado profileData como dependência para regerar se o perfil mudar

  const generateSuggestion = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      // Instruções do sistema aprimoradas para gerar MÚLTIPLAS SUGESTÕES
      const systemInstructions = `
Você é um especialista em protocolos farmacológicos ergogênicos chamado "Assistente Maromba". Sua personalidade é técnica, precisa e focada em segurança clínica. Sua tarefa é analisar o perfil do usuário e a lista de compostos disponíveis para criar protocolos ergogênicos estruturados.

### REGRAS CRÍTICAS PARA PERFIL FEMININO:
1. **FOCO EM BAIXA VIRILIZAÇÃO:** Sua prioridade máxima é a segurança. Sugira APENAS substâncias com baixo risco androgênico.
2. **COMPOSTOS APROVADOS (ÚNICOS PERMITIDOS):** Baseie protocolos EXCLUSIVAMENTE em: Oxandrolona (Anavar), Primobolan (Metenolona), Stanozolol (doses baixas), e Hemogenin (doses mínimas). Para Stanozolol e Hemogenin, sempre enfatize monitoramento rigoroso.
3. **COMPOSTOS PROIBIDOS:** É terminantemente proibido mencionar para mulheres: Testosterona (qualquer éster), Trembolona, Dianabol, Boldenona ou qualquer composto com alto potencial androgênico.
4. **PROTOCOLOS MÚLTIPLOS E VARIADOS:** Sempre ofereça **várias opções de ciclos** com diferentes compostos ou combinações, categorizando-as por intensidade ou tipo de ganho (ex: "Opção 1: Foco em Qualidade e Segurança", "Opção 2: Ganhos de Volume com Cautela"). Detalhe o propósito de cada opção.

### REGRAS GERAIS PARA PROTOCOLOS:
1. **BASEADO EXCLUSIVAMENTE NA LISTA:** Utilize APENAS os compostos da "lista de produtos disponíveis" fornecida.
2. **APRESENTAR VÁRIAS OPÇÕES:** Em vez de uma única sugestão, seu objetivo principal é fornecer um **leque com as opções de protocolos mais comuns e eficazes** para o perfil do usuário, usando os produtos disponíveis. Apresente no mínimo 2-3 opções, se possível.
3. **ESTRUTURA TÉCNICA OBRIGATÓRIA:** - Apresentação como especialista em farmacologia esportiva.
   - Para cada opção, detalhe: Protocolos de 6-8 semanas para perfil intermediário, dosagens precisas com frequência, ancilares para proteção e controle hormonal, e um protocolo de PCT (Terapia Pós-Ciclo) detalhado.
4. **FORMATAÇÃO PROFISSIONAL:** Use Markdown estruturado (### para seções, ** para compostos, - para dosagens).
5. **LINGUAGEM TÉCNICA:** Utilize terminologia farmacológica precisa, evite linguagem coloquial.
      `;

      // Filtra a lista de produtos com base na preferência do usuário
      let availableProducts = realProducts;
      if (profileData.preference.toLowerCase() === 'oral') {
          availableProducts = realProducts.filter(p => p.type === 'Oral');
      } else if (profileData.preference.toLowerCase() === 'injetável') {
          availableProducts = realProducts.filter(p => p.type === 'Injetável');
      }
      
      const productsList = `
LISTA DE COMPOSTOS FARMACOLÓGICOS DISPONÍVEIS:
${availableProducts.map(p => `- ${p.name}`).join('\n')}
      `;

      const userProfile = `
PERFIL CLÍNICO DO USUÁRIO:
- Sexo Biológico: ${profileData.gender}
- Objetivo do Protocolo: ${profileData.objective}
- Via de Administração Preferencial: ${profileData.preference}
      `;

      const fullPrompt = `${systemInstructions}\n\n${userProfile}\n\n${productsList}`;

      // --- IMPLEMENTAÇÃO REAL DA API ---
      const apiKey = "AIzaSyBAAMbYYD5UbnXbO2wwJs88S2FY0-HmxlY"; // Chave da API
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      
      const apiResponse = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: fullPrompt }] }] })
      });

      if (!apiResponse.ok) {
        const errorBody = await apiResponse.json();
        console.error("API Error:", errorBody);
        throw new Error("Falha na comunicação com a IA. Verifique a chave da API ou tente novamente.");
      }

      const result = await apiResponse.json();
      
      if (!result.candidates || result.candidates.length === 0) {
        throw new Error("A IA não retornou uma resposta válida.");
      }

      const aiText = result.candidates[0].content.parts[0].text;
      
      const htmlResponse = await marked(aiText);
      setResponse(htmlResponse);

    } catch (err: any) {
      setError(err.message || "Erro ao gerar sugestão. Tente novamente.");
      console.error("Error generating suggestion:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header Fixo */}
      <div className="flex-shrink-0 border-b p-4 bg-background">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Assistente Maromba
            </h2>
            <p className="text-sm text-muted-foreground">
              Protocolo Gerado por IA
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

      {/* Área de Chat com Rolagem */}
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center space-y-3">
                <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                <p className="text-muted-foreground">
                  Calculando protocolos ergogênicos personalizados...
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <p className="text-destructive text-center font-medium">{error}</p>
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
               <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800 font-medium">
                    ⚠️ **AVISO MÉDICO:** Este protocolo é meramente educacional. Consulte sempre um endocrinologista especializado antes de iniciar qualquer protocolo ergogênico.
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

      {/* Footer Fixo */}
      <div className="flex-shrink-0 border-t p-4 bg-background">
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
