import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMatchDetails } from '../services/apiService';

const MatchDetail = () => {
  const { matchId } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMatchDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchMatchDetails(matchId);
        setMatch(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadMatchDetails();
  }, [matchId]);

  if (loading) return <div className="loader">Memuat Detail Pertandingan...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!match) return <div className="text-center">Data pertandingan tidak ditemukan.</div>;

  const { home_team, away_team, prediction, odds_movement, league } = match;

  return (
    <div className="bg-[--secondary-bg] p-8 rounded-lg">
      <Link to="/" className="text-[--text-primary] hover:underline mb-6 block">&larr; Kembali ke Daftar</Link>
      
      <div className="text-center mb-6">
        <p className="text-gray-400">{league}</p>
        <h2 className="text-4xl font-bold">{home_team} vs {away_team}</h2>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-3 text-center text-[--text-primary]">Prediksi Hasil Akhir</h3>
        <div className="flex h-10 rounded-lg overflow-hidden font-bold text-base">
            <div className="flex items-center justify-center bg-[--bar-home] text-white" style={{ width: `${prediction.home_win_percentage}%` }}>{prediction.home_win_percentage.toFixed(1)}%</div>
            <div className="flex items-center justify-center bg-[--bar-draw] text-white" style={{ width: `${prediction.draw_percentage}%` }}>{prediction.draw_percentage.toFixed(1)}%</div>
            <div className="flex items-center justify-center bg-[--bar-away] text-white" style={{ width: `${prediction.away_win_percentage}%` }}>{prediction.away_win_percentage.toFixed(1)}%</div>
        </div>
      </div>
      
      <div>
        <h3 className="text-2xl font-semibold mb-4 text-center text-[--text-primary]">Data Pergerakan Odds</h3>
        <table className="w-full text-left table-auto bg-[--card-bg] rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-[--primary-bg]">
              <th className="p-4">Waktu</th>
              <th className="p-4">Odds Tuan Rumah</th>
              <th className="p-4">Odds Seri</th>
              <th className="p-4">Odds Tandang</th>
            </tr>
          </thead>
          <tbody>
            {odds_movement.map((odds) => (
              <tr key={odds.time_marker} className="border-b border-gray-700 last:border-b-0">
                <td className="p-4 font-bold">{odds.time_marker}</td>
                <td className="p-4">{odds.home_odds.toFixed(2)}</td>
                <td className="p-4">{odds.draw_odds.toFixed(2)}</td>
                <td className="p-4">{odds.away_odds.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MatchDetail;