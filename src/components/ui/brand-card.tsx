interface BrandCardProps {
  name: string;
  logo: string;
  onClick: () => void;
  isSelected?: boolean;
}

export function BrandCard({ name, logo, onClick, isSelected = false }: BrandCardProps) {
  return (
    <div 
      onClick={onClick}
      className={`
        relative group cursor-pointer rounded-lg border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg p-4 bg-background
        ${isSelected 
          ? 'border-primary shadow-lg ring-2 ring-primary/20' 
          : 'border-border hover:border-primary/50'
        }
      `}
    >
      <div className="flex flex-col items-center space-y-3">
        <div className="w-full h-16 flex items-center justify-center">
          <img 
            src={logo} 
            alt={`Logo ${name}`}
            className="max-w-full max-h-full object-contain"
            loading="lazy"
          />
        </div>
        <h3 className={`
          text-sm font-medium text-center transition-colors duration-300
          ${isSelected ? 'text-primary' : 'text-foreground group-hover:text-primary'}
        `}>
          {name}
        </h3>
      </div>
      
      {isSelected && (
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-background rounded-full"></div>
        </div>
      )}
    </div>
  );
}