import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSessionFromRequest } from "@/lib/auth";

const updateSchema = z.object({
  nome: z.string().min(2).optional(),
  marca: z.string().min(1).optional(),
  modelo: z.string().min(1).optional(),
  ano: z.coerce.number().int().min(1900).optional(),
  preco: z.coerce.number().positive().optional(),
  quilometragem: z.coerce.number().int().min(0).optional(),
  cor: z.string().min(1).optional(),
  combustivel: z.enum([
    "GASOLINA", "ETANOL", "FLEX", "DIESEL", "ELETRICO", "HIBRIDO", "GNV",
  ]).optional(),
  cambio: z.enum(["MANUAL", "AUTOMATICO", "AUTOMATIZADO", "CVT"]).optional(),
  portas: z.coerce.number().int().min(2).max(6).optional(),
  descricao: z.string().nullable().optional(),
  imagemPrincipal: z.string().nullable().optional(),
  imagens: z.array(z.string()).optional(),
  destaque: z.boolean().optional(),
  vendido: z.boolean().optional(),
});

// GET — buscar veículo por ID (público)
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const veiculo = await prisma.veiculo.findUnique({ where: { id } });
    if (!veiculo) {
      return NextResponse.json({ error: "Veículo não encontrado." }, { status: 404 });
    }
    return NextResponse.json(veiculo);
  } catch {
    return NextResponse.json({ error: "Erro ao buscar veículo." }, { status: 500 });
  }
}

// PUT — atualizar veículo (protegido)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const data = updateSchema.parse(body);

    const veiculo = await prisma.veiculo.update({ where: { id }, data });
    return NextResponse.json(veiculo);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dados inválidos.", details: err.errors },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Erro ao atualizar veículo." }, { status: 500 });
  }
}

// DELETE — excluir veículo (protegido)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { id } = await params;

  try {
    await prisma.veiculo.delete({ where: { id } });
    return NextResponse.json({ message: "Veículo excluído." });
  } catch {
    return NextResponse.json({ error: "Erro ao excluir veículo." }, { status: 500 });
  }
}
