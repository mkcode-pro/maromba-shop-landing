import { products, brands } from '../data/products';
import { Product } from '../data/products';

// Esta função verifica se cada produto cadastrado respeita as regras de sua marca.
export function checkDataConsistency() {
  console.log("🚀 Iniciando verificação de consistência dos dados...");
  let errorsFound = 0;

  // Cria um mapa para acesso rápido às regras de cada marca
  const brandRules = new Map(brands.map(brand => [brand.id, brand.allowedTypes]));

  products.forEach((product: Product) => {
    const allowedTypesForBrand = brandRules.get(product.brand);

    // Verifica se a marca do produto existe nas regras e se o tipo do produto é permitido
    if (!allowedTypesForBrand || !allowedTypesForBrand.includes(product.type)) {
      const brandName = brands.find(b => b.id === product.brand)?.name || 'Marca não encontrada';
      console.error(
        `❌ ERRO DE DADOS: O produto "${product.name}" (tipo: "${product.type}") é inválido para a marca "${brandName}". Tipos permitidos para esta marca são: [${allowedTypesForBrand?.join(', ')}]`
      );
      errorsFound++;
    }
  });

  if (errorsFound === 0) {
    console.log("✅ Verificação concluída. Todos os produtos estão consistentes!");
  } else {
    console.warn(`🚨 Verificação concluída. Foram encontrados ${errorsFound} erro(s) de consistência. Por favor, corrija os dados no seu arquivo de produtos.`);
  }
}