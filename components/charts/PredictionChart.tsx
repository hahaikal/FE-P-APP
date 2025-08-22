'use client';

interface PredictionChartProps {
  homeTeam: string;
  awayTeam: string;
  probabilities: {
    home: number;
    draw: number;
    away: number;
  };
}

export function PredictionChart({ homeTeam, awayTeam, probabilities }: PredictionChartProps) {
  const total = probabilities.home + probabilities.draw + probabilities.away;
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-900">{homeTeam}</span>
            <span className="text-sm font-bold text-gray-900">{probabilities.home}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(probabilities.home / total) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Draw */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-900">Seri</span>
            <span className="text-sm font-bold text-gray-900">{probabilities.draw}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-yellow-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(probabilities.draw / total) * 100}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-900">{awayTeam}</span>
            <span className="text-sm font-bold text-gray-900">{probabilities.away}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-red-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(probabilities.away / total) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-6 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          <span className="text-xs text-gray-600">Home Win</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span className="text-xs text-gray-600">Draw</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-xs text-gray-600">Away Win</span>
        </div>
      </div>
    </div>
  );
}