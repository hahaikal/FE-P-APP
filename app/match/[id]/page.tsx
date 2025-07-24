import MatchDetailClient from './MatchDetailClient';

export default async function MatchDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return <MatchDetailClient id={id} />;
}
