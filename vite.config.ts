import {type ConfigEnv, defineConfig, type UserConfig} from 'vite';
import react from '@vitejs/plugin-react';
import devServer from '@hono/vite-dev-server';
import TanStackRouterVite from '@tanstack/router-plugin/vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import bunAdapter from "@hono/vite-dev-server/bun";
import {dirname, resolve} from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const baseBuildConfig: UserConfig['build'] = {
	minify: true,
	assetsDir: 'assets',
	rollupOptions: {
		output: {
			entryFileNames: '[name].js',
			chunkFileNames: 'assets/[name]-[hash].js',
			assetFileNames: 'assets/[name]-[hash][extname]'
		}
	}
}

const ssrBuildConfig: UserConfig = {
	build: {
		...baseBuildConfig,
		outDir: 'dist/server',
		ssrManifest: true,
		ssrEmitAssets: true,
		rollupOptions: {
			...baseBuildConfig?.rollupOptions,
			input: {
				server: resolve(__dirname, 'src/server/server.ts')
			},
		}
	}
}

// Client-specific configuration
const clientBuildConfig: UserConfig = {
	build: {
		...baseBuildConfig,
		outDir: 'dist/client',
		emitAssets: true,
		manifest: true,
		rollupOptions: {
			...baseBuildConfig?.rollupOptions,
			input: {
				client: resolve(__dirname, 'src/entry-client.tsx')
			},
		}
	}
}

export default defineConfig((configEnv: ConfigEnv): UserConfig => {
	const isBuild = configEnv.command === 'build';

	return {
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
				entry: resolve(__dirname, 'src/server/server.ts'),
				adapter: bunAdapter,
			}),
			react(),
		],
		...!isBuild ? {} : configEnv.isSsrBuild ? ssrBuildConfig : clientBuildConfig,
	}
});
