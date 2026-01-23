'use client'

import {
  Database,
  Shield,
  Zap,
  BarChart3,
  Download,
  HeadphonesIcon,
  Lock,
  RefreshCw,
} from 'lucide-react'
import type { Benefit } from '@/lib/config/content'

interface BenefitIconProps {
  icon: Benefit['icon']
  className?: string
}

const iconMap = {
  database: Database,
  shield: Shield,
  lightning: Zap,
  chart: BarChart3,
  download: Download,
  support: HeadphonesIcon,
  lock: Lock,
  refresh: RefreshCw,
} as const

export function BenefitIcon({ icon, className = 'w-6 h-6' }: BenefitIconProps) {
  const IconComponent = iconMap[icon]
  return <IconComponent className={className} />
}
