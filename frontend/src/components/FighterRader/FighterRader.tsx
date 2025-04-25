// src/components/FighterRadar.tsx
'use client';

import React from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Tooltip,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
interface PerFightMetric {
  metric: string;
  value: number;
}

const dummyData: PerFightMetric[] = [
  { metric: 'Punches Thrown Per Round', value: 60 },
  { metric: 'Punches Thrown Per Fight', value: 90 },
  { metric: 'Punches Landed', value: 62 },
  { metric: 'Punch Accuracy %', value: 82 },
  { metric: 'Jabs Landed', value: 72 },
  { metric: 'Power Punches Landed', value: 48 },
  { metric: 'Points Rate', value: 78 },
  { metric: 'KO Rate', value: 62 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

const FighterRadar: React.FC = () => (
  <div style={{ width: '100%', height: 400, minWidth: 700 }}>
    <CardHeader className="items-center pb-4">
      <CardDescription style={{ textAlign: 'center' }}>
        Average per-fight metrics for previous 5 bouts
      </CardDescription>
    </CardHeader>
    <ChartContainer config={chartConfig}>
      <RadarChart outerRadius="70%" data={dummyData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="metric" />
        <Radar
          name="Avg / Fight"
          dataKey="value"
          stroke="#fff"
          fill="#6a9eed"
          fillOpacity={0.5}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
      </RadarChart>
    </ChartContainer>
  </div>
);

export default FighterRadar;
