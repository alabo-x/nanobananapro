import { ImageGenerator } from '@/shared/blocks/generator';
import { Landing } from '@/shared/types/blocks/landing';
import {
  FAQ,
  Features,
  Hero,
  Showcase,
  Testimonials,
} from '@/themes/default/blocks';

export default async function LandingPage({
  locale,
  page,
}: {
  locale?: string;
  page: Landing;
}) {
  return (
    <>
      {page.hero && <Hero hero={page.hero} />}
      <ImageGenerator generator={page.generator} />
      {page.features && <Features features={page.features} />}
      {page.testimonials && <Testimonials testimonials={page.testimonials} />}
      {page.showcase && <Showcase showcase={page.showcase} />}
      {page.faq && <FAQ faq={page.faq} />}
    </>
  );
}
