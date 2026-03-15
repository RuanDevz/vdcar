"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, X } from "lucide-react";
import toast from "react-hot-toast";

interface DeleteButtonProps { id: string; nome: string; }

export function DeleteButton({ id, nome }: DeleteButtonProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/veiculos/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Veículo excluído.");
      setShowModal(false);
      router.refresh();
    } catch {
      toast.error("Erro ao excluir.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="p-2 text-ink-faint hover:text-red-400 hover:bg-red-900/10 rounded-lg transition-colors"
        title="Excluir"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-2 border border-surface-5/40 rounded-2xl p-6 max-w-sm w-full animate-scale-in">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-white font-bold">Excluir veículo</h3>
                <p className="text-ink-muted text-sm mt-0.5">Esta ação não pode ser desfeita.</p>
              </div>
              <button onClick={() => setShowModal(false)}
                className="text-ink-faint hover:text-white ml-3 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-ink-secondary text-sm mb-6 bg-surface-3 px-3 py-2.5 rounded-xl">
              {nome}
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)} className="btn-ghost flex-1 border border-surface-5">
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500
                           text-white font-semibold px-4 py-2.5 rounded-xl transition-colors
                           disabled:opacity-50 text-sm"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
