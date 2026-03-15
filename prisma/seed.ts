import { PrismaClient, Combustivel, Cambio } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Criar admin padrão
  const senhaHash = await bcrypt.hash("admin123", 12);

  await prisma.usuario.upsert({
    where: { email: "admin@vdvcar.com.br" },
    update: {},
    create: {
      nome: "Administrador VDcar",
      email: "admin@vdvcar.com.br",
      senha: senhaHash,
    },
  });

  // Criar veículos de exemplo
  const veiculos = [
    {
      nome: "Toyota Corolla XEi 2.0",
      marca: "Toyota",
      modelo: "Corolla",
      ano: 2022,
      preco: 145000,
      quilometragem: 28000,
      cor: "Prata",
      combustivel: Combustivel.FLEX,
      cambio: Cambio.AUTOMATICO,
      portas: 4,
      descricao:
        "Corolla XEi em excelente estado, revisões em dia na concessionária, único dono. Carro extremamente conservado com todos os opcionais de fábrica.",
      destaque: true,
      vendido: false,
    },
    {
      nome: "Honda Civic EXL 1.5 Turbo",
      marca: "Honda",
      modelo: "Civic",
      ano: 2023,
      preco: 175000,
      quilometragem: 12000,
      cor: "Preto",
      combustivel: Combustivel.GASOLINA,
      cambio: Cambio.CVT,
      portas: 4,
      descricao:
        "Honda Civic EXL seminovo, com garantia de fábrica, teto solar, câmera 360°, central multimídia e muito mais.",
      destaque: true,
      vendido: false,
    },
    {
      nome: "Jeep Compass Limited 2.0",
      marca: "Jeep",
      modelo: "Compass",
      ano: 2021,
      preco: 168000,
      quilometragem: 45000,
      cor: "Branco",
      combustivel: Combustivel.DIESEL,
      cambio: Cambio.AUTOMATICO,
      portas: 4,
      descricao:
        "Compass Limited Diesel 4x4, completo de série. Carro de procedência, revisado e pronto para rodar.",
      destaque: false,
      vendido: false,
    },
    {
      nome: "Volkswagen T-Cross Highline",
      marca: "Volkswagen",
      modelo: "T-Cross",
      ano: 2023,
      preco: 138000,
      quilometragem: 8000,
      cor: "Vermelho",
      combustivel: Combustivel.FLEX,
      cambio: Cambio.AUTOMATICO,
      portas: 4,
      descricao:
        "T-Cross Highline com teto solar panorâmico, pacote de conectividade e assistência de direção.",
      destaque: true,
      vendido: false,
    },
  ];

  for (const veiculo of veiculos) {
    await prisma.veiculo.create({ data: veiculo });
  }

  console.log("✅ Seed concluído com sucesso!");
  console.log("📧 Admin: admin@vdvcar.com.br");
  console.log("🔑 Senha: admin123");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
