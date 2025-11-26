import { PageContent } from '@/shared/models/post';
import { PageDetail } from '@/themes/default/blocks';

export default async function PageDetailPage({
  locale,
  post,
}: {
  locale?: string;
  post: PageContent;
}) {
  return <PageDetail post={post} />;
}
