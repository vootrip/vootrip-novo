# Patch — links de atividades diferenciados + conteúdo real

## O que fazer
Sobrescrever estes 2 arquivos:
```
src/components/home/Activities.tsx
src/components/home/PopularDestinations.tsx
```

## O que mudou

### Activities.tsx (seção "O que fazer no destino")
1. As 4 categorias (Ingressos, Passeios, Experiências, Gastronomia) agora
   levam pra buscas diferentes no GetYourGuide, em vez de todas pra home
   genérica.
2. Nova seção "O que vale a pena em cada destino" — um card por cada um
   dos 6 destinos que já aparecem em "Destinos Populares", com 1-2 frases
   reais (pesquisei sobre cada um) e link de afiliado específico pra
   busca daquele destino no GetYourGuide.
3. A conta de afiliado (marker/trs) é a mesma de sempre — só mudou pra
   onde cada link aponta, o rastreamento continua igual.

### PopularDestinations.tsx (bônus — 2 bugs que achei no caminho)
- O link "Ver todos" apontava pra `/destinos`, rota que não existe —
  agora vai pra `/#destinos` (âncora da própria seção)
- Cada card de destino apontava pra `/voos?destino=X` (rota errada) —
  agora vai pra `/voos/resultados?destino=X` (rota real)
