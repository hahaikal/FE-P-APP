import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Trophy } from 'lucide-react';

interface MatchHeaderProps {
  match: {
    homeTeam: string;
    awayTeam: string;
    homeTeamLogo: string;
    awayTeamLogo: string;
    kickoffTime: string;
    venue: string;
    competition: string;
  };
}

export function MatchHeader({ match }: MatchHeaderProps) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
      {/* Competition Badge */}
      <div className="flex items-center justify-center mb-6">
        <Badge className="bg-blue-100 text-blue-700 text-sm px-4 py-2">
          <Trophy className="w-4 h-4 mr-2" />
          {match.competition}
        </Badge>
      </div>

      {/* Teams */}
      <div className="flex items-center justify-between mb-6">
        {/* Home Team */}
        <div className="flex flex-col items-center flex-1">
          <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center text-4xl mb-3">
            {match.homeTeamLogo}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 text-center">{match.homeTeam}</h2>
          <p className="text-sm text-gray-500">Home</p>
        </div>

        {/* VS */}
        <div className="px-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold text-gray-400">VS</span>
          </div>
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center flex-1">
          <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center text-4xl mb-3">
            {match.awayTeamLogo}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 text-center">{match.awayTeam}</h2>
          <p className="text-sm text-gray-500">Away</p>
        </div>
      </div>

      {/* Match Details */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{match.kickoffTime}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>{match.venue}</span>
        </div>
      </div>
    </div>
  );
}