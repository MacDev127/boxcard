// src/utils/mockStats.ts

// import type { ContestResults } from '../components/Table/Table';

// Radar chart metrics
export const radarData = [
  { metric: 'Punches Thrown', value: 120 },
  { metric: 'Punches Landed', value: 48 },
  { metric: 'Takedowns', value: 3 },
  { metric: 'Clinch Time (s)', value: 45 },
  { metric: 'Power Shots', value: 22 },
];

// Career progression over time
export const progressionData = [
  { date: '2022-01-01', wins: 1, losses: 0 },
  { date: '2022-04-01', wins: 2, losses: 1 },
  { date: '2022-07-01', wins: 3, losses: 1 },
  { date: '2022-10-01', wins: 4, losses: 1 },
  { date: '2023-01-01', wins: 5, losses: 1 },
];

// Punch breakdown by type
export const punchBreakdown = [
  { type: 'Jab', count: 50 },
  { type: 'Cross', count: 30 },
  { type: 'Hook', count: 20 },
  { type: 'Upper', count: 15 },
];

// Later on, when you have real contestData you can map this dynamically:
// Here we just export an empty placeholder for type safety:
export const emptyRecord = [
  { label: 'Wins', value: 0 },
  { label: 'Losses', value: 0 },
  { label: 'Draws', value: 0 },
];
