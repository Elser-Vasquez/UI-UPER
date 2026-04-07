interface BrandLogoProps {
  size?: number
  className?: string
}

/**
 * BrandLogo — inline SVG component.
 * Two opposing angular arrows forming an S-bolt mark,
 * inspired by the Supabase logomark using brand green colors.
 *
 * Static SVG also available at: /public/icons/brand-logo.svg
 */
export function BrandLogo({ size = 18, className }: BrandLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      {/* Top arrow — points upper-right, main brand green */}
      <path
        d="M2 4 L13 4 L13 2 L22 7.5 L13 13 L13 11 L2 11 Z"
        fill="#3ECF8E"
      />
      {/* Bottom arrow — points lower-left, deeper green */}
      <path
        d="M22 13 L11 13 L11 11 L2 16.5 L11 22 L11 20 L22 20 Z"
        fill="#29a869"
      />
    </svg>
  )
}
