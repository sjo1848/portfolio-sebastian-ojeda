import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import ResponsiveMediaViewer from './ResponsiveMediaViewer';

type Language = 'es' | 'en';
type MediaKind = 'image' | 'gif';

type GalleryItem = {
  kind: MediaKind;
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

type Labels = {
  openImage: string;
  playGif: string;
  stopGif: string;
  openGif: string;
  gifReady: string;
  gifAvailable: string;
  gifError: string;
  previous: string;
  next: string;
  galleryName: string;
  carouselName: string;
};

type Props = {
  rootId: string;
  title: string;
  lang: Language;
  items: GalleryItem[];
  labels: Labels;
};

export default function EvidenceGallery({ rootId, title, lang, items, labels }: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobilePresentation, setIsMobilePresentation] = useState(false);
  const [playingGifs, setPlayingGifs] = useState<Set<number>>(() => new Set());
  const [gifErrors, setGifErrors] = useState<Set<number>>(() => new Set());
  const isCarousel = items.length > 1;
  const hasMobileCarousel = isCarousel && isMobilePresentation;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 47.99rem)');
    const updatePresentation = (event: MediaQueryList | MediaQueryListEvent) => setIsMobilePresentation(event.matches);
    updatePresentation(mediaQuery);
    mediaQuery.addEventListener('change', updatePresentation);
    return () => mediaQuery.removeEventListener('change', updatePresentation);
  }, []);

  const updateActiveSlide = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport || !isCarousel) return;
    const viewportCenter = viewport.getBoundingClientRect().left + viewport.clientWidth / 2;
    const slides = Array.from(viewport.querySelectorAll<HTMLElement>('[data-gallery-slide]'));
    if (slides.length === 0) return;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;
    slides.forEach((slide, index) => {
      const bounds = slide.getBoundingClientRect();
      const distance = Math.abs(bounds.left + bounds.width / 2 - viewportCenter);
      if (distance < nearestDistance) {
        nearestIndex = index;
        nearestDistance = distance;
      }
    });
    setActiveSlide((current) => current === nearestIndex ? current : nearestIndex);
  }, [isCarousel]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !isCarousel) return;
    let frame = 0;
    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateActiveSlide);
    };
    viewport.addEventListener('scroll', scheduleUpdate, { passive: true });
    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(viewport);
    scheduleUpdate();
    return () => {
      window.cancelAnimationFrame(frame);
      viewport.removeEventListener('scroll', scheduleUpdate);
      resizeObserver.disconnect();
    };
  }, [isCarousel, updateActiveSlide]);

  const goToSlide = (index: number) => {
    const viewport = viewportRef.current;
    const slide = viewport?.querySelector<HTMLElement>(`[data-gallery-slide="${index}"]`);
    if (!viewport || !slide || index < 0 || index >= items.length) return;
    const behavior: ScrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    const left = viewport.scrollLeft + slide.getBoundingClientRect().left - viewport.getBoundingClientRect().left;
    viewport.scrollTo({ left, behavior });
    window.requestAnimationFrame(updateActiveSlide);
  };

  const handleCarouselKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft' && activeSlide > 0) {
      event.preventDefault();
      goToSlide(activeSlide - 1);
    } else if (event.key === 'ArrowRight' && activeSlide < items.length - 1) {
      event.preventDefault();
      goToSlide(activeSlide + 1);
    }
  };

  const toggleGif = (index: number) => {
    if (playingGifs.has(index)) {
      setPlayingGifs((current) => {
        const next = new Set(current);
        next.delete(index);
        return next;
      });
      return;
    }
    setGifErrors((current) => {
      const next = new Set(current);
      next.delete(index);
      return next;
    });
    setPlayingGifs((current) => new Set(current).add(index));
  };

  return (
    <div id={rootId} className={`project-gallery-grid${isCarousel ? ' has-carousel' : ' is-single'}`}>
      <div
        ref={viewportRef}
        className="project-gallery-viewport"
        role="region"
        aria-label={labels.galleryName}
        aria-roledescription={hasMobileCarousel ? (lang === 'es' ? 'carrusel' : 'carousel') : undefined}
        tabIndex={hasMobileCarousel ? 0 : undefined}
        onKeyDown={hasMobileCarousel ? handleCarouselKeyDown : undefined}
      >
        <div className="project-gallery-track">
          {items.map((item, index) => {
            const isPlaying = playingGifs.has(index);
            const hasGifError = gifErrors.has(index);
            return (
              <figure
                key={`${item.src}-${index}`}
                className={`gallery-media${item.height > item.width ? ' gallery-media-portrait' : ''}`}
                data-gallery-slide={index}
                aria-roledescription={hasMobileCarousel ? (lang === 'es' ? 'diapositiva' : 'slide') : undefined}
                aria-label={isCarousel ? `${index + 1} ${lang === 'es' ? 'de' : 'of'} ${items.length}` : undefined}
              >
                {item.kind === 'gif' ? (
                  <>
                    <div className="gallery-gif-stage" style={{ aspectRatio: `${item.width} / ${item.height}` }}>
                      {isPlaying ? (
                        <img
                          src={item.src}
                          alt={item.alt}
                          width={item.width}
                          height={item.height}
                          loading="lazy"
                          decoding="async"
                          onError={() => {
                            setPlayingGifs((current) => {
                              const next = new Set(current);
                              next.delete(index);
                              return next;
                            });
                            setGifErrors((current) => new Set(current).add(index));
                          }}
                        />
                      ) : (
                        <div
                          className="gallery-gif-placeholder"
                          role="img"
                          aria-label={`${labels.gifAvailable}: ${item.alt}`}
                        >
                          <span>GIF</span>
                          <strong>{labels.gifReady}</strong>
                        </div>
                      )}
                    </div>
                    <div className="gallery-gif-controls">
                      <button
                        className="button button-secondary gallery-gif-toggle"
                        type="button"
                        aria-pressed={isPlaying}
                        onClick={() => toggleGif(index)}
                      >
                        {isPlaying ? labels.stopGif : labels.playGif}
                      </button>
                      <a className="text-link" href={item.src} target="_blank" rel="noopener noreferrer">
                        {labels.openGif}
                      </a>
                      {hasGifError && <p className="gallery-gif-error" role="status">{labels.gifError}</p>}
                    </div>
                  </>
                ) : (
                  <a
                    className="gallery-image"
                    href={item.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-media-viewer-trigger
                    aria-label={`${labels.openImage}: ${item.alt}`}
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                )}
                <figcaption>{item.caption}</figcaption>
              </figure>
            );
          })}
        </div>
      </div>
      {isCarousel && (
        <div className="gallery-carousel-controls" role="group" aria-label={labels.carouselName}>
          <button
            className="button button-secondary"
            type="button"
            aria-label={labels.previous}
            onClick={() => goToSlide(activeSlide - 1)}
            disabled={activeSlide === 0}
          >
            ←
          </button>
          <p className="gallery-carousel-position" aria-live="polite" aria-atomic="true">
            {activeSlide + 1} {lang === 'es' ? 'de' : 'of'} {items.length}
          </p>
          <button
            className="button button-secondary"
            type="button"
            aria-label={labels.next}
            onClick={() => goToSlide(activeSlide + 1)}
            disabled={activeSlide === items.length - 1}
          >
            →
          </button>
        </div>
      )}
      <ResponsiveMediaViewer rootId={rootId} title={title} lang={lang} />
    </div>
  );
}
