import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPrediction } from '../services/apiService';

const PredictionBar = ({ prediction }) => {
  const { home_win_percentage, draw_percentage, away_win_percentage } = prediction;
  return (
    <div className="flex h-8 rounded-md overflow-hidden font-bold text-sm mt-4">
      <div className="flex items-center justify-center bg-[--bar-home] text-white" style={{ width: `${home_win_percentage}%` }}>
        {home_win_percentage.toFixed(1)}%
      </div>
      <div className="flex items-center justify-center bg-[--bar-draw] text-white" style={{ width: `${draw_percentage}%` }}>
        {draw_percentage.toFixed(1)}%
      </div>
      <div className="flex items-center justify-center bg-[--bar-away] text-white" style={{ width: `${away_win_percentage}%` }}>
        {away_win_percentage.toFixed(1)}%
      </div>
    </div>
  );
};

const MatchCard = ({ match }) => {
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPrediction = async () => {
      try {
        setIsLoading(true);
        const predictionData = await fetchPrediction(match.id);
        setPrediction(predictionData);
      } catch (error) {
        // Biarkan kosong agar tidak menampilkan error di setiap card,
        // cukup tampilkan status loading yang berhenti
        console.error(`Gagal mengambil prediksi untuk match ${match.id}:`, error);
      } finally {
        setIsLoading(false);
      }
    };
    getPrediction();
  }, [match.id]);

  return (
    <Link to={`/match/${match.id}`} className="block no-underline">
      <div className="bg-[--card-bg] rounded-xl p-6 mb-6 shadow-lg border-l-4 border-[--bar-home] hover:scale-105 transition-transform duration-200">
        <p className="text-sm text-gray-300 mb-4 text-center font-semibold">{match.league}</p>
        <div className="flex justify-between items-center">
          <div className="w-2/5 text-center"><span className="text-lg font-bold">{match.home_team}</span></div>
          <span className="text-xl font-bold text-[--text-primary]">VS</span>
          <div className="w-2/5 text-center"><span className="text-lg font-bold">{match.away_team}</span></div>
        </div>
        {isLoading && <div className="skeleton-bar mt-4"></div>}
        {!isLoading && prediction && <PredictionBar prediction={prediction} />}
        {!isLoading && !prediction && <p className="text-center text-sm text-gray-400 mt-4">Prediksi belum tersedia</p>}
      </div>
    </Link>
  );
};

export default MatchCard;