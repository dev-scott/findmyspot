import type { Config } from 'tailwindcss'

import uiConfig from '../../libs/ui/tailwind.config'

const config: Config = {
  presets: [uiConfig],
  content: ['./app/**/*.{js,ts,jsx,tsx}', '../libs/ui/**/*.{js,ts,jsx,tsx}'],
}
export default config