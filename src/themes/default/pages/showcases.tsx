import { Showcases as ShowcasesType } from '@/shared/types/blocks/landing';
import { Showcases } from '@/themes/default/blocks';

export default async function ShowcasesPage({
  locale,
  showcases,
}: {
  locale?: string;
  showcases: ShowcasesType;
}) {
  return (
    <>
      <Showcases showcases={showcases} />
    </>
  );
}
