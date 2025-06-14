import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface BackButtonProps {
  href: string
  text: string
  onClick?: () => void
  className?: string
  variant?: 'default' | 'outline'
  showArrow?: boolean
}

export const BackButton = ({ 
  href, 
  text, 
  onClick, 
  className,
  variant = 'default',
  showArrow = true 
}: BackButtonProps) => {
  const buttonStyles = {
    default: "bg-brand-green hover:bg-green-700 shadow-lg hover:shadow-xl",
    outline: "border-brand-green text-brand-green hover:bg-brand-green hover:text-white"
  }

  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={`flex items-center text-brand-green hover:text-brand-green/80 transition-all duration-300 transform hover:-translate-x-1 z-50 ${className || ''}`}
    >
      <Button 
        variant={variant === 'outline' ? 'outline' : 'default'}
        className={`${buttonStyles[variant]} transition-all duration-300`}
      >
        {showArrow && <ArrowLeft className="h-5 w-5" />}
        <span className="hidden sm:inline ml-2">{text}</span>
      </Button>
    </Link>
  )
} 