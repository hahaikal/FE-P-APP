'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowRight } from 'lucide-react';
import { Match } from '@/types';
import { getTeamLogo, mapSportKeyToCompetition } from '@/lib/utils';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <Badge variant="secondary" className="text-xs">
          {mapSportKeyToCompetition(match.sport_key)}
        </Badge>
        <div className="text-xs text-gray-500">#{match.id}</div>
      </div>

      <div className="flex-1 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
              {getTeamLogo(match.home_team)}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-lg">{match.home_team}</p>
              <p className="text-sm text-gray-500">Home</p>
            </div>
          </div>
          <div className="px-4 text-sm font-medium text-gray-400">VS</div>
          <div className="flex items-center gap-3 flex-1 text-right">
            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-lg">{match.away_team}</p>
              <p className="text-sm text-gray-500">Away</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
              {getTeamLogo(match.away_team)}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{format(new Date(match.commence_time), "EEEE, dd MMM yyyy - HH:mm 'WIB'", { locale: id })}</span>
        </div>
      </div>

      <Link href={`/match/${match.id}`}>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white group">
          Lihat Prediksi
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Link>
    </div>
  );
}