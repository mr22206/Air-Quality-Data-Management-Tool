import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Remplace 'NOM_DE_TON_REPO' par le nom de ton dépôt
export default defineConfig({
  plugins: [react()],
  base: '/Data-x-Giec/site-giec/',  // Remplace par le chemin de ton repo
});