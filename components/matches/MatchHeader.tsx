import { Badge } from '@/components/ui/badge';
import { Calendar, Trophy } from 'lucide-react';
import { Match } from '@/types';
import { getTeamLogo, mapSportKeyToCompetition } from '@/lib/utils';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface MatchHeaderProps {
  match: Match;
}

export function MatchHeader({ match }: MatchHeaderProps) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
      <div className="flex items-center justify-center mb-6">
        <Badge className="bg-blue-100 text-blue-700 text-sm px-4 py-2">
          <Trophy className="w-4 h-4 mr-2" />
          {mapSportKeyToCompetition(match.sport_key)}
        </Badge>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col items-center flex-1">
          <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center text-4xl mb-3">
            {getTeamLogo(match.home_team)}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 text-center">{match.home_team}</h2>
          <p className="text-sm text-gray-500">Home</p>
        </div>

        <div className="px-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold text-gray-400">VS</span>
          </div>
        </div>

        <div className="flex flex-col items-center flex-1">
          <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center text-4xl mb-3">
            {getTeamLogo(match.away_team)}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 text-center">{match.away_team}</h2>
          <p className="text-sm text-gray-500">Away</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{format(new Date(match.commence_time), "EEEE, dd MMMM yyyy - HH:mm 'WIB'", { locale: id })}</span>
        </div>
      </div>
    </div>
  );
}