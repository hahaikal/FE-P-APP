'use client';

import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PredictionChart } from '@/components/charts/PredictionChart';
import { MatchHeader } from '@/components/matches/MatchHeader';
import { PredictionStats } from '@/components/matches/PredictionStats';
import { ArrowLeft, Calendar, MapPin, Trophy } from 'lucide-react';
import Link from 'next/link';

interface MatchDetailClientProps {
  id: string;
}

// Dummy data for match details and predictions
const getMatchData = (id: string) => {
  const matchesData: { [key: string]: any } = {
    '1': {
      id: '1',
      homeTeam: 'Real Madrid',
      awayTeam: 'Barcelona',
      homeTeamLogo: '🏆',
      awayTeamLogo: '🔵',
      kickoffTime: 'Sabtu, 19 Juli 2025 - 21:00 WIB',
      venue: 'Santiago Bernabéu',
      competition: 'La Liga',
      prediction: {
        winner: 'Real Madrid',
        confidence: 'Tinggi',
        probabilities: {
          home: 65,
          draw: 20,
          away: 15
        }
      },
      stats: {
        accuracy: 87,
        dataPoints: 150,
        lastUpdated: '2 jam yang lalu'
      }
    },
    '2': {
      id: '2',
      homeTeam: 'Manchester City',
      awayTeam: 'Liverpool',
      homeTeamLogo: '💙',
      awayTeamLogo: '🔴',
      kickoffTime: 'Minggu, 20 Juli 2025 - 23:30 WIB',
      venue: 'Etihad Stadium',
      competition: 'Premier League',
      prediction: {
        winner: 'Seri',
        confidence: 'Sedang',
        probabilities: {
          home: 35,
          draw: 40,
          away: 25
        }
      },
      stats: {
        accuracy: 82,
        dataPoints: 142,
        lastUpdated: '1 jam yang lalu'
      }
    }
  };

  return matchesData[id] || matchesData['1'];
};

export default function MatchDetailClient({ id }: MatchDetailClientProps) {
  const match = getMatchData(id);

  return (
    <Container className="py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Dashboard
          </Button>
        </Link>
      </div>

      {/* Match Header */}
      <MatchHeader match={match} />

      {/* Main Prediction */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white mb-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Prediksi Hasil</h2>
          <div className="text-4xl font-bold mb-2">
            {match.prediction.winner.toUpperCase()}
            {match.prediction.winner === 'Seri' ? '' : ' MENANG'}
          </div>
          <Badge 
            variant="secondary" 
            className={`text-sm ${
              match.prediction.confidence === 'Tinggi' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-yellow-100 text-yellow-700'
            }`}
          >
            Confidence: {match.prediction.confidence}
          </Badge>
        </div>
      </div>

      {/* Prediction Chart and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Probabilitas Hasil</h3>
          <PredictionChart 
            homeTeam={match.homeTeam}
            awayTeam={match.awayTeam}
            probabilities={match.prediction.probabilities}
          />
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Statistik Prediksi</h3>
          <PredictionStats stats={match.stats} />
        </div>
      </div>

      {/* Match Information */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Informasi Pertandingan</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Waktu Kick-off</p>
              <p className="font-medium text-gray-900">{match.kickoffTime}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Venue</p>
              <p className="font-medium text-gray-900">{match.venue}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Trophy className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Kompetisi</p>
              <p className="font-medium text-gray-900">{match.competition}</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
