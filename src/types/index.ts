export type Combustivel =
  | "GASOLINA"
  | "ETANOL"
  | "FLEX"
  | "DIESEL"
  | "ELETRICO"
  | "HIBRIDO"
  | "GNV";

export type Cambio = "MANUAL" | "AUTOMATICO" | "AUTOMATIZADO" | "CVT";

export interface Veiculo {
  id: string;
  nome: string;
  marca: string;
  modelo: string;
  ano: number;
  preco: number;
  quilometragem: number;
  cor: string;
  combustivel: Combustivel;
  cambio: Cambio;
  portas: number;
  descricao?: string | null;
  imagemPrincipal?: string | null;
  imagens: string[];
  destaque: boolean;
  vendido: boolean;
  criadoEm: Date | string;
  atualizadoEm: Date | string;
}

export interface VeiculoFiltros {
  marca?: string;
  combustivel?: Combustivel;
  cambio?: Cambio;
  anoMin?: number;
  anoMax?: number;
  precoMin?: number;
  precoMax?: number;
  busca?: string;
  destaque?: boolean;
  vendido?: boolean;
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  role: "ADMIN" | "SUPER_ADMIN";
}

export interface SimulacaoResult {
  valorFinanciado: number;
  valorParcela: number;
  totalPago: number;
  totalJuros: number;
  parcelas: number;
  taxaJuros: number;
}

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
}
