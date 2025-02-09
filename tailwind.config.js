import colors from './.tailwind/colors';
import fontFamily from './.tailwind/font-family';
import screens from './.tailwind/screens';
import backgroundImage from './.tailwind/background-image';
import zIndex from './.tailwind/z-index';
import keyframes from './.tailwind/keyframes';
import animation from './.tailwind/animation';
import spacing from './.tailwind/spacing';
import blur from './.tailwind/blur';
import backdropBlur from './.tailwind/backdrop-blur';
import boxShadow from './.tailwind/box-shadow';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      screens,
      colors,
      fontFamily,
      backgroundImage,
      zIndex,
      animation,
      keyframes,
      spacing,
      blur,
      backdropBlur,
      boxShadow
    }
  },
  plugins: []
};
