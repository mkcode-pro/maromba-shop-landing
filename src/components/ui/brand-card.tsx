import { Card, CardContent } from "@/components/ui/card";

interface BrandCardProps {
  name: string;
  logo: string;
  onClick: () => void;
}

export function BrandCard({ name, logo, onClick }: BrandCardProps) {
  return (
    <Card 
      className="cursor-pointer group overflow-hidden border-0 bg-card-gradient shadow-card hover:shadow-button transition-all duration-300 hover:-translate-y-1"
      onClick={onClick}
    >
      <CardContent className="p-6 flex flex-col items-center justify-center h-24">
        <img 
          src={logo} 
          alt={`Logo ${name}`}
          className="max-h-12 max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </CardContent>
    </Card>
  );
}