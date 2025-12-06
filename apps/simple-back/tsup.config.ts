import path from 'path';
import { defineConfig } from 'tsup';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  entry: ['src/app.ts'],
  format: ['esm'],
  dts: true,
  outDir: 'dist',
  clean: true,
  esbuildOptions(options) {
    options.alias = {
      '@libs/shared/enums': path.resolve(__dirname, '../../libs/shared/enums'),
      '@libs/shared/models': path.resolve(__dirname, '../../libs/shared/models'),
      '@libs/shared/utils': path.resolve(__dirname, '../../libs/shared/utils'),
    };
  },
});