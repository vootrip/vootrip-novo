# Deploy no Cloudflare Pages — passo a passo

## O que fazer com esse arquivo
Coloca `_redirects` dentro da pasta `public` do seu projeto (sem
extensão nenhuma, o nome do arquivo é exatamente `_redirects`).

Esse arquivo resolve a mesma coisa que o `netlify.toml` resolvia pro
Netlify: sem ele, abrir uma URL direto tipo `/voos/resultados` ou dar F5
numa página que não seja a home dá erro 404, porque esse site é uma SPA
(o roteamento acontece no navegador via React Router, não existem
arquivos .html reais pra cada página).

## Passo 1 — Testar o build local antes de subir

```
npm run build
```

Se completar sem erro, cria uma pasta `dist` — é essa pasta que vai ser
publicada.

## Passo 2 — Subir pro GitHub (se ainda não tiver repositório)

```
git init
git add .
git commit -m "Preparar deploy"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/vootrip-novo.git
git push -u origin main
```

**Confirma que o `.env.local` NÃO subiu junto** — ele deve estar no
`.gitignore`. Roda `git status` antes do commit e confere que
`.env.local` não aparece na lista de arquivos que vão ser commitados.

## Passo 3 — Criar conta / entrar no Cloudflare

1. Entra em https://dash.cloudflare.com/ (cria conta grátis se não
   tiver, é só e-mail + senha, não pede cartão de crédito)

## Passo 4 — Criar o projeto Pages

1. No menu lateral, procura **"Workers & Pages"**
2. Clica em **"Create application"** → aba **"Pages"** → **"Connect to Git"**
3. Autoriza o Cloudflare a acessar sua conta do GitHub (se for a
   primeira vez)
4. Escolhe o repositório `vootrip-novo` (ou o nome que você deu)

## Passo 5 — Configurar o build

Vai aparecer uma tela pra configurar. Preenche assim:

| Campo | Valor |
|---|---|
| Framework preset | Vite (se aparecer na lista) ou "None" |
| Build command | `npm run build` |
| Build output directory | `dist` |

## Passo 6 — Variáveis de ambiente (ESSENCIAL)

Antes de clicar em "Save and Deploy", procura a seção **"Environment
variables"** (às vezes fica escondida atrás de "Advanced" ou aparece
numa tela seguinte) e adiciona os 3 valores do seu `.env.local`:

| Nome | Valor |
|---|---|
| `VITE_SUPABASE_URL` | (o que está no seu .env.local) |
| `VITE_SUPABASE_ANON_KEY` | (o que está no seu .env.local) |
| `VITE_SUPABASE_PROJECT_ID` | (o que está no seu .env.local) |

Sem isso, o site builda e sobe normal, mas fica sem conseguir falar com
o Supabase (ofertas/destinos/blog não aparecem, admin não loga).

Se não achar essa tela na hora de criar o projeto, dá pra adicionar
depois: projeto criado → **Settings** → **Environment variables**.

## Passo 7 — Deploy

Clica em **"Save and Deploy"**. Leva 1-3 minutos. No final, aparece uma
URL tipo `vootrip-novo.pages.dev` — esse já é o site publicado, no ar.

## Passo 8 — Testar tudo

Na URL `.pages.dev` que apareceu:
1. Abre `/voos/resultados` direto pela URL — deve carregar (não 404).
   Se der 404, o `_redirects` não pegou; confirma que ele está mesmo
   dentro de `public/` e que o build incluiu ele em `dist/`
2. `/admin/login` — testa logar com o usuário que você já criou
3. Cria uma oferta de teste, dá F5, confirma que persiste

## Depois: domínio próprio (vootrip.com)
Quando estiver tudo testado e você quiser apontar o domínio de verdade
pra esse projeto, me avisa — o processo muda dependendo de onde o
domínio `vootrip.com` está registrado hoje (é aí que entra configuração
de DNS).
