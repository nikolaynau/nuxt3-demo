export default defineNuxtConfig({
  compatibilityDate: '2025-02-08',

  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      link: [
        { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon.png',
          sizes: '32x32'
        }
      ],
      meta: [{ name: 'format-detection', content: 'telephone=no' }]
    }
  },

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  modules: ['@vueuse/nuxt', '@nuxtjs/i18n'],

  i18n: {
    detectBrowserLanguage: false,
    locales: [
      {
        code: 'ru',
        file: 'ru.json'
      },
      {
        code: 'en',
        file: 'en.json'
      }
    ],
    lazy: true,
    langDir: 'lang',
    defaultLocale: 'ru'
  },

  devtools: {
    enabled: false
  },

  features: {
    inlineStyles: false
  },

  hooks: {
    'build:manifest': manifest => {
      for (const key in manifest) {
        const meta = manifest[key];
        if (meta.resourceType === 'image') {
          meta.prefetch = false;
          meta.preload = false;
        }
      }
    }
  }
});
