'use client';

import Image from 'next/image';
import Link from 'next/link';

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
  return (
    <section
      id={showcase.id}
      className={cn('py-16 md:py-24', showcase.className, className)}
    >
      <div className="container space-y-8 md:space-y-16">
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

        {/* Showcase Items Grid */}
        <ScrollAnimation delay={0.2}>
          <div className="mx-auto grid gap-8 md:grid-cols-2 lg:gap-12">
            {showcase.items?.map((item, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  {item.image && (
                    <Image
                      src={item.image.src}
                      alt={item.image.alt || item.title || 'Showcase image'}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="mb-2 text-lg font-semibold">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
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
