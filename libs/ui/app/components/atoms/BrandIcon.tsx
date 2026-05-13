export interface IBrandIconProps {
  className?: string
}

export const BrandIcon = ({ className = '' }: IBrandIconProps) => {
  return (
    <div className={`relative flex items-center justify-center w-6 h-6 ${className}`}>
      <div className="absolute inset-0 bg-primary rotate-45" style={{ boxShadow: '0 0 10px #C8FF00' }} />
      <div className="absolute inset-1 bg-white rotate-45" />
      <div className="absolute inset-2 bg-black rotate-45" />
    </div>
  )
}
