import { Badge } from '@/components/ui/badge';
import { TrendingUp, Database, Clock } from 'lucide-react';

interface PredictionStatsProps {
  stats: {
    accuracy: number;
    dataPoints: number;
    lastUpdated: string;
  };
}

export function PredictionStats({ stats }: PredictionStatsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">{stats.accuracy}%</p>
          <p className="text-sm text-gray-600">Akurasi Model</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
          <Database className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">{stats.dataPoints}</p>
          <p className="text-sm text-gray-600">Data Points</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
          <Clock className="w-6 h-6 text-orange-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">Terakhir Diperbarui</p>
          <p className="text-sm text-gray-600">{stats.lastUpdated}</p>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <div className="flex gap-2">
          <Badge className="bg-green-100 text-green-700">
            Real-time
          </Badge>
          <Badge className="bg-blue-100 text-blue-700">
            AI Powered
          </Badge>
        </div>
      </div>
    </div>
  );
}