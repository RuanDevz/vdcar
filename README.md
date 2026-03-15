# VDVCar 🚗

Sistema web completo para loja de veículos — Next.js 14 + Prisma + PostgreSQL + Tailwind CSS.

---

## Pré-requisitos

- Node.js 18+
- PostgreSQL instalado e rodando
- npm ou yarn

---

## 1. Instalar dependências

```bash
cd vdvcar
npm install
```

---

## 2. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

Edite o `.env` com seus dados reais:

```env
DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/vdvcar"
JWT_SECRET="uma-chave-secreta-longa-e-aleatoria-aqui-min-32-chars"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_WHATSAPP="5583996805793"
```

---

## 3. Criar banco de dados

```bash
# Criar o banco no PostgreSQL (via psql)
createdb vdvcar

# Sincronizar schema e gerar Prisma Client
npm run db:push

# Gerar o Prisma Client (se necessário)
npm run db:generate
```

---

## 4. Popular com dados iniciais

```bash
npm run db:seed
```

Isso cria:
- **Admin:** `admin@vdvcar.com.br` / senha: `admin123`
- 4 veículos de exemplo

---

## 5. Rodar em desenvolvimento

```bash
npm run dev
```

Acesse:
- Site público: http://localhost:3000
- Admin: http://localhost:3000/admin
- Login: http://localhost:3000/login

---

## Estrutura de pastas

```
vdvcar/
├── prisma/
│   ├── schema.prisma         # Schema do banco
│   └── seed.ts               # Dados iniciais
├── public/
│   └── images/veiculos/      # Upload de imagens
├── src/
│   ├── app/
│   │   ├── api/              # APIs (REST)
│   │   │   ├── auth/         # Login, logout, me
│   │   │   ├── veiculos/     # CRUD de veículos
│   │   │   └── upload/       # Upload de imagens
│   │   ├── admin/            # Painel admin (protegido)
│   │   ├── catalogo/         # Catálogo público
│   │   ├── financiamento/    # Simulador
│   │   ├── sobre/            # Página sobre
│   │   ├── contato/          # Formulário de contato
│   │   └── login/            # Tela de login
│   ├── components/
│   │   ├── admin/            # Componentes do painel
│   │   ├── financing/        # Simulador de financiamento
│   │   ├── layout/           # Header, Footer, WhatsApp
│   │   └── vehicles/         # Cards, galeria, filtros
│   ├── lib/
│   │   ├── auth.ts           # JWT / sessão
│   │   ├── db.ts             # Prisma client
│   │   └── utils.ts          # Helpers e utilitários
│   ├── middleware.ts          # Proteção de rotas
│   └── types/index.ts        # TypeScript types
└── ...configs
```

---

## APIs disponíveis

| Método | Rota                   | Auth | Descrição              |
|--------|------------------------|------|------------------------|
| POST   | /api/auth/login        | —    | Login                  |
| POST   | /api/auth/logout       | —    | Logout                 |
| GET    | /api/auth/me           | ✓    | Dados do usuário atual |
| GET    | /api/veiculos          | —    | Listar veículos        |
| POST   | /api/veiculos          | ✓    | Criar veículo          |
| GET    | /api/veiculos/:id      | —    | Buscar veículo         |
| PUT    | /api/veiculos/:id      | ✓    | Atualizar veículo      |
| DELETE | /api/veiculos/:id      | ✓    | Excluir veículo        |
| POST   | /api/upload            | ✓    | Upload de imagem       |

---

## Deploy (Vercel + Neon/Supabase)

### Banco em produção
Use [Neon](https://neon.tech) ou [Supabase](https://supabase.com) para PostgreSQL gerenciado gratuito.

### Vercel
1. Faça push para um repositório GitHub
2. Importe no [vercel.com](https://vercel.com)
3. Configure as variáveis de ambiente
4. Deploy automático a cada push

### Imagens em produção
Para uploads em produção, recomenda-se usar **Cloudinary** ou **AWS S3**.
Altere `src/app/api/upload/route.ts` para salvar na nuvem em vez de `public/images/`.

---

## Funcionalidades

- ✅ Site institucional moderno e responsivo
- ✅ Catálogo com filtros (marca, combustível, câmbio, preço, ano)
- ✅ Busca por nome/marca/modelo
- ✅ Página de detalhes com galeria de imagens
- ✅ Simulador de financiamento (Price/PMT)
- ✅ Botão flutuante WhatsApp
- ✅ Sistema de login com JWT (cookies httpOnly)
- ✅ Middleware de proteção de rotas
- ✅ Painel admin completo (CRUD)
- ✅ Upload de imagens
- ✅ Destaque e status de vendido
- ✅ Dashboard com estatísticas
- ✅ Formulário de contato via WhatsApp
- ✅ SEO básico com metatags
- ✅ Confirmação antes de excluir
- ✅ Toasts de sucesso/erro
- ✅ Máscara de telefone no formulário de contato
