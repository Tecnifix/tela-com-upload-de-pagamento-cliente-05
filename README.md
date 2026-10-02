# Project Uplift

suba esse projeto por completo

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://joyful-heart-flow.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/737cf718-bcf5-4b22-83a2-c238db389a88).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Deploy na Vercel

O projeto já está preparado para a Vercel (build via Nitro, saída em `.vercel/output`).

1. Importe o repositório na Vercel.
2. Deixe as configurações padrão — o `vercel.json` já define o build.
3. Em **Settings → Environment Variables**, adicione (Production + Preview):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_SUPABASE_PROJECT_ID`
   - `SUPABASE_URL`
   - `SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_PROJECT_ID`
4. Faça o deploy.

Os valores são os mesmos do arquivo `.env` local.
