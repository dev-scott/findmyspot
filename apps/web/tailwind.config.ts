import type { Config } from 'tailwindcss'

// @ts-expect-error TypeScript doesn't like .ts extension in imports without allowImportingTsExtensions
import uiConfig from '../../libs/ui/tailwind.config.ts'

const config: Config = {
  presets: [uiConfig],
  content: ['./app/**/*.{js,ts,jsx,tsx}', '../libs/ui/**/*.{js,ts,jsx,tsx}'],
}
export default config