export interface IBadgeProps {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'gray' | 'red' | 'yellow' | 'green'
  className?: string
}

export const Badge = ({
  children,
  size = 'md',
  variant = 'gray',
  className = '',
}: IBadgeProps) => {
  const sizeCls = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-[11px]',
    lg: 'px-3 py-1.5 text-xs',
  }
  const variantCls = {
    primary: 'bg-primary/10 border border-primary/20 text-primary',
    gray: 'bg-gray-100 border border-gray-200 text-gray-600',
    red: 'bg-red-50 border border-red-100 text-red-600',
    yellow: 'bg-yellow-50 border border-yellow-100 text-yellow-700',
    green: 'bg-green-50 border border-green-100 text-green-700',
  }
  return (
    <span
      className={`
        inline-flex items-center justify-center font-bold uppercase tracking-wider
        rounded-none transition-all duration-300
        ${sizeCls[size]} ${variantCls[variant]} ${className}
      `}
    >
      {children}
    </span>
  )
}
