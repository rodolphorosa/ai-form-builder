import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['pt', 'en', 'de', 'es', 'fr'],
  defaultLocale: 'pt'
});