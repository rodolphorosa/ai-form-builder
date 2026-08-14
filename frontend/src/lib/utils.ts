import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { formatDistanceToNow, Locale } from "date-fns"
import { ptBR, enUS, de, es, fr } from "date-fns/locale"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parseUpdateDate = (updatedAt: number, locale: string) => {
  const language: Locale = {
      "pt": ptBR,
      "en": enUS,
      "de": de,
      "es": es,
      "fr": fr
  }[locale] ?? ptBR

  return formatDistanceToNow(new Date(updatedAt), {
      addSuffix: true,
      locale: language,
  })
}