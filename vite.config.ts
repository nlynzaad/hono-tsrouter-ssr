import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import devServer from '@hono/vite-dev-server';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import bunAdapter from "@hono/vite-dev-server/bun";

export default defineConfig({
  ssr: {
    external: ['react', 'react-dom'],
  },
  plugins: [
    viteTsConfigPaths(),
    TanStackRouterVite({
      target: 'react',
      autoCodeSplitting: false
    }),
    devServer({
      entry: './src/server/server.ts',
      adapter: bunAdapter,
    }),
    react(),
  ],
});
