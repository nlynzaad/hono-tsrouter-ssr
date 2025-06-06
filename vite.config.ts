import {type ConfigEnv, defineConfig, type UserConfig} from 'vite';
import react from '@vitejs/plugin-react';
import devServer from '@hono/vite-dev-server';
import TanStackRouterVite from '@tanstack/router-plugin/vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import bunAdapter from "@hono/vite-dev-server/bun";
import {resolve}from "path"

const __dirname = import.meta.dir;

const ssrBuildConfig: UserConfig = {
	build: {
		outDir: 'dist/server',
		assetsDir: 'assets',
		ssrManifest: true,
		ssrEmitAssets: true,
		minify: true,
		copyPublicDir: false,
		emptyOutDir: true,
		rollupOptions: {
			input: {
				server: resolve(__dirname, '/src/server/server.ts')
			},
			output: {
				entryFileNames: '[name].js',
				chunkFileNames: 'assets/[name]-[hash].js',
				assetFileNames: 'assets/[name]-[hash][extname]',
			}
		}
	}
}

// Client-specific configuration
const clientBuildConfig: UserConfig = {
	build: {
		outDir: 'dist/client',
		assetsDir: 'assets',
		emitAssets: true,
		manifest: true,
		minify: true,
		copyPublicDir: true,
		emptyOutDir: true,
		rollupOptions: {
			external: ['node:fs', 'node:path'],
			input: {
				client: resolve(__dirname, '/src/entry-client.tsx')
			},
			output: {
				entryFileNames: 'static/[name].js',
				chunkFileNames: 'static/assets/[name]-[hash].js',
				assetFileNames: 'static/assets/[name]-[hash][extname]'
			}
		}
	}
}

export default defineConfig((configEnv: ConfigEnv): UserConfig => {
	const isBuild = configEnv.command === 'build';

	return {
		optimizeDeps: {
			exclude: ['@tanstack/react-start'],
		},
		ssr: {
			external: ['react', 'react-dom'],
		},
		plugins: [
			viteTsConfigPaths(),
			TanStackRouterVite({
				target: 'react',
				//currently code splitting results in an error. this is not a problem in prod.
				autoCodeSplitting: isBuild,
			}),
			devServer({
				entry: resolve(__dirname, '/src/server/server.ts'),
				adapter: bunAdapter,
				injectClientScript: false,
			}),
			react(),
		],
		...!isBuild ? {} : configEnv.isSsrBuild ? ssrBuildConfig : clientBuildConfig,
	}
});
