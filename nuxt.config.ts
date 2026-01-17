// nuxt.config.ts
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/scss/main.scss'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  vite: {
    plugins: [tailwindcss()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "~/assets/scss/_fonts.scss";
            @import "~/assets/scss/_typography.scss";
          `,
        },
      },
    },
  },

  modules: ['@nuxt/image'],
});
