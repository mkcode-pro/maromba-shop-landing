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
        relative group cursor-pointer rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg bg-background
        ${isSelected 
          ? 'border-primary shadow-lg ring-2 ring-primary/20' 
          : 'border-border hover:border-primary/50'
        }
      `}
    >
      {/* Proporção fixa para consistência */}
      <div className="aspect-square p-4 sm:p-6">
        <div className="flex flex-col items-center justify-center h-full space-y-3">
          {/* Container da imagem com altura fixa */}
          <div className="w-full h-12 sm:h-16 flex items-center justify-center">
            <img 
              src={logo} 
              alt={`Logo ${name}`}
              className="max-w-full max-h-full object-contain"
              loading="lazy"
            />
          </div>
          
          {/* Nome da marca com tamanho padronizado */}
          <h3 className={`
            text-xs sm:text-sm font-medium text-center leading-tight transition-colors duration-300 line-clamp-1
            ${isSelected ? 'text-primary' : 'text-foreground group-hover:text-primary'}
          `}>
            {name}
          </h3>
        </div>
      </div>
      
      {/* Indicador de seleção */}
      {isSelected && (
        <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-primary rounded-full flex items-center justify-center">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-background rounded-full"></div>
        </div>
      )}
    </div>
  );
}