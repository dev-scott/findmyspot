import { IconLoader2 } from '@tabler/icons-react'

type ButtonSizes = 'none' | 'sm' | 'md' | 'lg' | 'xl'

export type IButtonProps = {
  size?: ButtonSizes
  variant?: 'contained' | 'outlined' | 'text'
  color?: 'primary' | 'success' | 'error' | 'white' | 'black'
  fullWidth?: boolean
  loading?: boolean
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

const variantColor = {
  contained: {
    primary: 'text-black bg-primary border border-primary enabled:hover:bg-primary-300 enabled:hover:border-primary-300 enabled:active:scale-[0.98] shadow-[0_0_20px_rgba(200,255,0,0.15)] enabled:hover:shadow-[0_0_30px_rgba(200,255,0,0.25)]',
    white: 'text-black bg-white border border-white enabled:hover:bg-gray-50 enabled:active:scale-[0.98]',
    black: 'text-white bg-black border border-black enabled:hover:bg-gray-900 enabled:active:scale-[0.98] shadow-lg shadow-black/10',
    success: 'text-white bg-green border border-green enabled:hover:bg-green-600 enabled:active:scale-[0.98]',
    error: 'text-white bg-red border border-red enabled:hover:bg-red-600 enabled:active:scale-[0.98]',
  },
  outlined: {
    primary: 'border border-primary text-primary enabled:hover:bg-primary/10 enabled:active:scale-[0.98]',
    white: 'border border-white/30 text-white enabled:hover:bg-white/10 enabled:active:scale-[0.98]',
    black: 'border border-black/30 text-black enabled:hover:bg-black/10 enabled:active:scale-[0.98]',
    success: 'border border-green/30 text-green enabled:hover:bg-green/5 enabled:active:scale-[0.98]',
    error: 'border border-red/30 text-red enabled:hover:bg-red/5 enabled:active:scale-[0.98]',
  },
  text: {
    primary: 'text-primary enabled:hover:bg-primary/10 enabled:active:scale-[0.98]',
    white: 'text-white enabled:hover:bg-white/10 enabled:active:scale-[0.98]',
    black: 'text-black enabled:hover:bg-black/10 enabled:active:scale-[0.98]',
    success: 'text-green enabled:hover:bg-green/10 enabled:active:scale-[0.98]',
    error: 'text-red enabled:hover:bg-red/10 enabled:active:scale-[0.98]',
  },
}

const sizes: { [key in ButtonSizes]: string } = {
  none: '',
  sm: 'px-3 py-1.5 text-xs tracking-tight',
  md: 'px-5 py-2.5 text-sm tracking-tight',
  lg: 'px-7 py-3 text-base font-semibold',
  xl: 'px-9 py-4 text-lg font-bold',
}

export const Button = ({
  size = 'md',
  variant = 'contained',
  color = 'primary',
  fullWidth = false,
  disabled = false,
  children,
  className,
  loading = false,
  type = 'button',
  ...props
}: IButtonProps) => {
  const variantCls = variantColor[variant][color]
  const sizeCls = sizes[size]

  const fwCls = fullWidth && 'w-full'
  const disCls = (disabled || loading) && 'opacity-50 cursor-not-allowed grayscale'

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-none cursor-pointer relative font-bold uppercase
        transition-all duration-300 ease-out
        ${sizeCls} ${fwCls} ${variantCls} ${disCls} ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <IconLoader2 className="w-4 h-4 animate-spin" />
          <span className="opacity-0">{children}</span>
          <span className="absolute inset-0 flex items-center justify-center">Loading...</span>
        </>
      ) : (
        <>{children}</>
      )}
    </button>
  )
}
