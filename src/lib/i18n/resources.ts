import en from '@/translations/en.json';
import ptBr from '@/translations/pt-br.json';

export const resources = {
  en: {
    translation: en,
  },
  ptBr: {
    translation: ptBr,
  },
};

export type Language = keyof typeof resources;
