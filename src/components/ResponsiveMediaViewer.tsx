import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from '@/components/ui/drawer';

type MediaItem = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

type Copy = {
  close: string;
  previous: string;
  next: string;
  original: string;
  loading: string;
  error: string;
};

type Props = {
  rootId: string;
  title: string;
  lang: 'en' | 'es';
};

const copyByLanguage: Record<'en' | 'es', Copy> = {
  en: {
    close: 'Close image viewer',
    previous: 'Previous image',
    next: 'Next image',
    original: 'Open original image',
    loading: 'Loading image…',
    error: 'This image could not be displayed.',
  },
  es: {
    close: 'Cerrar visor de imágenes',
    previous: 'Imagen anterior',
    next: 'Imagen siguiente',
    original: 'Abrir imagen original',
    loading: 'Cargando imagen…',
    error: 'No se pudo mostrar esta imagen.',
  },
};

function readItems(root: HTMLElement): MediaItem[] {
  return Array.from(root.querySelectorAll<HTMLAnchorElement>('[data-media-viewer-trigger]'))
    .map((anchor) => {
      const image = anchor.querySelector('img');
      if (!image) return null;
      return {
        src: anchor.href,
        alt: image.alt,
        caption: (anchor.nextElementSibling ?? anchor.parentElement?.nextElementSibling)?.textContent?.trim() ?? '',
        width: image.naturalWidth || Number(image.width),
        height: image.naturalHeight || Number(image.height),
      };
    })
    .filter((item): item is MediaItem => item !== null);
}

export default function ResponsiveMediaViewer({ rootId, title, lang }: Props) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mode, setMode] = useState<'dialog' | 'drawer'>('dialog');
  const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const copy = copyByLanguage[lang];
  const isOpen = activeIndex !== null;
  const activeItem = activeIndex === null ? null : items[activeIndex] ?? null;

  const closeViewer = useCallback(() => setActiveIndex(null), []);
  const fitImage = useCallback(() => {
    const stage = stageRef.current;
    const image = imageRef.current;
    if (!stage || !image?.naturalWidth || !image.naturalHeight) return;
    const scale = Math.min(stage.clientWidth / image.naturalWidth, stage.clientHeight / image.naturalHeight, 1);
    setImageSize({
      width: Math.floor(image.naturalWidth * scale),
      height: Math.floor(image.naturalHeight * scale),
    });
  }, []);

  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;
    const nextItems = readItems(root);
    setItems(nextItems);

    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>('[data-media-viewer-trigger]');
      if (!anchor || !root.contains(anchor)) return;
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const index = Array.from(root.querySelectorAll('[data-media-viewer-trigger]')).indexOf(anchor);
      if (index < 0) return;
      event.preventDefault();
      openerRef.current = anchor;
      setMode(window.matchMedia('(max-width: 47.99rem)').matches ? 'drawer' : 'dialog');
      setImageState('loading');
      setActiveIndex(index);
    };

    root.addEventListener('click', handleClick);
    return () => root.removeEventListener('click', handleClick);
  }, [rootId]);

  useEffect(() => {
    if (!isOpen) return;
    const mediaQuery = window.matchMedia('(max-width: 47.99rem)');
    const updateMode = (event: MediaQueryList | MediaQueryListEvent) => setMode(event.matches ? 'drawer' : 'dialog');
    updateMode(mediaQuery);
    mediaQuery.addEventListener('change', updateMode);
    return () => mediaQuery.removeEventListener('change', updateMode);
  }, [isOpen]);

  const move = (direction: -1 | 1) => {
    if (activeIndex === null) return;
    const next = activeIndex + direction;
    if (next < 0 || next >= items.length) return;
    setImageState('loading');
    setActiveIndex(next);
  };

  const finalFocus = useCallback(() => openerRef.current, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (activeIndex === null || !stage) return;
    const observer = new ResizeObserver(fitImage);
    observer.observe(stage);
    fitImage();
    return () => observer.disconnect();
  }, [activeIndex, fitImage]);

  const controls = activeItem && activeIndex !== null ? (
    <>
      <div className="media-viewer-toolbar">
        {items.length > 1 && (
          <p className="media-viewer-count" aria-live="polite">
            {activeIndex + 1} {lang === 'es' ? 'de' : 'of'} {items.length}
          </p>
        )}
        {mode === 'dialog' ? (
          <DialogClose className="media-viewer-close" aria-label={copy.close} ref={closeRef}>×</DialogClose>
        ) : (
          <DrawerClose className="media-viewer-close" aria-label={copy.close} ref={closeRef}>×</DrawerClose>
        )}
      </div>
      <div ref={stageRef} className="media-viewer-stage" aria-busy={imageState === 'loading'}>
        {imageState === 'loading' && <p className="media-viewer-status">{copy.loading}</p>}
        {imageState === 'error' ? (
          <p className="media-viewer-status" role="status">{copy.error}</p>
        ) : (
          <img
            ref={imageRef}
            className="media-viewer-image"
            src={activeItem.src}
            alt={activeItem.alt}
            width={activeItem.width}
            height={activeItem.height}
            style={imageSize ? { width: imageSize.width, height: imageSize.height } : undefined}
            onLoad={() => { fitImage(); setImageState('loaded'); }}
            onError={() => { setImageSize(null); setImageState('error'); }}
          />
        )}
      </div>
      <div className="media-viewer-footer">
        <p className="media-viewer-caption">{activeItem.caption}</p>
        <a className="text-link" href={activeItem.src} target="_blank" rel="noopener noreferrer">{copy.original}</a>
        {items.length > 1 && (
          <div className="media-viewer-navigation">
            <button className="button button-secondary" type="button" onClick={() => move(-1)} disabled={activeIndex === 0} aria-label={copy.previous}>←</button>
            <button className="button button-secondary" type="button" onClick={() => move(1)} disabled={activeIndex === items.length - 1} aria-label={copy.next}>→</button>
          </div>
        )}
      </div>
    </>
  ) : null;

  return (
    <>
      <span className="media-viewer-hydration-sentinel" aria-hidden="true" />
      {mode === 'dialog' ? (
        <Dialog open={isOpen} onOpenChange={(open) => !open && closeViewer()}>
          <DialogContent className="media-viewer-dialog" initialFocus={closeRef} finalFocus={finalFocus}>
            <DialogTitle className="media-viewer-title">{title}</DialogTitle>
            {activeItem && <DialogDescription className="sr-only">{activeItem.caption}</DialogDescription>}
            {controls}
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={isOpen} onOpenChange={(open) => !open && closeViewer()}>
          <DrawerContent className="media-viewer-drawer" initialFocus={closeRef} finalFocus={finalFocus}>
            <DrawerTitle className="media-viewer-title">{title}</DrawerTitle>
            {activeItem && <DrawerDescription className="sr-only">{activeItem.caption}</DrawerDescription>}
            {controls}
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}
