import path from "node:path";
import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
	plugins: [
		preact(),
		tailwindcss(),
		visualizer({
			open: true, // 构建后自动打开浏览器
			gzipSize: true, // 显示 gzip 大小
			filename: "dist/stats.html", // 输出路径（建议放 dist 方便部署）
			template: "treemap", // 可选: treemap/sunburst/network
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
	optimizeDeps: {
		include: ["nano-css/addon/vcssom"],
	},
	build: {
		// outDir: "./dist",
		outDir: "D:/nginx/html",
		emptyOutDir: true,
	},
}));
