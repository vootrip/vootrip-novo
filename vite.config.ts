/**
 * Config do Vite. A versão original desse arquivo vem com plugins
 * específicos do sandbox de IA onde o projeto foi gerado (injeção de
 * scripts do Elementor, log gravado em /tmp — caminho que só existe em
 * Linux/Mac). Removidos aqui pra rodar localmente no Windows sem erro.
 * O arquivo original ficou salvo como vite.config.ts.bak.
 *
 * IMPORTANTE: toda vez que a Sticklight gerar uma atualização nova do
 * projeto, ela vai trazer de volta a versão original desse arquivo —
 * nesse caso, é só reaplicar essa mesma limpeza.
 */
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { access, readFile } from 'fs/promises';
import { constants as fsConstants } from 'fs';
import path from 'path';
import { defineConfig, type PluginOption, type ViteDevServer } from 'vite';

function tailwindDevPlugin(): PluginOption {
	const themeCssPath = path.resolve(__dirname, './src/theme.css');
	let themeCssCache: string | null = null;

	async function readThemeCss(): Promise<string> {
		if (themeCssCache !== null) return themeCssCache;
		try {
			await access(themeCssPath, fsConstants.F_OK);
			themeCssCache = await readFile(themeCssPath, 'utf-8');
		} catch {
			themeCssCache = '';
		}
		return themeCssCache;
	}

	return [
		{
			name: 'tailwind-cdn',
			configureServer(server: ViteDevServer) {
				server.watcher.add(themeCssPath);
				const invalidate = (filePath: string) => {
					if (path.resolve(filePath) !== themeCssPath) return;
					themeCssCache = null;
					server.ws.send({ type: 'full-reload', path: '*' });
				};
				server.watcher.on('change', invalidate);
				server.watcher.on('add', invalidate);
				server.watcher.on('unlink', invalidate);
			},
			transformIndexHtml: {
				order: 'pre',
				async handler(html) {
					return {
						html,
						tags: [
							{
								tag: 'script',
								attrs: {
									src: 'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4.1.18/dist/index.global.min.js',
									integrity: 'sha384-WrpyCFNrMmN/IC7KmMNiXxIouXEFpoDIuJ2P+ys++uYEzegAW2MSl+X6Unsahaij',
									crossorigin: 'anonymous',
								},
								injectTo: 'head-prepend',
							},
							{
								tag: 'style',
								attrs: { type: 'text/tailwindcss' },
								children: await readThemeCss(),
								injectTo: 'head-prepend',
							},
						],
					};
				},
			},
			apply: 'serve',
		},
	];
}

export default defineConfig(() => {
	return {
		server: {
			port: 5173,
			warmup: {
				clientFiles: ['./src/main.tsx'],
			},
		},
		optimizeDeps: {
			include: ['react', 'react-dom', 'react-router', '@supabase/supabase-js', 'lucide-react'],
		},
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
			},
			dedupe: ['react', 'react-dom', 'react-router'],
		},
		plugins: [tailwindcss(), tailwindDevPlugin(), react()],
		build: { assetsInlineLimit: 100000 },
	};
});
