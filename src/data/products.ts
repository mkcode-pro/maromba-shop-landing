export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  originalPrice: number;
  discountPrice: number;
  discountPercentage: number;
  category: string;
}

export const products: Product[] = [
  // Whey Protein
  {
    id: "whey-1",
    name: "Whey Protein Premium 1kg",
    description: "Proteína de alta qualidade para ganho de massa muscular",
    image: "https://via.placeholder.com/300x300/3B82F6/FFFFFF?text=WHEY+1KG",
    originalPrice: 89.90,
    discountPrice: 69.90,
    discountPercentage: 22,
    category: "whey-protein"
  },
  {
    id: "whey-2", 
    name: "Whey Isolado Chocolate 2kg",
    description: "Whey isolado com 90% de proteína, sabor chocolate",
    image: "https://via.placeholder.com/300x300/3B82F6/FFFFFF?text=WHEY+ISO",
    originalPrice: 159.90,
    discountPrice: 129.90,
    discountPercentage: 19,
    category: "whey-protein"
  },
  {
    id: "whey-3",
    name: "Whey Hidrolisado Baunilha",
    description: "Absorção ultra rápida, ideal pós-treino",
    image: "https://via.placeholder.com/300x300/3B82F6/FFFFFF?text=WHEY+H",
    originalPrice: 199.90,
    discountPrice: 169.90,
    discountPercentage: 15,
    category: "whey-protein"
  },

  // Creatina
  {
    id: "creatina-1",
    name: "Creatina Monohidratada 300g",
    description: "Aumento de força e potência muscular",
    image: "https://via.placeholder.com/300x300/10B981/FFFFFF?text=CREATINA",
    originalPrice: 49.90,
    discountPrice: 39.90,
    discountPercentage: 20,
    category: "creatina"
  },
  {
    id: "creatina-2",
    name: "Creatina Creapure 500g",
    description: "Creatina alemã de máxima pureza",
    image: "https://via.placeholder.com/300x300/10B981/FFFFFF?text=CREAPURE",
    originalPrice: 89.90,
    discountPrice: 74.90,
    discountPercentage: 17,
    category: "creatina"
  },

  // Pré-Treino
  {
    id: "pre-1",
    name: "Pré-Treino Explosive 300g",
    description: "Máxima energia e foco para seus treinos",
    image: "https://via.placeholder.com/300x300/F59E0B/FFFFFF?text=PRE+EXP",
    originalPrice: 79.90,
    discountPrice: 59.90,
    discountPercentage: 25,
    category: "pre-treino"
  },
  {
    id: "pre-2",
    name: "Pré-Treino Pump Formula",
    description: "Vasodilatação extrema e pump muscular",
    image: "https://via.placeholder.com/300x300/F59E0B/FFFFFF?text=PUMP",
    originalPrice: 99.90,
    discountPrice: 79.90,
    discountPercentage: 20,
    category: "pre-treino"
  },

  // Vitaminas  
  {
    id: "vit-1",
    name: "Multivitamínico Complete",
    description: "Complexo completo de vitaminas e minerais",
    image: "https://via.placeholder.com/300x300/8B5CF6/FFFFFF?text=MULTI",
    originalPrice: 59.90,
    discountPrice: 44.90,
    discountPercentage: 25,
    category: "vitaminas"
  },
  {
    id: "vit-2",
    name: "Vitamina D3 2000UI",
    description: "Fortalece ossos e sistema imunológico",
    image: "https://via.placeholder.com/300x300/8B5CF6/FFFFFF?text=VIT+D3",
    originalPrice: 39.90,
    discountPrice: 29.90,
    discountPercentage: 25,
    category: "vitaminas"
  },

  // Aminoácidos
  {
    id: "amino-1", 
    name: "BCAA 2:1:1 240 cápsulas",
    description: "Recuperação muscular e anti-catabolismo",
    image: "https://via.placeholder.com/300x300/EF4444/FFFFFF?text=BCAA",
    originalPrice: 69.90,
    discountPrice: 54.90,
    discountPercentage: 21,
    category: "aminoacidos"
  },
  {
    id: "amino-2",
    name: "Glutamina Powder 300g",
    description: "Recuperação e fortalecimento imunológico",
    image: "https://via.placeholder.com/300x300/EF4444/FFFFFF?text=GLUTA",
    originalPrice: 49.90,
    discountPrice: 39.90,
    discountPercentage: 20,
    category: "aminoacidos"
  },

  // Queimadores
  {
    id: "burn-1",
    name: "Termogênico Fire 60 caps",
    description: "Acelera metabolismo e queima gordura",
    image: "https://via.placeholder.com/300x300/F97316/FFFFFF?text=FIRE",
    originalPrice: 89.90,
    discountPrice: 69.90,
    discountPercentage: 22,
    category: "queimadores"
  },
  {
    id: "burn-2",
    name: "L-Carnitina Liquid 500ml",
    description: "Mobilização de gordura para energia",
    image: "https://via.placeholder.com/300x300/F97316/FFFFFF?text=CARNI",
    originalPrice: 59.90,
    discountPrice: 47.90,
    discountPercentage: 20,
    category: "queimadores"
  }
];

export const categories = [
  { id: "whey-protein", name: "Whey Protein", logo: "https://via.placeholder.com/120x60/3B82F6/FFFFFF?text=WHEY" },
  { id: "creatina", name: "Creatina", logo: "https://via.placeholder.com/120x60/10B981/FFFFFF?text=CREATINA" },
  { id: "pre-treino", name: "Pré-Treino", logo: "https://via.placeholder.com/120x60/F59E0B/FFFFFF?text=PRE-TREINO" },
  { id: "vitaminas", name: "Vitaminas", logo: "https://via.placeholder.com/120x60/8B5CF6/FFFFFF?text=VITAMINAS" },
  { id: "aminoacidos", name: "Aminoácidos", logo: "https://via.placeholder.com/120x60/EF4444/FFFFFF?text=AMINO" },
  { id: "queimadores", name: "Queimadores", logo: "https://via.placeholder.com/120x60/F97316/FFFFFF?text=BURN" }
];