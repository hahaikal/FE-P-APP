import { MatchCard } from '@/components/matches/MatchCard';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Calendar, TrendingUp } from 'lucide-react';

// Dummy data for upcoming matches
const upcomingMatches = [
  {
    id: '1',
    homeTeam: 'Real Madrid',
    awayTeam: 'Barcelona',
    homeTeamLogo: '🏆',
    awayTeamLogo: '🔵',
    kickoffTime: 'Sabtu, 19 Juli 2025 - 21:00 WIB',
    venue: 'Santiago Bernabéu',
    competition: 'La Liga',
    status: 'upcoming'
  },
  {
    id: '2',
    homeTeam: 'Manchester City',
    awayTeam: 'Liverpool',
    homeTeamLogo: '💙',
    awayTeamLogo: '🔴',
    kickoffTime: 'Minggu, 20 Juli 2025 - 23:30 WIB',
    venue: 'Etihad Stadium',
    competition: 'Premier League',
    status: 'upcoming'
  },
  {
    id: '3',
    homeTeam: 'Bayern Munich',
    awayTeam: 'Borussia Dortmund',
    homeTeamLogo: '🔴',
    awayTeamLogo: '🟡',
    kickoffTime: 'Senin, 21 Juli 2025 - 02:30 WIB',
    venue: 'Allianz Arena',
    competition: 'Bundesliga',
    status: 'upcoming'
  },
  {
    id: '4',
    homeTeam: 'PSG',
    awayTeam: 'Marseille',
    homeTeamLogo: '🔵',
    awayTeamLogo: '⚪',
    kickoffTime: 'Selasa, 22 Juli 2025 - 02:00 WIB',
    venue: 'Parc des Princes',
    competition: 'Ligue 1',
    status: 'upcoming'
  },
  {
    id: '5',
    homeTeam: 'Juventus',
    awayTeam: 'AC Milan',
    homeTeamLogo: '⚫',
    awayTeamLogo: '🔴',
    kickoffTime: 'Rabu, 23 Juli 2025 - 02:45 WIB',
    venue: 'Allianz Stadium',
    competition: 'Serie A',
    status: 'upcoming'
  },
  {
    id: '6',
    homeTeam: 'Chelsea',
    awayTeam: 'Arsenal',
    homeTeamLogo: '🔵',
    awayTeamLogo: '🔴',
    kickoffTime: 'Kamis, 24 Juli 2025 - 02:00 WIB',
    venue: 'Stamford Bridge',
    competition: 'Premier League',
    status: 'upcoming'
  }
];

export default function HomePage() {
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

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{upcomingMatches.length}</p>
              <p className="text-sm text-gray-600">Pertandingan Tersedia</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">87%</p>
              <p className="text-sm text-gray-600">Akurasi Prediksi</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <div className="w-6 h-6 bg-orange-600 rounded-full"></div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">5</p>
              <p className="text-sm text-gray-600">Liga Teratas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Matches Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Pertandingan Mendatang</h2>
          <Badge variant="secondary" className="text-sm">
            {upcomingMatches.length} Pertandingan
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </div>
    </Container>
  );
}