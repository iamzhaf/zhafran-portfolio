import typography from '@tailwindcss/typography'

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}', './posts/**/*.{md,mdx}'],
  theme: { extend: {} },
  plugins: [typography],
}