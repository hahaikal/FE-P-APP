export interface OddsSnapshot {
  id: number;
  bookmaker: string;
  price_home: number;
  price_draw: number;
  price_away: number;
  timestamp: string; // Mengganti snapshot_time dengan timestamp
}

export interface Match {
  id: number;
  api_id: string;
  sport_key: string;
  home_team: string;
  away_team: string;
  commence_time: string;
  result_home_score: number | null;
  result_away_score: number | null;
  odds_snapshots: OddsSnapshot[];
}

export interface StatusOverview {
  complete: Match[];
  incomplete: Match[];
  empty: Match[];
}

export interface Prediction {
  match_id: number;
  home_team: string;
  away_team: string;
  predicted_outcome: 'HOME_WIN' | 'AWAY_WIN' | 'DRAW';
  probabilities: {
    home_win: number;
    draw: number;
    away_win: number;
  };
}