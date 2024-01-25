import { defineConfig } from 'vite';

export default defineConfig({
  base: '/lesPetitsPlatsFront/',
  esbuild: {
    supported: {
      'top-level-await': true // browsers can handle top-level-await features
    }
  }
});
