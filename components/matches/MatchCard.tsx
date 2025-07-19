'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  kickoffTime: string;
  venue: string;
  competition: string;
  status: string;
}

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
      {/* Competition Badge */}
      <div className="flex items-center justify-between mb-4">
        <Badge variant="secondary" className="text-xs">
          {match.competition}
        </Badge>
        <div className="text-xs text-gray-500">#{match.id}</div>
      </div>

      {/* Teams */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          {/* Home Team */}
          <div className="flex items-center gap-3 flex-1">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
              {match.homeTeamLogo}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-lg">{match.homeTeam}</p>
              <p className="text-sm text-gray-500">Home</p>
            </div>
          </div>

          {/* VS */}
          <div className="px-4">
            <div className="text-sm font-medium text-gray-400">VS</div>
          </div>

          {/* Away Team */}
          <div className="flex items-center gap-3 flex-1 text-right">
            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-lg">{match.awayTeam}</p>
              <p className="text-sm text-gray-500">Away</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
              {match.awayTeamLogo}
            </div>
          </div>
        </div>
      </div>

      {/* Match Info */}
      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{match.kickoffTime}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{match.venue}</span>
        </div>
      </div>

      {/* Action Button */}
      <Link href={`/match/${match.id}`}>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white group">
          Lihat Prediksi
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Link>
    </div>
  );
}