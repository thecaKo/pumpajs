# PumpaJS

<p align="center">
  <img src="./public/pumpajs.png" alt="PumpaJS logo" width="280" />
</p>

PumpaJS é um playgound/framework HTTP, multithread-first, feito em TypeScript, inspirado no Fastify e construído sobre `node:http`. Quero somente testar construir as coisas "do zero". Isso não vai ser lançado, e provavelmente nunca será 100% completado.

## Multithread-First

PumpaJS nasce com multithread como parte do desenho inicial, não como uma otimização adicionada no fim.

No MVP, isso significa suportar execução com `cluster`: o mesmo app deve poder rodar em modo single-worker ou em múltiplos processos HTTP.

O objetivo não é prometer performance antes de medir. O objetivo é aprender, desde cedo, os custos e benefícios de um servidor Node rodando em mais de um processo:

- distribuição de requests entre workers
- ciclo de vida de processos
- restart de worker
- graceful shutdown
- logs por worker
- diferença entre concorrência e paralelismo
- comparação entre modo single-worker e multi-worker

## Objetivo

O objetivo principal do PumpaJS é aprendizado.

Ele não nasce para competir com frameworks maduros. Ele nasce para estudar, experimentar e construir uma base sólida sobre:

- HTTP e APIs
- Node internals
- Arquitetura de frameworks
- TypeScript aplicado a bibliotecas
- Arquitetura multithread-first com `cluster`
- Testes, benchmarks e documentação

Mesmo sendo educacional, a ideia é manter o projeto simples, claro e estável o suficiente para ser usado em APIs pequenas quando fizer sentido.

## Ideia De API

```ts
import { pumpa } from 'pumpajs'

const app = pumpa()

app.get('/health', () => {
  return { ok: true }
})

app.get('/users/:id', (ctx) => {
  return {
    id: ctx.params.id,
    search: ctx.query.search
  }
})

app.listen({
  port: 3000,
  workers: 4
})
```

## Como Rodar

Instale as dependencias:

```bash
pnpm install
```

Compile o projeto:

```bash
pnpm build
```

Rode os testes:

```bash
pnpm test
```

Rode o exemplo minimo:

```bash
pnpm build
node dist/examples/basic.js
```

Rode o placeholder de benchmark:

```bash
pnpm benchmark
```

## Status

Projeto em fase inicial de planejamento e fundação.
