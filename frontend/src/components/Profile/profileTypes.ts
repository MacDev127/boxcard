export interface BoxerProfile {
  id: number;
  name?: string;
  profileImage: string;
  age: number;
  sex: string;
  weight: number;
  bio: string;
  country: string;
  club: string;
  province: string;
  stance: string;
  level: string;
  fightsWon: number;
  fightsLost: number;
  videoUrl?: string | null;
}

export interface ContestResults {
  date: string;
  id: number;
  result: string;
  competition: string;
  winnerId: number;
  boxer1Id: number;
  boxer2Id: number;
  boxer1: { id: number; name: string };
  boxer2: { id: number; name: string };
}

export type BoutOutcome = 'win' | 'loss';
