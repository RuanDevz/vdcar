"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Phone, MessageCircle, MapPin, Clock, Send, Check } from "lucide-react";
import toast from "react-hot-toast";
import { WHATSAPP_NUMBER, TELEFONE, ENDERECO } from "@/lib/utils";

export default function ContatoPage() {
  const [form, setForm] = useState({
    nome: "", email: "", telefone: "", assunto: "", mensagem: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const d = e.target.value.replace(/\D/g, "").slice(0, 11);
    const fmt = d.length <= 10
      ? d.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3")
      : d.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    setForm((prev) => ({ ...prev, telefone: fmt }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome || !form.mensagem) {
      toast.error("Preencha os campos obrigatórios.");
      return;
    }
    setLoading(true);
    const msg =
      `*Contato via Site VDcar*\n\n` +
      `👤 ${form.nome}\n📧 ${form.email || "—"}\n📱 ${form.telefone || "—"}\n` +
      `📌 ${form.assunto || "Geral"}\n\n💬 ${form.mensagem}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    await new Promise((r) => setTimeout(r, 400));
    setSent(true);
    setLoading(false);
    toast.success("Mensagem enviada!");
  };

  const contacts = [
    { icon: MessageCircle, title: "WhatsApp", info: "(83) 99880-7953", href: `https://wa.me/${WHATSAPP_NUMBER}` },
    { icon: Phone, title: "Telefone", info: TELEFONE, href: "tel:+558333224782" },
    { icon: MapPin, title: "Endereço", info: ENDERECO, href: "#" },
    { icon: Clock, title: "Horário", info: "Seg–Sex: 8h–18h · Sáb: 8h–13h", href: "#" },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 pb-24 bg-white">

        {/* Hero */}
        <section className="bg-zinc-900 py-14">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <p className="text-zinc-400 text-xs font-bold uppercase tracking-[0.15em] mb-3">
              Fale conosco
            </p>
            <h1 className="text-4xl font-black text-white tracking-tight mb-2">
              Contato
            </h1>
            <p className="text-zinc-400 text-sm">
              Respondemos rapidinho. Estamos aqui para ajudar.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Info */}
            <div className="space-y-3">
              {contacts.map(({ icon: Icon, title, info, href }) => (
                <a
                  key={title}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="bg-white border border-zinc-200 rounded-2xl p-4 flex items-center gap-4
                             hover:border-zinc-300 hover:shadow-sm transition-all hover:-translate-y-0.5 group block"
                >
                  <div className="w-9 h-9 bg-zinc-100 border border-zinc-200 rounded-xl
                                  flex items-center justify-center shrink-0
                                  group-hover:bg-zinc-200 transition-colors">
                    <Icon className="w-4 h-4 text-zinc-700" />
                  </div>
                  <div>
                    <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                      {title}
                    </p>
                    <p className="text-zinc-700 text-sm">{info}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {sent ? (
                <div className="bg-white border border-zinc-200 rounded-2xl p-12 text-center animate-scale-in">
                  <div className="w-14 h-14 bg-zinc-900 rounded-2xl
                                  flex items-center justify-center mx-auto mb-5">
                    <Check className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-black text-zinc-900 mb-2">Mensagem enviada!</h3>
                  <p className="text-zinc-500 text-sm">
                    Sua mensagem foi aberta no WhatsApp. Em breve entraremos em contato.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setForm({ nome: "", email: "", telefone: "", assunto: "", mensagem: "" });
                    }}
                    className="btn-outline mt-6"
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <div className="bg-white border border-zinc-200 rounded-2xl p-6">
                  <h2 className="text-zinc-900 font-bold mb-6">Envie uma mensagem</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="label">Nome *</label>
                        <input name="nome" value={form.nome} onChange={handleChange}
                          className="input" placeholder="Seu nome" required />
                      </div>
                      <div>
                        <label className="label">E-mail</label>
                        <input name="email" type="email" value={form.email} onChange={handleChange}
                          className="input" placeholder="seu@email.com" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="label">Telefone</label>
                        <input name="telefone" value={form.telefone} onChange={handlePhoneChange}
                          className="input" placeholder="(83) 99999-9999" />
                      </div>
                      <div>
                        <label className="label">Assunto</label>
                        <select name="assunto" value={form.assunto} onChange={handleChange} className="input">
                          <option value="">Selecione</option>
                          <option>Interesse em veículo</option>
                          <option>Financiamento</option>
                          <option>Dúvida geral</option>
                          <option>Outro</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="label">Mensagem *</label>
                      <textarea name="mensagem" value={form.mensagem} onChange={handleChange}
                        rows={5} className="input resize-none"
                        placeholder="Como podemos ajudá-lo?" required />
                    </div>

                    <button type="submit" disabled={loading} className="btn-whatsapp w-full py-3">
                      {loading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Enviando...
                        </div>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Enviar via WhatsApp
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
