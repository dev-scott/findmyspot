import type { Config } from 'tailwindcss'

const config: Config = {
  presets: [require('../../libs/ui/tailwind.config')],
  content: ['./app/**/*.{js,ts,jsx,tsx}', '../libs/ui/**/*.{js,ts,jsx,tsx}'],
}
export default config