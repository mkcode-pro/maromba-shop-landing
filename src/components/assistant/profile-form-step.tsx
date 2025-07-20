import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export interface ProfileData {
  gender: "masculino" | "feminino";
  objective: string;
  preference: "oral" | "injetavel" | "ambos";
}

interface ProfileFormStepProps {
  onSubmit: (data: ProfileData) => void;
}

export function ProfileFormStep({ onSubmit }: ProfileFormStepProps) {
  const [formData, setFormData] = useState<ProfileData>({
    gender: "masculino",
    objective: "",
    preference: "ambos"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.objective.trim()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="flex flex-col h-full p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Perfil para Protocolo
        </h2>
        <p className="text-muted-foreground">
          Configure seus dados para receber protocolos personalizados de substâncias ergogênicas
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 space-y-6">
        <div className="space-y-3">
          <Label className="text-base font-semibold">Gênero</Label>
          <RadioGroup
            value={formData.gender}
            onValueChange={(value: "masculino" | "feminino") => 
              setFormData(prev => ({ ...prev, gender: value }))
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="masculino" id="masculino" />
              <Label htmlFor="masculino">Masculino</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="feminino" id="feminino" />
              <Label htmlFor="feminino">Feminino</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label htmlFor="objective" className="text-base font-semibold">
            Objetivo do Protocolo
          </Label>
          <Textarea
            id="objective"
            placeholder="Descreva seu objetivo específico (ex: bulk extremo, cutting definido, aumento de força powerlifting, recomposição corporal)"
            value={formData.objective}
            onChange={(e) => setFormData(prev => ({ ...prev, objective: e.target.value }))}
            className="min-h-[100px]"
            required
          />
        </div>

        <div className="space-y-3">
          <Label className="text-base font-semibold">Preferência de Administração</Label>
          <RadioGroup
            value={formData.preference}
            onValueChange={(value: "oral" | "injetavel" | "ambos") => 
              setFormData(prev => ({ ...prev, preference: value }))
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="oral" id="oral" />
              <Label htmlFor="oral">Oral</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="injetavel" id="injetavel" />
              <Label htmlFor="injetavel">Injetável</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ambos" id="ambos" />
              <Label htmlFor="ambos">Ambos</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="mt-auto pt-6">
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={!formData.objective.trim()}
          >
            Gerar Protocolo Personalizado
          </Button>
        </div>
      </form>
    </div>
  );
}