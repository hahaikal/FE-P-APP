'use client';

import { useState, useEffect, useCallback } from 'react';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PredictionChart } from '@/components/charts/PredictionChart';
import { MatchHeader } from '@/components/matches/MatchHeader';
import { PredictionStats } from '@/components/matches/PredictionStats';
import { ArrowLeft, Calendar, Trophy, Loader2, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/api';
import { Match, Prediction } from '@/types';
import { mapSportKeyToCompetition } from '@/lib/utils';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';

interface MatchDetailClientProps {
  id: string;
}

export default function MatchDetailClient({ id }: MatchDetailClientProps) {
  const [match, setMatch] = useState<Match | null>(null);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch both match details and prediction data in parallel
      const [matchResponse, predictionResponse] = await Promise.all([
        api.get<Match[]>(`/api/v1/matches/`),
        api.get<Prediction>(`/api/v1/matches/${id}/prediction`)
      ]);
      
      const foundMatch = matchResponse.data.find(m => m.id === parseInt(id, 10));

      if (!foundMatch) {
        throw new Error('Pertandingan tidak ditemukan.');
      }

      setMatch(foundMatch);
      setPrediction(predictionResponse.data);

    } catch (err: any) {
      if (err.response?.status === 503) {
          setError('Layanan prediksi saat ini tidak tersedia. Silakan coba lagi nanti.');
      } else {
          setError('Gagal memuat data detail pertandingan.');
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const mapOutcomeToText = (outcome: string) => {
    const map = {
      HOME_WIN: `${match?.home_team || 'Tuan Rumah'} MENANG`,
      AWAY_WIN: `${match?.away_team || 'Tamu'} MENANG`,
      DRAW: 'SERI',
    };
    return map[outcome as keyof typeof map] || 'N/A';
  };

  if (isLoading) {
    return (
      <Container className="py-8 flex justify-center items-center h-[60vh]">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </Container>
    );
  }

  if (error || !match || !prediction) {
    return (
      <Container className="py-8">
        <div className="text-center bg-red-50 text-red-700 p-8 rounded-2xl">
          <AlertTriangle className="mx-auto h-12 w-12 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Terjadi Kesalahan</h3>
          <p>{error || 'Data tidak dapat ditemukan.'}</p>
          <Link href="/">
            <Button variant="outline" className="mt-6 gap-2">
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Dashboard
            </Button>
          </Link>
        </div>
      </Container>
    );
  }
  
  // Dummy stats data as it's not from API
  const dummyStats = {
    accuracy: 87,
    dataPoints: 150,
    lastUpdated: '2 jam yang lalu'
  };

  return (
    <Container className="py-8">
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Dashboard
          </Button>
        </Link>
      </div>

      <MatchHeader match={match} />

      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white mb-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Prediksi Hasil</h2>
          <div className="text-4xl font-bold mb-2">
            {mapOutcomeToText(prediction.predicted_outcome)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Probabilitas Hasil</h3>
          <PredictionChart 
            homeTeam={match.home_team}
            awayTeam={match.away_team}
            probabilities={{
              home: Math.round(prediction.probabilities.home_win * 100),
              draw: Math.round(prediction.probabilities.draw * 100),
              away: Math.round(prediction.probabilities.away_win * 100),
            }}
          />
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Statistik Prediksi</h3>
          <PredictionStats stats={dummyStats} />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Informasi Pertandingan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Waktu Kick-off</p>
              <p className="font-medium text-gray-900">{format(new Date(match.commence_time), "EEEE, dd MMMM yyyy - HH:mm 'WIB'", { locale: localeId })}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Trophy className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Kompetisi</p>
              <p className="font-medium text-gray-900">{mapSportKeyToCompetition(match.sport_key)}</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}