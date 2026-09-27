import { useEffect, useRef, useState } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface NavigationItem {
  label: string;
  href: string;
}

interface Props {
  brandName: string;
  lang: 'en' | 'es';
  navigationLabel: string;
  items: NavigationItem[];
  languageHref: string;
  languageLabel: string;
  languageCode: string;
}

export default function MobileNavigation({
  brandName,
  lang,
  navigationLabel,
  items,
  languageHref,
  languageLabel,
  languageCode,
}: Props) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuLabel = lang === 'es' ? 'Menú' : 'Menu';
  const closeLabel = lang === 'es' ? 'Cerrar navegación' : 'Close navigation';
  const sheetTitle = lang === 'es' ? 'Navegación' : 'Navigation';
  const sheetDescription =
    lang === 'es' ? 'Enlaces principales del portfolio.' : 'Primary portfolio links.';

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 48rem)');
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    desktopQuery.addEventListener('change', closeOnDesktop);
    return () => desktopQuery.removeEventListener('change', closeOnDesktop);
  }, []);

  return (
    <div className="mobile-navigation">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger ref={triggerRef} className="mobile-nav-trigger button button-secondary">
          <span className="mobile-nav-trigger-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span>{menuLabel}</span>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="mobile-nav-sheet"
          initialFocus={closeRef}
          finalFocus={triggerRef}
        >
          <SheetHeader className="mobile-nav-sheet-header">
            <div>
              <p className="mobile-nav-brand">{brandName}</p>
              <SheetTitle className="mobile-nav-sheet-title">{sheetTitle}</SheetTitle>
              <SheetDescription className="mobile-nav-sheet-description">
                {sheetDescription}
              </SheetDescription>
            </div>
            <SheetClose ref={closeRef} className="mobile-nav-close" aria-label={closeLabel}>
              <span aria-hidden="true">×</span>
            </SheetClose>
          </SheetHeader>
          <nav className="mobile-nav-links" aria-label={navigationLabel}>
            <ul>
              {items.map((item) => (
                <li key={item.href}>
                  <a className="mobile-nav-link" href={item.href} onClick={() => setOpen(false)}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mobile-nav-locale">
            <span>{lang === 'es' ? 'Idioma' : 'Language'}</span>
            <a
              className="mobile-nav-language"
              href={languageHref}
              hrefLang={lang === 'es' ? 'en' : 'es'}
              lang={lang === 'es' ? 'en' : 'es'}
              aria-label={languageLabel}
              onClick={() => setOpen(false)}
            >
              {languageCode}
            </a>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
