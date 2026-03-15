import { VehicleForm } from "@/components/admin/VehicleForm";

export default function NovoCarroPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Cadastrar Novo Carro</h1>
        <p className="text-ink-muted text-sm mt-1">
          Preencha os dados do veículo abaixo.
        </p>
      </div>
      <VehicleForm />
    </div>
  );
}
