# Vootrip - Documentação Completa do Projeto

> Portal de metabusca de turismo desenvolvido em React + Vite com Cloud Backend (Supabase)

---

## 📚 Índice

1. [Visão Geral](#visão-geral)
2. [Stack Tecnológica](#stack-tecnológica)
3. [Estrutura de Pastas](#estrutura-de-pastas)
4. [Banco de Dados](#banco-de-dados)
5. [Autenticação](#autenticação)
6. [Rotas e Páginas](#rotas-e-páginas)
7. [Painel Administrativo](#painel-administrativo)
8. [Formulários e Integrações](#formulários-e-integrações)
9. [Sistema de Favoritos](#sistema-de-favoritos)
10. [Parcerias e Afiliados](#parcerias-e-afiliados)
11. [Componentes Principais](#componentes-principais)
12. [Próximas Etapas Sugeridas](#próximas-etapas-sugeridas)

---

## Visão Geral

O **Vootrip** é um portal de metabusca de turismo que agrega ofertas de voos, hotéis e aluguel de carros de diversos parceiros. O site inclui:

- Páginas institucionais (Home, Sobre, Como Funciona)
- Sistema de ofertas com filtros e destaque
- Blog para conteúdo de viagens
- Página de destinos
- Sistema de carreiras com formulário
- Painel administrativo completo com CRUD
- Sistema de favoritos com localStorage
- Integrações com parceiros afiliados

---

## Stack Tecnológica

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| React | 18 | Framework frontend |
| TypeScript | 5.6 | Tipagem estática |
| Vite | 6 | Build tool e dev server |
| Tailwind CSS | 4 | Estilização |
| React Router | 7 | Roteamento |
| Supabase | - | Backend (banco de dados, auth) |
| Lucide React | - | Ícones |
| @formspree/react | - | Formulários externos |

---

## Estrutura de Pastas

```
src/
├── assets/              # Imagens e recursos estáticos
├── components/          # Componentes reutilizáveis
│   ├── home/            # Componentes da home
│   ├── results/         # Cards de resultados
│   ├── ui/              # Componentes de UI (Button, Badge, etc)
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Layout.tsx
│   ├── Sidebar.tsx
│   └── TripFormModal.tsx
├── hooks/               # Custom hooks
│   ├── useAuth.ts       # Autenticação
│   ├── useFavorites.ts  # Sistema de favoritos
│   ├── useOffers.ts     # CRUD de ofertas
│   ├── useBlogPosts.ts  # CRUD de blog
│   ├── useDestinations.ts # CRUD de destinos
│   ├── usePartners.ts   # CRUD de parceiros
│   └── useJobs.ts       # CRUD de vagas
├── integrations/        # Integrações externas
│   └── supabase/
│       ├── client.ts    # Cliente Supabase
│       ├── types.ts     # Tipos gerados
│       └── helpers.ts   # Helpers de tipos
├── pages/               # Páginas da aplicação
│   ├── admin/           # Páginas do painel admin
│   ├── Index.tsx        # Home
│   ├── Ofertas.tsx
│   ├── Destinos.tsx
│   ├── Blog.tsx
│   ├── Carreiras.tsx
│   ├── Favoritos.tsx
│   └── ...
├── App.tsx              # Rotas principais
├── main.tsx             # Entry point
└── theme.css            # Variáveis de tema
```

---

## Banco de Dados

O projeto utiliza **Supabase** (PostgreSQL) como Cloud Backend.

### Tabelas

#### `offers` - Ofertas
| Coluna | Tipo | Descrição |
|--------|------|----------|
| id | UUID | Chave primária |
| tipo | TEXT | voo, hotel, carro |
| titulo | TEXT | Título da oferta |
| descricao | TEXT | Descrição |
| preco_original | TEXT | Preço original |
| preco_atual | TEXT | Preço promocional |
| desconto | TEXT | Percentual de desconto |
| validade | TEXT | Data de validade |
| imagem | TEXT | URL da imagem |
| search_url | TEXT | Link de afiliado |
| destaque | BOOLEAN | Se é destaque |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data de atualização |

#### `blog_posts` - Posts do Blog
| Coluna | Tipo | Descrição |
|--------|------|----------|
| id | UUID | Chave primária |
| titulo | TEXT | Título do post |
| resumo | TEXT | Resumo/excerpt |
| conteudo | TEXT | Conteúdo completo |
| imagem | TEXT | URL da imagem |
| categoria | TEXT | Categoria |
| autor | TEXT | Nome do autor |
| published | BOOLEAN | Se está publicado |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data de atualização |

#### `destinations` - Destinos
| Coluna | Tipo | Descrição |
|--------|------|----------|
| id | UUID | Chave primária |
| nome | TEXT | Nome do destino |
| pais | TEXT | País |
| descricao | TEXT | Descrição |
| imagem | TEXT | URL da imagem |
| preco_base | TEXT | Preço a partir de |
| destaque | BOOLEAN | Se é destaque |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data de atualização |

#### `partners` - Parceiros
| Coluna | Tipo | Descrição |
|--------|------|----------|
| id | UUID | Chave primária |
| nome | TEXT | Nome do parceiro |
| tipo | TEXT | Tipo (cia_aerea, hotel, etc) |
| logo | TEXT | URL do logo |
| url | TEXT | Site do parceiro |
| descricao | TEXT | Descrição |
| ativo | BOOLEAN | Se está ativo |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data de atualização |

#### `jobs` - Vagas de Emprego
| Coluna | Tipo | Descrição |
|--------|------|----------|
| id | UUID | Chave primária |
| title | TEXT | Título da vaga |
| department | TEXT | Departamento |
| location | TEXT | Localização |
| type | TEXT | Tipo (Tempo Integral, etc) |
| description | TEXT | Descrição |
| active | BOOLEAN | Se está ativa |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data de atualização |

### Políticas de Segurança (RLS)

Todas as tabelas possuem Row Level Security habilitado:

- **Leitura pública**: Qualquer visitante pode ler dados (para exibir no site)
- **Escrita autenticada**: Apenas usuários logados podem criar/editar/deletar

### Triggers

Todas as tabelas possuem trigger `update_updated_at` que atualiza automaticamente a coluna `updated_at` em modificações.

---

## Autenticação

O sistema usa **Supabase Auth** com email/senha.

### Fluxo
1. Usuário acessa `/admin/login`
2. Faz login com email e senha
3. Recebe sessão JWT
4. Sessão persiste no navegador
5. Logout limpa a sessão

### Segurança
- Cadastro público foi **removido** após criação do usuário admin
- Apenas usuários já cadastrados podem fazer login
- Rotas do admin são protegidas pelo hook `useAuth`

### Hook `useAuth`
```typescript
const { user, loading, signIn, signOut } = useAuth();
```

---

## Rotas e Páginas

### Páginas Públicas

| Rota | Página | Descrição |
|------|--------|----------|
| `/` | Index | Home do site |
| `/ofertas` | Ofertas | Lista de ofertas |
| `/destinos` | Destinos | Lista de destinos |
| `/blog` | Blog | Lista de posts |
| `/carreiras` | Carreiras | Vagas + formulário |
| `/favoritos` | Favoritos | Itens salvos |
| `/sobre` | SobreNos | Sobre a empresa |
| `/como-funciona` | ComoFunciona | Como usar o site |
| `/parceiros` | SejaParceiro | Formulário de parceria |
| `/termos` | Termos | Termos de uso |
| `/privacidade` | Privacidade | Política de privacidade |
| `/download-logo` | DownloadLogo | Kit de mídia |
| `/voos/resultados` | FlightResults | Resultados de voos |
| `/hoteis/resultados` | HotelResults | Resultados de hotéis |
| `/carros/resultados` | CarResults | Resultados de carros |
| `/traslados/resultados` | TransferResults | Resultados de transfer |

### Páginas Administrativas

| Rota | Página | Descrição |
|------|--------|----------|
| `/admin/login` | AdminLogin | Tela de login |
| `/admin` | AdminDashboard | Dashboard principal |
| `/admin/ofertas` | AdminOfertas | CRUD de ofertas |
| `/admin/blog` | AdminBlog | CRUD de posts |
| `/admin/destinos` | AdminDestinos | CRUD de destinos |
| `/admin/parceiros` | AdminParceiros | CRUD de parceiros |
| `/admin/vagas` | AdminVagas | CRUD de vagas |

---

## Painel Administrativo

O painel admin permite gerenciar todo o conteúdo do site.

### Funcionalidades

#### Ofertas (`/admin/ofertas`)
- Criar, editar, excluir ofertas
- Campos: tipo, título, descrição, preços, desconto, validade, imagem, link
- Marcar como destaque

#### Blog (`/admin/blog`)
- Criar, editar, excluir posts
- Campos: título, resumo, conteúdo, imagem, categoria, autor
- Publicar/despublicar

#### Destinos (`/admin/destinos`)
- Criar, editar, excluir destinos
- Campos: nome, país, descrição, imagem, preço base
- Marcar como destaque

#### Parceiros (`/admin/parceiros`)
- Criar, editar, excluir parceiros
- Campos: nome, tipo, logo, URL, descrição
- Ativar/desativar

#### Vagas (`/admin/vagas`)
- Criar, editar, excluir vagas
- Campos: título, departamento, localização, tipo, descrição
- Ativar/desativar (apenas vagas ativas aparecem no site)

---

## Formulários e Integrações

### Formspree

Todos os formulários externos usam **Formspree** para recebimento de dados:

| Formulário | ID Formspree | Arquivo |
|------------|--------------|----------|
| Newsletter | `xgogoayp` | `src/components/home/Newsletter.tsx` |
| Carreiras | `xaqrqeoo` | `src/pages/Carreiras.tsx` |
| Solicitar Viagem | `xrenepkw` | `src/components/TripFormModal.tsx` |
| Seja Parceiro | `xaqrqebq` | `src/pages/SejaParceiro.tsx` |

### Campos dos Formulários

#### Newsletter
- Email

#### Carreiras
- Nome completo
- Email
- Telefone/WhatsApp
- Vaga de interesse
- LinkedIn
- Portfólio
- Mensagem/Apresentação

#### Solicitar Viagem
- Nome
- Email
- Telefone
- Destino
- Data de ida
- Data de volta
- Número de viajantes
- Orçamento
- Observações

#### Seja Parceiro
- Nome da empresa
- Nome do contato
- Email
- Telefone
- Tipo de parceria
- Mensagem

---

## Sistema de Favoritos

Sistema que permite usuários salvarem ofertas localmente.

### Como Funciona
- Dados salvos no **localStorage** do navegador
- Persistência entre sessões
- Não requer login

### Hook `useFavorites`
```typescript
const { 
  favorites,      // Lista de favoritos
  addFavorite,    // Adicionar
  removeFavorite, // Remover
  toggleFavorite, // Alternar
  isFavorite,     // Verificar se é favorito
  clearFavorites, // Limpar todos
  count           // Total de favoritos
} = useFavorites();
```

### Estrutura do Item Favorito
```typescript
interface FavoriteItem {
  id: string;
  tipo: 'voo' | 'hotel' | 'carro' | 'oferta';
  titulo: string;
  descricao?: string;
  preco?: string;
  imagem?: string;
  url?: string;
  addedAt: string;
}
```

### Interface
- ❤️ nos cards de ofertas para adicionar/remover
- ❤️ no header com contador
- Página `/favoritos` para visualizar e gerenciar

---

## Parcerias e Afiliados

### Companhias Aéreas (links diretos)
- LATAM: https://www.latamairlines.com/br/pt
- GOL: https://www.voegol.com.br/nh/
- Azul: https://www.voeazul.com.br/br/pt/home
- TAP: https://www.flytap.com/pt-br
- American Airlines: https://www.aa.com.br/homePage.do?locale=pt_BR
- Emirates: https://www.emirates.com/br/portuguese/

### Widgets de Afiliados

#### Travelpayouts (Pesquisa)
- Voos: Widget de busca de voos
- Hotéis: Widget Hotellook
- Carros: Widget RentalCars

#### AmericaChip (Chip Internacional)
- Link de afiliado na Home
- Ícone na Sidebar
- URL: `https://www.v7fhugd.com/32HKQB8/2CTPL/`

#### Assist Card (Seguro Viagem)
- Seção na Home
- Widget de cálculo

---

## Componentes Principais

### Layout
- `Layout` - Wrapper com Header + Footer
- `Header` - Cabeçalho com navegação e favoritos
- `Footer` - Rodapé com links e newsletter
- `Sidebar` - Menu lateral mobile

### Home
- `HeroSection` - Banner principal com busca
- `SearchWidget` - Widget de busca (voos/hotéis/carros)
- `PopularDestinations` - Carrossel de destinos
- `FeaturedOffers` - Ofertas em destaque
- `Newsletter` - Formulário de newsletter
- `TravelInsurance` - Seção Assist Card
- `ChipSection` - Seção AmericaChip

### UI
- `Button` - Botão estilizado
- `Badge` - Etiquetas de status
- `Card` - Cards genéricos

### Results
- `FlightCard` - Card de resultado de voo
- `HotelCard` - Card de resultado de hotel
- `CarCard` - Card de resultado de carro
- `TransferCard` - Card de resultado de transfer

---

## Próximas Etapas Sugeridas

### Funcionalidades
- [ ] **Internacionalização (i18n)** - Suporte a inglês e espanhol
- [ ] **Sistema de busca avançado** - Filtros e ordenação
- [ ] **Página individual de destino** - `/destinos/:slug`
- [ ] **Página individual de post** - `/blog/:slug`
- [ ] **Comentários no blog** - Sistema de comentários
- [ ] **Avaliações de destinos** - Sistema de reviews

### Técnicas
- [ ] **SEO avançado** - Meta tags dinâmicas por página
- [ ] **PWA** - App instalavel com offline support
- [ ] **Analytics** - Google Analytics / Plausible
- [ ] **Testes automatizados** - Unit e E2E tests

### Conteúdo
- [ ] Criar posts reais para o blog
- [ ] Cadastrar mais destinos com fotos de qualidade
- [ ] Manter ofertas atualizadas periodicamente

---

## Credenciais e Acessos

### Painel Admin
- URL: `/admin/login`
- Acesso: email/senha cadastrados no Supabase Auth

### Formspree
- Dashboard: https://formspree.io/
- Gerencie os formulários e veja submissões

### Supabase (Cloud Backend)
- Acesso via interface Sticklight
- Aba "Data" para ver tabelas
- Aba "Settings" > "Users" para gerenciar usuários

---

## Histórico de Alterações

### Implementações Principais
1. Estrutura base do site com React + Vite + Tailwind
2. Layout responsivo com Header, Footer e Sidebar
3. Páginas institucionais (Sobre, Como Funciona, Termos, etc)
4. Sistema de ofertas com cards e destaques
5. Página de destinos com grid
6. Blog com listagem de posts
7. Página de carreiras com benefícios e formulário
8. Integração com Travelpayouts (widgets de busca)
9. Integração com AmericaChip (chip internacional)
10. Seção de companhias aéreas parceiras
11. **Cloud Backend habilitado** (Supabase)
12. Tabelas criadas: offers, blog_posts, destinations, partners, jobs
13. Painel administrativo completo com CRUD
14. Sistema de autenticação (login/logout)
15. Integração de formulários com Formspree
16. Sistema de favoritos com localStorage
17. Coração funcional nos cards de ofertas

---

*Documentração gerada em Julho/2025*
