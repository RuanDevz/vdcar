import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Combustivel, Cambio, SimulacaoResult } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatarPreco(valor: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

export function formatarQuilometragem(km: number): string {
  return new Intl.NumberFormat("pt-BR").format(km) + " km";
}

export function formatarData(data: Date | string): string {
  return new Intl.DateTimeFormat("pt-BR").format(new Date(data));
}

export const COMBUSTIVEL_LABELS: Record<Combustivel, string> = {
  GASOLINA: "Gasolina",
  ETANOL: "Etanol",
  FLEX: "Flex",
  DIESEL: "Diesel",
  ELETRICO: "Elétrico",
  HIBRIDO: "Híbrido",
  GNV: "GNV",
};

export const CAMBIO_LABELS: Record<Cambio, string> = {
  MANUAL: "Manual",
  AUTOMATICO: "Automático",
  AUTOMATIZADO: "Automatizado",
  CVT: "CVT",
};

export const MARCAS = [
  "Chevrolet", "Fiat", "Ford", "Honda", "Hyundai", "Jeep", "Kia",
  "Mitsubishi", "Nissan", "Peugeot", "Renault", "Toyota", "Volkswagen",
  "Volvo", "BMW", "Mercedes-Benz", "Audi", "Citroën", "Dodge", "Subaru",
];

export function calcularFinanciamento(
  valorVeiculo: number,
  valorEntrada: number,
  parcelas: number,
  taxaMensal: number
): SimulacaoResult {
  const valorFinanciado = valorVeiculo - valorEntrada;
  const taxa = taxaMensal / 100;

  let valorParcela: number;
  if (taxa === 0) {
    valorParcela = valorFinanciado / parcelas;
  } else {
    valorParcela =
      (valorFinanciado * (taxa * Math.pow(1 + taxa, parcelas))) /
      (Math.pow(1 + taxa, parcelas) - 1);
  }

  const totalPago = valorParcela * parcelas + valorEntrada;
  const totalJuros = totalPago - valorVeiculo;

  return { valorFinanciado, valorParcela, totalPago, totalJuros, parcelas, taxaJuros: taxaMensal };
}

export const APP_NAME = "VDcar";
export const WHATSAPP_NUMBER = "5583988407953";
export const TELEFONE = "(83) 3322-4782";
export const ENDERECO = "Rua José Lins do Rêgo, 12, Palmeira - Campina Grande";
export const INSTAGRAM_URL = "https://www.instagram.com/vdcar/";

export const PARCEIROS = [
  { id: "bv",    nome: "Banco BV",           sigla: "BV",    cor: "#003087" },
  { id: "omesa", nome: "Omesa",              sigla: "OME",   cor: "#e63312" },
  { id: "pan",   nome: "Banco Pan",          sigla: "PAN",   cor: "#ff6200" },
  { id: "jr",    nome: "Junior Careca\nEmplacamentos", sigla: "JC", cor: "#1a1a2e" },
];
