'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Copy, Check } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { ScrollAnimation } from '@/shared/components/ui/scroll-animation';
import { cn } from '@/shared/lib/utils';
import { Showcase as ShowcaseType } from '@/shared/types/blocks/landing';

export function Showcase({
  showcase,
  className,
}: {
  showcase: ShowcaseType;
  className?: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [animationKey, setAnimationKey] = useState(0); // 强制重新挂载动画元素
  const [copied, setCopied] = useState(false);
  const items = showcase.items || [];
  const totalItems = items.length;

  // Touch swipe support
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50;

  // 动画完成后重置状态
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setSlideDirection(null);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const goToPrevious = useCallback(() => {
    if (isAnimating) return;
    setSlideDirection('right');
    setAnimationKey(k => k + 1);
    setCurrentIndex(prev => (prev === 0 ? totalItems - 1 : prev - 1));
    setIsAnimating(true);
  }, [totalItems, isAnimating]);

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setSlideDirection('left');
    setAnimationKey(k => k + 1);
    setCurrentIndex(prev => (prev === totalItems - 1 ? 0 : prev + 1));
    setIsAnimating(true);
  }, [totalItems, isAnimating]);

  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === currentIndex) return;
    setSlideDirection(index > currentIndex ? 'left' : 'right');
    setAnimationKey(k => k + 1);
    setCurrentIndex(index);
    setIsAnimating(true);
  }, [currentIndex, isAnimating]);

  // Touch event handlers
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  }, [goToNext, goToPrevious]);

  const currentItem = items[currentIndex];

  // Copy prompt to clipboard
  const copyPrompt = useCallback(async () => {
    if (!currentItem?.description) return;
    try {
      await navigator.clipboard.writeText(currentItem.description);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = currentItem.description;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [currentItem?.description]);

  if (totalItems === 0) return null;

  // 根据滑动方向选择动画类名
  const slideAnimationClass = slideDirection === 'left'
    ? 'animate-slide-in-from-right'
    : 'animate-slide-in-from-left';

  return (
    <section
      id={showcase.id}
      className={cn('py-16 md:py-24', showcase.className, className)}
    >

      <div className="container space-y-8 md:space-y-12">
        {/* Header */}
        <ScrollAnimation>
          <div className="mx-auto max-w-2xl text-center text-balance">
            <h2 className="text-foreground mb-4 text-3xl font-semibold tracking-tight md:text-4xl">
              {showcase.heading}
            </h2>
            <p className="text-muted-foreground text-lg">
              {showcase.description}
            </p>
          </div>
        </ScrollAnimation>

        {/* Carousel */}
        <ScrollAnimation delay={0.2}>
          <div className="mx-auto max-w-5xl">
            {/* Image Container */}
            <div
              className="relative"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {/* Slide Track */}
              <div className="relative aspect-video overflow-hidden rounded-xl border bg-card shadow-lg">
                {/* 当前图片 */}
                <div
                  key={animationKey}
                  className={cn(
                    "absolute inset-0",
                    isAnimating && slideAnimationClass
                  )}
                >
                  {currentItem?.image && (
                    <Image
                      src={currentItem.image.src}
                      alt={currentItem.image.alt || currentItem.title || 'Showcase image'}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
                      priority
                    />
                  )}
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={goToPrevious}
                disabled={isAnimating}
                className="absolute left-2 md:-left-14 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-background/80 backdrop-blur-sm border shadow-md hover:bg-background transition-colors disabled:opacity-50"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
              </button>
              <button
                onClick={goToNext}
                disabled={isAnimating}
                className="absolute right-2 md:-right-14 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-background/80 backdrop-blur-sm border shadow-md hover:bg-background transition-colors disabled:opacity-50"
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
              </button>
            </div>

            {/* Title */}
            <div className="mt-6 text-center">
              <h3 className="text-xl md:text-2xl font-semibold">
                {currentItem?.title}
              </h3>
            </div>

            {/* Prompt */}
            <div className="mt-4 rounded-lg bg-muted/50 p-4 md:p-6">
              <p className="text-sm md:text-base text-muted-foreground italic leading-relaxed mb-4">
                {currentItem?.description}
              </p>
              <button
                onClick={copyPrompt}
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors",
                  copied
                    ? "bg-primary/10 text-primary"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                )}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy Prompt</span>
                  </>
                )}
              </button>
            </div>

            {/* Dot Indicators */}
            <div className="mt-6 flex justify-center gap-2">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  disabled={isAnimating}
                  className={cn(
                    'h-2.5 w-2.5 rounded-full transition-all disabled:cursor-not-allowed',
                    idx === currentIndex
                      ? 'bg-primary w-8'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  )}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Slide Counter */}
            <div className="mt-4 text-center text-sm text-muted-foreground">
              {currentIndex + 1} / {totalItems}
            </div>
          </div>
        </ScrollAnimation>

        {/* CTA */}
        {showcase.cta && (
          <ScrollAnimation delay={0.4}>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-muted-foreground mb-6 text-lg">
                {showcase.cta.text}
              </p>
              <Button asChild size="lg">
                <Link href={showcase.cta.url || '/#generator'}>
                  {showcase.cta.button}
                </Link>
              </Button>
            </div>
          </ScrollAnimation>
        )}
      </div>
    </section>
  );
}
