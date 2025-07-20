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
  // Testosterona
  {
    id: "test-1",
    name: "Enantato de Testosterona",
    description: "250mg/ml - 10ml - Ampolas de vidro amber",
    image: "https://via.placeholder.com/300x300/1F2937/FFFFFF?text=TEST+E",
    originalPrice: 189.90,
    discountPrice: 159.90,
    discountPercentage: 16,
    category: "testosterona"
  },
  {
    id: "test-2", 
    name: "Cipionato de Testosterona",
    description: "200mg/ml - 10ml - Laboratório certificado",
    image: "https://via.placeholder.com/300x300/1F2937/FFFFFF?text=TEST+C",
    originalPrice: 179.90,
    discountPrice: 149.90,
    discountPercentage: 17,
    category: "testosterona"
  },
  {
    id: "test-3",
    name: "Propionato de Testosterona",
    description: "100mg/ml - 10ml - Ação rápida",
    image: "https://via.placeholder.com/300x300/1F2937/FFFFFF?text=TEST+P",
    originalPrice: 169.90,
    discountPrice: 139.90,
    discountPercentage: 18,
    category: "testosterona"
  },

  // Orais
  {
    id: "oral-1",
    name: "Oxandrolona",
    description: "10mg - 100 comprimidos - Baixa hepatotoxicidade",
    image: "https://via.placeholder.com/300x300/7C3AED/FFFFFF?text=OXAN",
    originalPrice: 299.90,
    discountPrice: 259.90,
    discountPercentage: 13,
    category: "orais"
  },
  {
    id: "oral-2",
    name: "Stanozolol",
    description: "10mg - 100 tabs - Definição muscular",
    image: "https://via.placeholder.com/300x300/7C3AED/FFFFFF?text=STAN",
    originalPrice: 179.90,
    discountPrice: 149.90,
    discountPercentage: 17,
    category: "orais"
  },

  // Trembolona
  {
    id: "tren-1",
    name: "Acetato de Trembolona",
    description: "100mg/ml - 10ml - Alta potência anabólica",
    image: "https://via.placeholder.com/300x300/DC2626/FFFFFF?text=TREN+A",
    originalPrice: 249.90,
    discountPrice: 219.90,
    discountPercentage: 12,
    category: "trembolona"
  },
  {
    id: "tren-2",
    name: "Enantato de Trembolona",
    description: "200mg/ml - 10ml - Liberação prolongada",
    image: "https://via.placeholder.com/300x300/DC2626/FFFFFF?text=TREN+E",
    originalPrice: 279.90,
    discountPrice: 239.90,
    discountPercentage: 14,
    category: "trembolona"
  },

  // Nandrolona
  {
    id: "deca-1", 
    name: "Decanoato de Nandrolona",
    description: "250mg/ml - 10ml - Ganhos sólidos",
    image: "https://via.placeholder.com/300x300/059669/FFFFFF?text=DECA",
    originalPrice: 199.90,
    discountPrice: 169.90,
    discountPercentage: 15,
    category: "nandrolona"
  },
  {
    id: "npp-1",
    name: "Fenilpropionato de Nandrolona",
    description: "100mg/ml - 10ml - Ação mais rápida",
    image: "https://via.placeholder.com/300x300/059669/FFFFFF?text=NPP",
    originalPrice: 189.90,
    discountPrice: 159.90,
    discountPercentage: 16,
    category: "nandrolona"
  },

  // Primobolan
  {
    id: "primo-1",
    name: "Enantato de Metenolona",
    description: "100mg/ml - 10ml - Perfil seguro",
    image: "https://via.placeholder.com/300x300/0891B2/FFFFFF?text=PRIMO",
    originalPrice: 349.90,
    discountPrice: 299.90,
    discountPercentage: 14,
    category: "primobolan"
  },

  // Dianabol
  {
    id: "dbol-1",
    name: "Metandrostenolona",
    description: "10mg - 100 tabs - Ganhos rápidos",
    image: "https://via.placeholder.com/300x300/F59E0B/FFFFFF?text=DBOL",
    originalPrice: 159.90,
    discountPrice: 129.90,
    discountPercentage: 19,
    category: "dianabol"
  },

  // PCT e Proteções
  {
    id: "pct-1",
    name: "Tamoxifeno",
    description: "20mg - 100 tabs - Bloqueador estrogênico",
    image: "https://via.placeholder.com/300x300/6B7280/FFFFFF?text=TAMOX",
    originalPrice: 129.90,
    discountPrice: 109.90,
    discountPercentage: 15,
    category: "pct"
  },
  {
    id: "pct-2",
    name: "Clomifeno",
    description: "50mg - 50 tabs - Restaurador natural",
    image: "https://via.placeholder.com/300x300/6B7280/FFFFFF?text=CLOMID",
    originalPrice: 149.90,
    discountPrice: 129.90,
    discountPercentage: 13,
    category: "pct"
  },
  {
    id: "pct-3",
    name: "Anastrozol",
    description: "1mg - 50 tabs - Inibidor de aromatase",
    image: "https://via.placeholder.com/300x300/6B7280/FFFFFF?text=ARIMID",
    originalPrice: 179.90,
    discountPrice: 149.90,
    discountPercentage: 17,
    category: "pct"
  }
];

export const categories = [
  { id: "testosterona", name: "Testosterona", logo: "https://via.placeholder.com/120x60/1F2937/FFFFFF?text=TEST" },
  { id: "orais", name: "Orais", logo: "https://via.placeholder.com/120x60/7C3AED/FFFFFF?text=ORAIS" },
  { id: "trembolona", name: "Trembolona", logo: "https://via.placeholder.com/120x60/DC2626/FFFFFF?text=TREN" },
  { id: "nandrolona", name: "Nandrolona", logo: "https://via.placeholder.com/120x60/059669/FFFFFF?text=DECA" },
  { id: "primobolan", name: "Primobolan", logo: "https://via.placeholder.com/120x60/0891B2/FFFFFF?text=PRIMO" },
  { id: "dianabol", name: "Dianabol", logo: "https://via.placeholder.com/120x60/F59E0B/FFFFFF?text=DBOL" },
  { id: "pct", name: "PCT & Proteções", logo: "https://via.placeholder.com/120x60/6B7280/FFFFFF?text=PCT" }
];