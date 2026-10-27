import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The site is a single page with no client-side router, so a relative base
// works unchanged at a domain root, on a custom domain, and under a GitHub
// Pages project path such as https://<user>.github.io/<repo>/.
// Set BASE_PATH (e.g. "/vellfire-web/") to force an absolute base instead.
const base = process.env.BASE_PATH ?? './';

export default defineConfig({
  base,
  // Vite reports BASE_URL as "/" in SSR builds; this keeps prerendered and
  // client-rendered asset URLs identical (see src/utils/asset.ts).
  define: { __ASSET_BASE__: JSON.stringify(base) },
  plugins: [react()],
});
