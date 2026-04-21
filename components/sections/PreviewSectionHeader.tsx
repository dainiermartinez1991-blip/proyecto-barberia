'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useI18n } from '@/lib/I18nContext'
import type { TranslationKey } from '@/lib/i18n'

interface PreviewSectionHeaderProps {
  labelKey: TranslationKey
  linkHref: string
  linkLabelKey: TranslationKey
  titleFirstWord: string
  titleHighlight: string
}

export default function PreviewSectionHeader({
  labelKey,
  linkHref,
  linkLabelKey,
  titleFirstWord,
  titleHighlight,
}: PreviewSectionHeaderProps) {
  const { t } = useI18n()

  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
      <div>
        <p className="text-primary text-sm font-medium tracking-[0.15em] uppercase mb-3">{t(labelKey)}</p>
        <h2 className="font-display text-4xl lg:text-5xl font-bold text-neutral-50">
          Our <span className="text-primary">{titleHighlight}</span>
        </h2>
      </div>
      <Link
        href={linkHref}
        className="flex items-center gap-2 text-primary hover:text-primary-light font-medium transition-colors group"
      >
        {t(linkLabelKey)}
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  )
}
