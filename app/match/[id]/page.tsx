import MatchDetailClient from './MatchDetailClient';

export default async function MatchDetailPage({ params }: { params: { id: string } }) {
  return <MatchDetailClient id={params.id} />;
}
