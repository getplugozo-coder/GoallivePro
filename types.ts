
export type MatchStatus = 'live' | 'upcoming' | 'finished';

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
  league: string;
  startTime: any; // Firestore Timestamp
  status: MatchStatus;
  streamUrl: string;
  score?: {
    home: number;
    away: number;
  };
}

export interface User {
  uid: string;
  email: string | null;
}
