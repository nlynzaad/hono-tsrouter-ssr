import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import devServer from '@hono/vite-dev-server';
import TanStackRouterVite from '@tanstack/router-plugin/vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import bunAdapter from "@hono/vite-dev-server/bun";
import {dirname, resolve} from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const baseConfig = {
  ssr: {
    external: ['react', 'react-dom'],
  },
  plugins: [
    viteTsConfigPaths(),
    TanStackRouterVite({
      target: 'react',
      autoCodeSplitting: false,
    }),
    devServer({
      entry: resolve(__dirname, 'src/server/server.ts'),
      adapter: bunAdapter
    }),
    react(),
  ],
}

const ssrConfig = {
    ...baseConfig,
    build: {
      minify: true,
      outDir: 'dist/server',
      assetsDir: 'assets',
      ssrManifest: true,
      ssrEmitAssets: true,
      rollupOptions: {
        input: {
          server: resolve(__dirname, 'src/server/server.ts')
        },
        output: {
          entryFileNames: '[name].js',
          chunkFileNames: 'assets/[name]-[hash].js'
        }
      }
    }
}

// Client-specific configuration
const clientConfig = {
  ...baseConfig,
  build: {
    manifest: true,
    assetsDir: 'assets',
    outDir: 'dist/client',
    minify: true,
    emitAssets: true,
    rollupOptions: {
      // Specify entry points directly
      input: {
        client: resolve(__dirname, 'src/entry-client.tsx')
      },
      // Generate output with predictable names
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  }
}

const getConfig = (configEnv) => {
  return configEnv.isSsrBuild ? ssrConfig : clientConfig
}

// https://vitejs.dev/config/
export default defineConfig(getConfig);
