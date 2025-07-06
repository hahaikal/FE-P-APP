import React from 'react';

const MatchCard = ({ match }) => {
  const { league, home_team, away_team, prediction } = match;
  const { home_win_percentage, draw_percentage, away_win_percentage } = prediction;

  return (
    <div className="bg-[--card-bg] rounded-xl p-6 mb-6 shadow-lg border-l-4 border-[--bar-home]">
      <p className="text-sm text-gray-300 mb-4 text-center font-semibold">{league}</p>
      
      <div className="flex justify-between items-center mb-6">
        <div className="w-2/5 text-center">
          <span className="text-lg font-bold">{home_team}</span>
        </div>
        <span className="text-xl font-bold text-[--text-primary]">VS</span>
        <div className="w-2/5 text-center">
          <span className="text-lg font-bold">{away_team}</span>
        </div>
      </div>
      
      <div>
        <div className="flex h-8 rounded-md overflow-hidden font-bold text-sm">
          <div 
            className="flex items-center justify-center bg-[--bar-home] text-white" 
            style={{ width: `${home_win_percentage}%` }}
          >
            {home_win_percentage.toFixed(1)}%
          </div>
          <div 
            className="flex items-center justify-center bg-[--bar-draw] text-white" 
            style={{ width: `${draw_percentage}%` }}
          >
            {draw_percentage.toFixed(1)}%
          </div>
          <div 
            className="flex items-center justify-center bg-[--bar-away] text-white" 
            style={{ width: `${away_win_percentage}%` }}
          >
            {away_win_percentage.toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;