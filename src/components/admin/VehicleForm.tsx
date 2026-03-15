"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { Save, Loader2, Upload, X, Image as ImageIcon } from "lucide-react";
import { MARCAS, COMBUSTIVEL_LABELS, CAMBIO_LABELS } from "@/lib/utils";
import type { Veiculo } from "@/types";

const schema = z.object({
  nome: z.string().min(2, "Nome obrigatório"),
  marca: z.string().min(1, "Marca obrigatória"),
  modelo: z.string().min(1, "Modelo obrigatório"),
  ano: z.coerce.number().min(1900).max(new Date().getFullYear() + 1),
  preco: z.coerce.number().positive("Preço inválido"),
  quilometragem: z.coerce.number().min(0),
  cor: z.string().min(1, "Cor obrigatória"),
  combustivel: z.enum(["GASOLINA", "ETANOL", "FLEX", "DIESEL", "ELETRICO", "HIBRIDO", "GNV"]),
  cambio: z.enum(["MANUAL", "AUTOMATICO", "AUTOMATIZADO", "CVT"]),
  portas: z.coerce.number().min(2).max(6),
  descricao: z.string().optional(),
  destaque: z.boolean(),
  vendido: z.boolean(),
});

type FormData = z.infer<typeof schema>;

interface VehicleFormProps { veiculo?: Veiculo; }

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-faint mb-4">{children}</p>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-red-400 text-xs mt-1.5">{msg}</p>;
}

