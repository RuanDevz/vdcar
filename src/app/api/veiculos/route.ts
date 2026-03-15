import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSessionFromRequest } from "@/lib/auth";

const veiculoSchema = z.object({
  nome: z.string().min(2),
  marca: z.string().min(1),
  modelo: z.string().min(1),
  ano: z.coerce.number().int().min(1900),
  preco: z.coerce.number().positive(),
  quilometragem: z.coerce.number().int().min(0),
  cor: z.string().min(1),
  combustivel: z.enum([
    "GASOLINA", "ETANOL", "FLEX", "DIESEL", "ELETRICO", "HIBRIDO", "GNV",
  ]),
  cambio: z.enum(["MANUAL", "AUTOMATICO", "AUTOMATIZADO", "CVT"]),
  portas: z.coerce.number().int().min(2).max(6),
  descricao: z.string().optional().nullable(),
  imagemPrincipal: z.string().optional().nullable(),
  imagens: z.array(z.string()).default([]),
  destaque: z.boolean().default(false),
  vendido: z.boolean().default(false),
});

// GET — listar veículos (público)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const busca = searchParams.get("busca");
    const marca = searchParams.get("marca");
    const combustivel = searchParams.get("combustivel");
    const cambio = searchParams.get("cambio");
    const destaque = searchParams.get("destaque");
    const precoMin = searchParams.get("precoMin");
    const precoMax = searchParams.get("precoMax");

    const where: Record<string, unknown> = {};

    if (busca) {
      where.OR = [
        { nome: { contains: busca, mode: "insensitive" } },
        { marca: { contains: busca, mode: "insensitive" } },
        { modelo: { contains: busca, mode: "insensitive" } },
      ];
    }
    if (marca) where.marca = marca;
    if (combustivel) where.combustivel = combustivel;
    if (cambio) where.cambio = cambio;
    if (destaque === "true") where.destaque = true;
    if (precoMin || precoMax) {
      where.preco = {
        ...(precoMin ? { gte: Number(precoMin) } : {}),
        ...(precoMax ? { lte: Number(precoMax) } : {}),
      };
    }

    const veiculos = await prisma.veiculo.findMany({
      where,
      orderBy: [{ destaque: "desc" }, { criadoEm: "desc" }],
    });

    return NextResponse.json(veiculos);
  } catch {
    return NextResponse.json({ error: "Erro ao buscar veículos." }, { status: 500 });
  }
}

// POST — criar veículo (protegido)
export async function POST(request: NextRequest) {
  const session = await getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = veiculoSchema.parse(body);

    const veiculo = await prisma.veiculo.create({ data });
    return NextResponse.json(veiculo, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dados inválidos.", details: err.errors },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Erro ao criar veículo." }, { status: 500 });
  }
}
