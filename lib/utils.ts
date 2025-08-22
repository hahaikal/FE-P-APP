import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mapSportKeyToCompetition(sportKey: string): string {
  const competitionMap: { [key: string]: string } = {
    soccer_epl: 'English Premier League',
    soccer_spain_la_liga: 'La Liga',
    soccer_germany_bundesliga: 'Bundesliga',
    soccer_italy_serie_a: 'Serie A',
    soccer_france_ligue_one: 'Ligue 1',
  };
  return competitionMap[sportKey] || sportKey.replace(/_/g, ' ').toUpperCase();
}

export function getTeamLogo(teamName: string): string {
  const logoMap: { [key: string]: string } = {
    'arsenal': '🔴',
    'chelsea': '🔵',
    'manchester city': '💙',
    'liverpool': '🔴',
    'real madrid': '🏆',
    'barcelona': '🔵',
    'bayern munich': '🔴',
    'borussia dortmund': '🟡',
    'psg': '🔵',
    'marseille': '⚪',
    'juventus': '⚫',
    'ac milan': '🔴',
  };
  return logoMap[teamName.toLowerCase()] || '⚽️';
}