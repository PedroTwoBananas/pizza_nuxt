// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
    './assets/scss/**/*.scss', // Добавьте эту строку!
  ],
  theme: {
    extend: {
      fontFamily: {
        alegreya: ['Alegreya', 'serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      // УДАЛИТЕ fontWeight и используйте правильный синтаксис:
      fontSize: {
        // Десктопные размеры (без fontWeight)
        'h1-desktop': ['72px', { lineHeight: '90px' }],
        'h2-desktop': ['52px', { lineHeight: '65px' }],
        'h3-desktop': ['32px', { lineHeight: '40px' }],
        'h4-desktop': ['24px', { lineHeight: '30px' }],
        'accent-desktop': ['24px', { lineHeight: '36px' }],
        'p-desktop': ['14px', { lineHeight: '21px' }],
        'description-desktop': ['12px', { lineHeight: '18px' }],

        // Планшетные размеры
        'h1-tablet': ['52px', { lineHeight: '65px' }],
        'h2-tablet': ['40px', { lineHeight: '60px' }],
        'h3-tablet': ['24px', { lineHeight: '30px' }],
        'h4-tablet': ['20px', { lineHeight: '27px' }],
        'accent-tablet': ['18px', { lineHeight: '27px' }],
        'p-tablet': ['14px', { lineHeight: '21px' }],
        'description-tablet': ['12px', { lineHeight: '18px' }],

        // Мобильные размеры
        'h1-mobile': ['40px', { lineHeight: '50px' }],
        'h2-mobile': ['28px', { lineHeight: '35px' }],
        'h3-mobile': ['20px', { lineHeight: '25px' }],
        'h4-mobile': ['18px', { lineHeight: '24px' }],
        'accent-mobile': ['16px', { lineHeight: '24px' }],
        'p-mobile': ['12px', { lineHeight: '18px' }],
        'description-mobile': ['11px', { lineHeight: '17px' }],
      },
      colors: {
        'text-primary': '#000000',
        'text-secondary': '#848A9A',
      },
    },
  },
  plugins: [],
} satisfies Config;
