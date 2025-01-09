const {nextui} = require('@nextui-org/theme');
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|image|input|navbar|user|ripple|spinner|form|avatar).js"
  ],
  theme: {
    extend: {
      fontFamily: {
        anta: ['Anta', 'sans-serif'],
        ptsans: ['PTSansRegular', 'sans-serif'],
        ptsansBold: ['PTSansBold', 'sans-serif'],
        ptsansItalic: ['PTSansBoldItalic', 'sans-serif'],
        poppinsBlack: ['PoppinsBlack', 'sans-serif'],
      },
    },
  },
  plugins: [
            nextui(),
            require('tailwindcss-transforms')({
              '3d': true, // Enable 3D transforms
            }),
          ],
}
