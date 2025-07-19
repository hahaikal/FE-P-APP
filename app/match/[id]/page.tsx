import MatchDetailClient from './MatchDetailClient';

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' }
  ];
}

export default async function MatchDetailPage({ params }: { params: { id: string } }) {
  const awaitedParams = await params;
  return <MatchDetailClient id={awaitedParams.id} />;
}
