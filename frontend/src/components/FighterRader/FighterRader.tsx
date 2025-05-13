'use client';

import React from 'react';
import { PieChart, Pie, Tooltip, Label, ResponsiveContainer } from 'recharts';
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
import { TrendingUp } from 'lucide-react';
import './FighterRader.css';

interface PerFightMetric {
  metric: string;
  value: number;
  fill: string;
}
const chartColors = [
  '#3b82f6', // Blue (right segment)
  '#10b981', // Green (bottom right)
  '#a855f7', // Purple (bottom)
  '#f59e0b', // Orange (bottom left)
  '#f43f5e', // Pink (top left)
];

const dummyData: PerFightMetric[] = [
  { metric: 'Punches Thrown Per Round', value: 60, fill: chartColors[0] },
  { metric: 'Punches Thrown Per Fight', value: 90, fill: chartColors[1] },
  { metric: 'Punches Landed', value: 62, fill: chartColors[2] },
  { metric: 'Accuracy %', value: 82, fill: chartColors[3] },
  { metric: 'KO Rate', value: 62, fill: chartColors[4] },
];

const chartConfig = {
  metric: {
    label: 'Metric',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

const FighterRadar: React.FC = () => {
  const total = dummyData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <Card className="flex flex-col w-full bg-transparent border-none">
      <CardHeader className="items-center pb-2">
        <CardDescription className="text-white text-center text-base font-light">
          Average per-fight metrics for previous 5 bouts
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px] sm:max-h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={dummyData}
                dataKey="value"
                nameKey="metric"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="test"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="text-xl font-bold fill-white"
                          >
                            {total}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 18}
                            className="fill-muted-foreground text-sm"
                          >
                            Total Score
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center justify-center gap-2 font-medium leading-none text-white">
          Trending up from last 5 fights <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-center text-muted-foreground">
          Scaled from fighter performance metrics across recent bouts
        </div>
      </CardFooter>
    </Card>
  );
};

export default FighterRadar;
