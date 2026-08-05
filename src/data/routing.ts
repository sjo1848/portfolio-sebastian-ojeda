import type { Language } from './site';

export const defaultLanguage: Language = 'en';

export function getLanguageRoot(language: Language) {
  return language === 'es' ? '/es/' : '/';
}

export function getProjectPath(language: Language, slug: string) {
  return `${language === 'es' ? '/es' : ''}/projects/${slug}/`;
}

export function getAlternatePath(pathname: string, language: Language) {
  if (language === 'en') {
    if (pathname === '/404.html') return '/es/404/';
    return pathname === '/' ? '/es/' : `/es${pathname}`;
  }

  if (pathname === '/es' || pathname === '/es/') return '/';
  if (pathname === '/es/404' || pathname === '/es/404/') return '/404.html';
  return pathname.startsWith('/es/') ? pathname.slice(3) : pathname;
}
