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
  { metric: 'KO Rate', value: 62 },
  //   { metric: 'Jabs Landed', value: 72 },
  //   { metric: 'Power Punches Landed', value: 48 },
  //   { metric: 'Points Rate', value: 78 },
];

const chartConfig = {
  metric: {
    label: 'Metric',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

const FighterRadar: React.FC = () => (
  <div style={{ width: '100%' }}>
    <CardHeader className="items-center pb-4">
      <CardDescription className="text-white text-center text-lg font-light">
        Average per-fight metrics for previous 5 bouts
      </CardDescription>
    </CardHeader>
    <ResponsiveContainer>
      <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
        <RadarChart outerRadius="80%" data={dummyData}>
          <PolarGrid className="text-sm p-10" />
          <PolarAngleAxis
            dataKey="metric"
            fill="var(--chart-1)"
            className="text-white text-sm "
          />
          <Radar
            name="Avg / Fight"
            dataKey="value"
            stroke="#fff"
            fill="#6a9eed"
            fillOpacity={0.7}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
        </RadarChart>
      </ChartContainer>
    </ResponsiveContainer>
  </div>
);

export default FighterRadar;
