import React, { useState, useEffect } from 'react';
import { fetchMatches } from '../services/apiService';
import MatchCard from '../components/MatchCard';

const MatchList = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMatches = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMatches();
        setMatches(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadMatches();
  }, []);

  if (loading) {
    // Skeleton loader sederhana
    return <div className="loader">Memuat Jadwal Pertandingan...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="match-list-container">
      <h2>Jadwal & Prediksi</h2>
      {matches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  );
};

export default MatchList;
