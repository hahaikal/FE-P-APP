'use client';

import { useState, useEffect } from 'react';
import { MatchCard } from '@/components/matches/MatchCard';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Calendar, TrendingUp, AlertTriangle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import api from '@/lib/api';
import { Match } from '@/types';

export default function HomePage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatches = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get<Match[]>('/api/v1/matches/');
        // Filter pertandingan yang belum dimulai dan urutkan
        const upcoming = response.data
          .filter(match => new Date(match.commence_time) > new Date())
          .sort((a, b) => new Date(a.commence_time).getTime() - new Date(b.commence_time).getTime());
        setMatches(upcoming);
      } catch (err) {
        setError('Gagal memuat data pertandingan. Silakan coba lagi nanti.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMatches();
  }, []);

  return (
    <Container className="py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
          <TrendingUp className="w-4 h-4" />
          Prediksi Akurat Berdasarkan AI
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Prediksi Pertandingan
          <span className="text-blue-600 block">Mendatang</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Dapatkan prediksi pertandingan sepak bola terbaik dengan analisis data mendalam 
          dan teknologi machine learning terdepan.
        </p>
      </div>

      {/* Matches Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Pertandingan Mendatang</h2>
          {!isLoading && !error && (
            <Badge variant="secondary" className="text-sm">
              {matches.length} Pertandingan
            </Badge>
          )}
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-64 rounded-2xl" />)}
          </div>
        ) : error ? (
          <div className="text-center bg-red-50 text-red-700 p-8 rounded-2xl">
            <AlertTriangle className="mx-auto h-12 w-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Terjadi Kesalahan</h3>
            <p>{error}</p>
          </div>
        ) : matches.length === 0 ? (
           <div className="text-center bg-gray-50 text-gray-600 p-8 rounded-2xl">
            <Calendar className="mx-auto h-12 w-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Tidak Ada Pertandingan</h3>
            <p>Saat ini tidak ada pertandingan mendatang yang tersedia.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}