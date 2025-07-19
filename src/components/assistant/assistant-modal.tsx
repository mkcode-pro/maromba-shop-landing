import { useState } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TermsStep } from "./terms-step";
import { ProfileFormStep, type ProfileData } from "./profile-form-step";
import { ChatStep } from "./chat-step";

interface AssistantModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = "terms" | "profile" | "chat";

export function AssistantModal({ open, onOpenChange }: AssistantModalProps) {
  const [currentStep, setCurrentStep] = useState<Step>("terms");
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  const handleTermsAccept = () => {
    setCurrentStep("profile");
  };

  const handleProfileSubmit = (data: ProfileData) => {
    setProfileData(data);
    setCurrentStep("chat");
  };

  const handleNewConsultation = () => {
    setCurrentStep("terms");
    setProfileData(null);
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset state when modal closes
    setTimeout(() => {
      setCurrentStep("terms");
      setProfileData(null);
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full h-screen m-0 p-0 rounded-none border-0 overflow-hidden">
        <DialogTitle className="sr-only">Assistente Maromba</DialogTitle>
        <DialogDescription className="sr-only">
          Assistente inteligente para orientações sobre protocolos de musculação
        </DialogDescription>
        <div className="relative flex flex-col h-full bg-background overflow-hidden">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 h-10 w-10 p-0 rounded-full bg-background/80 backdrop-blur-sm border shadow-sm hover:bg-background"
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Step Content */}
          <div className="flex-1 overflow-hidden">
            {currentStep === "terms" && (
              <TermsStep onAccept={handleTermsAccept} />
            )}
            
            {currentStep === "profile" && (
              <ProfileFormStep onSubmit={handleProfileSubmit} />
            )}
            
            {currentStep === "chat" && profileData && (
              <ChatStep 
                profileData={profileData} 
                onNewConsultation={handleNewConsultation}
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}