function Toggle({
  checked, onChange, label,
}: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none group">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors ${checked ? "bg-white" : "bg-surface-5"}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-all shadow
                          ${checked ? "translate-x-5 bg-black" : "bg-surface-3"}`} />
      </button>
      <span className="text-sm text-ink-secondary group-hover:text-white transition-colors">
        {label}
      </span>
    </label>
  );
}

export function VehicleForm({ veiculo }: VehicleFormProps) {
  const router = useRouter();
  const isEditing = !!veiculo;

  const [imagemPrincipal, setImagemPrincipal] = useState(veiculo?.imagemPrincipal || "");
  const [imagens, setImagens] = useState<string[]>(veiculo?.imagens || []);
  const [uploading, setUploading] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } =
    useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: {
        nome: veiculo?.nome || "",
        marca: veiculo?.marca || "",
        modelo: veiculo?.modelo || "",
        ano: veiculo?.ano || new Date().getFullYear(),
        preco: veiculo?.preco || 0,
        quilometragem: veiculo?.quilometragem || 0,
        cor: veiculo?.cor || "",
        combustivel: veiculo?.combustivel || "FLEX",
        cambio: veiculo?.cambio || "MANUAL",
        portas: veiculo?.portas || 4,
        descricao: veiculo?.descricao || "",
        destaque: veiculo?.destaque || false,
        vendido: veiculo?.vendido || false,
      },
    });

  const destaque = watch("destaque");
  const vendido = watch("vendido");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "principal" | "galeria") => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        if (!res.ok) throw new Error("Falha no upload");
        const { url } = await res.json();
        if (type === "principal") setImagemPrincipal(url);
        else setImagens((p) => [...p, url]);
      }
      toast.success("Imagem enviada!");
    } catch {
      toast.error("Erro ao enviar imagem.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      const url = isEditing ? `/api/veiculos/${veiculo.id}` : "/api/veiculos";
      const res = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, imagemPrincipal: imagemPrincipal || null, imagens }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Erro");
      toast.success(isEditing ? "Carro atualizado!" : "Carro cadastrado!");
      router.push("/admin/carros");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao salvar.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-4xl">

      {/* Informações básicas */}
      <div className="card border-surface-5/40 p-6">
        <SectionTitle>Informações básicas</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <label className="label">Nome do veículo *</label>
            <input {...register("nome")} className="input" placeholder="Ex: Toyota Corolla XEi 2.0" />
            <FieldError msg={errors.nome?.message} />
          </div>
          <div>
            <label className="label">Marca *</label>
            <select {...register("marca")} className="input">
              <option value="">Selecione</option>
              {MARCAS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            <FieldError msg={errors.marca?.message} />
          </div>
          <div>
            <label className="label">Modelo *</label>
            <input {...register("modelo")} className="input" placeholder="Ex: Corolla" />
            <FieldError msg={errors.modelo?.message} />
          </div>
          <div>
            <label className="label">Ano *</label>
            <input type="number" {...register("ano")} className="input" />
            <FieldError msg={errors.ano?.message} />
          </div>
          <div>
            <label className="label">Cor *</label>
            <input {...register("cor")} className="input" placeholder="Ex: Prata" />
            <FieldError msg={errors.cor?.message} />
          </div>
        </div>
      </div>

      {/* Dados técnicos */}
      <div className="card border-surface-5/40 p-6">
        <SectionTitle>Dados técnicos</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="label">Preço (R$) *</label>
            <input type="number" {...register("preco")} className="input" placeholder="85000" />
            <FieldError msg={errors.preco?.message} />
          </div>
          <div>
            <label className="label">Quilometragem *</label>
            <input type="number" {...register("quilometragem")} className="input" placeholder="50000" />
          </div>
          <div>
            <label className="label">Combustível *</label>
            <select {...register("combustivel")} className="input">
              {Object.entries(COMBUSTIVEL_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Câmbio *</label>
            <select {...register("cambio")} className="input">
              {Object.entries(CAMBIO_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Portas *</label>
            <select {...register("portas")} className="input">
              {[2, 3, 4, 5].map((n) => <option key={n} value={n}>{n} portas</option>)}
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label className="label">Descrição</label>
          <textarea {...register("descricao")} rows={4} className="input resize-none"
            placeholder="Descreva o veículo, opcionais, estado de conservação..." />
        </div>
      </div>

      {/* Status */}
      <div className="card border-surface-5/40 p-6">
        <SectionTitle>Status</SectionTitle>
        <div className="flex flex-wrap gap-6">
          <Toggle checked={destaque} onChange={(v) => setValue("destaque", v)} label="Marcar como destaque" />
          <Toggle checked={vendido} onChange={(v) => setValue("vendido", v)} label="Marcar como vendido" />
        </div>
      </div>

      {/* Imagens */}
      <div className="card border-surface-5/40 p-6">
        <SectionTitle>Imagens</SectionTitle>

        <div className="mb-6">
          <label className="label">Imagem principal</label>
          {imagemPrincipal ? (
            <div className="relative w-48 aspect-video rounded-xl overflow-hidden border border-surface-5/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imagemPrincipal} alt="Principal" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => setImagemPrincipal("")}
                className="absolute top-2 right-2 w-7 h-7 bg-black/70 hover:bg-red-600
                           rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-48 aspect-video rounded-xl
                               border-2 border-dashed border-surface-5 hover:border-surface-6
                               cursor-pointer transition-colors">
              <ImageIcon className="w-7 h-7 text-ink-faint mb-2" />
              <span className="text-ink-faint text-xs">{uploading ? "Enviando..." : "Upload"}</span>
              <input type="file" accept="image/*" className="sr-only"
                onChange={(e) => handleImageUpload(e, "principal")} disabled={uploading} />
            </label>
          )}
        </div>

        <div>
          <label className="label">Galeria</label>
          <div className="flex flex-wrap gap-3">
            {imagens.map((img) => (
              <div key={img} className="relative w-28 aspect-video rounded-xl overflow-hidden border border-surface-5/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setImagens((p) => p.filter((i) => i !== img))}
                  className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/70 hover:bg-red-600
                             rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            <label className="flex flex-col items-center justify-center w-28 aspect-video rounded-xl
                               border-2 border-dashed border-surface-5 hover:border-surface-6
                               cursor-pointer transition-colors">
              <Upload className="w-5 h-5 text-ink-faint mb-1" />
              <span className="text-ink-faint text-[11px]">{uploading ? "..." : "Adicionar"}</span>
              <input type="file" accept="image/*" multiple className="sr-only"
                onChange={(e) => handleImageUpload(e, "galeria")} disabled={uploading} />
            </label>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={() => router.back()} className="btn-ghost px-6">
          Cancelar
        </button>
        <button type="submit" disabled={isSubmitting || uploading} className="btn-primary px-8">
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isEditing ? "Salvar alterações" : "Cadastrar veículo"}
        </button>
      </div>
    </form>
  );
}
