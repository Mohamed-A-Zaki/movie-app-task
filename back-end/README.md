# Deployment Instructions for Vercel

## Environment Variables
- Copy the contents of your local `.env` file to the Vercel dashboard under Project Settings > Environment Variables.
- Required variables (from code):
  - `DB_URI` (MongoDB connection string)
  - `JWT_SECRET` (JWT signing secret)
  - Any other variables you use in your `.env` file

## Build & Deploy
- Vercel will use `vercel.json` and `vercel-build` script to build and deploy the backend.
- Entry point: `src/index.ts` (exports a serverless handler)
- No frontend included; this is a backend API only.

## Local Development
- Use `yarn dev` for local development.
- Use `vercel dev` to emulate Vercel locally (requires [Vercel CLI](https://vercel.com/docs/cli)).

## Notes
- Ensure all dependencies are installed (`yarn install`).
- If you add new environment variables, update this README and the Vercel dashboard accordingly.
