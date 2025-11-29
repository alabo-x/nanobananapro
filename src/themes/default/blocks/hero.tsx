'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { SmartIcon } from '@/shared/blocks/common';
import { AnimatedGridPattern } from '@/shared/components/ui/animated-grid-pattern';
import { Button } from '@/shared/components/ui/button';
import { Highlighter } from '@/shared/components/ui/highlighter';
import { cn } from '@/shared/lib/utils';
import { Hero as HeroType } from '@/shared/types/blocks/landing';

const createFadeInVariant = (delay: number) => ({
  initial: {
    opacity: 0,
    y: 20,
    filter: 'blur(6px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
  },
  transition: {
    duration: 0.6,
    delay,
    ease: [0.22, 1, 0.36, 1] as const,
  },
});

export function Hero({
  hero,
  className,
}: {
  hero: HeroType;
  className?: string;
}) {
  const highlightText = hero.highlight_text ?? '';
  let texts = null;
  if (highlightText) {
    texts = hero.title?.split(highlightText, 2);
  }

  return (
    <>
      <section
        id={hero.id}
        className={`min-h-[calc(100vh-64px)] pt-14 lg:pt-18 pb-16 md:pb-24 flex flex-col items-center justify-center ${hero.className} ${className}`}
      >
        {hero.announcement && (
          <motion.div {...createFadeInVariant(0)}>
            <Link
              href={hero.announcement.url || ''}
              target={hero.announcement.target || '_self'}
              className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto mb-4 flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
            >
              <span className="text-foreground text-sm">
                {hero.announcement.title}
              </span>
              <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>

              <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                  <span className="flex size-6">
                    <ArrowRight className="m-auto size-3" />
                  </span>
                  <span className="flex size-6">
                    <ArrowRight className="m-auto size-3" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        <div className="container">
          <div className="relative mx-auto max-w-5xl text-center">
          <motion.div {...createFadeInVariant(0.15)}>
            {texts && texts.length > 0 ? (
              <h1 className="text-foreground text-3xl font-semibold text-balance sm:text-5xl lg:text-7xl">
                {texts[0]}
                <Highlighter action="underline" color="#FF9800">
                  {highlightText}
                </Highlighter>
                {texts[1]}
              </h1>
            ) : (
              <h1 className="text-foreground text-3xl font-semibold text-balance sm:text-5xl lg:text-7xl">
                {hero.title}
              </h1>
            )}
          </motion.div>

          <motion.p
            {...createFadeInVariant(0.3)}
            className="text-muted-foreground mt-6 mb-10 text-base sm:text-xl text-balance"
            dangerouslySetInnerHTML={{ __html: hero.description ?? '' }}
          />

          {hero.buttons && (
            <motion.div
              {...createFadeInVariant(0.45)}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              {hero.buttons.map((button, idx) => (
                <Button
                  asChild
                  size={button.size || 'lg'}
                  variant={button.variant || 'default'}
                  className="w-full sm:w-auto px-6 text-base"
                  key={idx}
                >
                  <Link
                    href={button.url ?? ''}
                    target={button.target ?? '_self'}
                  >
                    {button.icon && <SmartIcon name={button.icon as string} />}
                    <span>{button.title}</span>
                  </Link>
                </Button>
              ))}
            </motion.div>
          )}

          {hero.feature_tags && hero.feature_tags.length > 0 && (
            <motion.div
              {...createFadeInVariant(0.6)}
              className="mt-10 flex flex-wrap items-center justify-center gap-6"
            >
              {hero.feature_tags.map((tag, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  {tag.icon && (
                    <SmartIcon
                      name={tag.icon}
                      className="size-5 text-primary"
                    />
                  )}
                  <span className="text-sm font-medium">{tag.title}</span>
                </div>
              ))}
            </motion.div>
          )}
          </div>
        </div>
      </section>

      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          '[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]',
          'inset-x-0 inset-y-[-30%] h-[200%] skew-y-12'
        )}
      />
    </>
  );
}
