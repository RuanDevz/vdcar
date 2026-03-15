import { notFound } from "next/navigation";
import { VehicleForm } from "@/components/admin/VehicleForm";
import { prisma } from "@/lib/db";

export default async function EditarCarroPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const veiculo = await prisma.veiculo.findUnique({ where: { id } });
  if (!veiculo) notFound();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Editar Veículo</h1>
        <p className="text-ink-muted text-sm mt-1">{veiculo.nome}</p>
      </div>
      <VehicleForm veiculo={veiculo as Parameters<typeof VehicleForm>[0]["veiculo"]} />
    </div>
  );
}
