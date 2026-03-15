import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { VehicleFilters } from "@/components/vehicles/VehicleFilters";
import { prisma } from "@/lib/db";
import type { Combustivel, Cambio } from "@/types";
import { Car } from "lucide-react";

export const metadata: Metadata = {
  title: "Catálogo de Veículos",
  description: "Explore nosso catálogo completo de veículos seminovos e usados.",
};

interface SearchParams {
  busca?: string;
  marca?: string;
  combustivel?: string;
  cambio?: string;
  precoMin?: string;
  precoMax?: string;
  anoMin?: string;
  anoMax?: string;
  ordem?: string;
}

async function getVeiculos(params: SearchParams) {
  const where: Record<string, unknown> = { vendido: false };

  if (params.busca) {
    where.OR = [
      { nome: { contains: params.busca, mode: "insensitive" } },
      { marca: { contains: params.busca, mode: "insensitive" } },
      { modelo: { contains: params.busca, mode: "insensitive" } },
    ];
  }
  if (params.marca) where.marca = params.marca;
  if (params.combustivel) where.combustivel = params.combustivel as Combustivel;
  if (params.cambio) where.cambio = params.cambio as Cambio;
  if (params.precoMin || params.precoMax) {
    where.preco = {
      ...(params.precoMin ? { gte: Number(params.precoMin) } : {}),
      ...(params.precoMax ? { lte: Number(params.precoMax) } : {}),
    };
  }
  if (params.anoMin || params.anoMax) {
    where.ano = {
      ...(params.anoMin ? { gte: Number(params.anoMin) } : {}),
      ...(params.anoMax ? { lte: Number(params.anoMax) } : {}),
    };
  }

  type OB = Record<string, "asc" | "desc">;
  const orderByMap: Record<string, OB[]> = {
    preco_asc:  [{ preco: "asc" }],
    preco_desc: [{ preco: "desc" }],
    ano_desc:   [{ ano: "desc" }],
    ano_asc:    [{ ano: "asc" }],
    km_asc:     [{ quilometragem: "asc" }],
  };
  const orderBy = orderByMap[params.ordem || ""] || [
    { destaque: "desc" as const },
    { criadoEm: "desc" as const },
  ];

  return prisma.veiculo.findMany({ where, orderBy });
}

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const veiculos = await getVeiculos(params);
  const hasSearch = Object.values(params).some(Boolean);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {/* Page header */}
          <div className="py-10 border-b border-zinc-100 mb-8">
            <h1 className="text-4xl font-black text-zinc-900 tracking-tight">
              Catálogo
            </h1>
            <p className="text-zinc-400 text-sm mt-2">
              {veiculos.length} veículo{veiculos.length !== 1 ? "s" : ""} disponíve
              {veiculos.length !== 1 ? "is" : "l"}
              {hasSearch && " com os filtros aplicados"}
            </p>
          </div>

          {/* Filters */}
          <Suspense fallback={null}>
            <VehicleFilters />
          </Suspense>

          {/* Empty */}
          {veiculos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center animate-fade-in">
              <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mb-5">
                <Car className="w-8 h-8 text-zinc-400" />
              </div>
              <p className="text-zinc-800 font-semibold text-lg">Nenhum veículo encontrado</p>
              <p className="text-zinc-400 text-sm mt-2">
                Tente ajustar ou remover os filtros aplicados.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-fade-in">
              {veiculos.map((v, i) => (
                <div
                  key={v.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${Math.min(i * 40, 400)}ms`, animationFillMode: "both" }}
                >
                  <VehicleCard veiculo={v as Parameters<typeof VehicleCard>[0]["veiculo"]} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
