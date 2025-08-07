// src/components/FighterRadar.tsx

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
} from 'recharts';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { TrendingUp } from 'lucide-react';
import './FighterRader.css';
import { Tooltip } from 'recharts';

interface PerFightMetric {
  metric: string;
  value: number;
  fill: string;
}

const dummyData: PerFightMetric[] = [
  { metric: 'Punches Per Round', value: 60, fill: '#3b82f6' },
  { metric: 'Punches Per Fight', value: 90, fill: '#10b981' },
  { metric: 'Punches Landed', value: 62, fill: '#a855f7' },
  { metric: 'Accuracy %', value: 82, fill: '#f59e0b' },
  { metric: 'KO Rate', value: 62, fill: '#f43f5e' },
];

const chartConfig = {
  metric: {
    label: 'Metric',
    color: 'hsl(var(--chart-1))',
  },
  value: {
    label: 'Avg / Fight',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

const FighterRadar = () => {
  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-base text-center text-white">
          Average per-fight metrics
        </CardTitle>
        <CardTitle className="text-base text-center text-white">
          for previous 5 bouts
        </CardTitle>
      </CardHeader>

      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="
     
          w-full 
          // max-w-md:[300px] 
          sm:max-w-[100px]
          md:max-w-[100%]     
          mx-auto         
          h-[250px] 
          sm:h-[350px] 
          md:h-[400px]
         md:pl-20

        "
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              className="data-chart"
              data={dummyData}
              layout="vertical"
              margin={{ left: 34, right: 50 }}
            >
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="metric"
                width={140}
                tickLine={false}
                axisLine={false}
                tick={{ fill: 'white', fontSize: 12 }}
              />
              <Tooltip
                wrapperStyle={{
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                }}
                contentStyle={{
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                }}
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />

              <Bar
                dataKey="value"
                isAnimationActive={false}
                radius={[4, 4, 4, 4]}
                fillOpacity={0.8}
              >
                {dummyData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center justify-center gap-2 font-medium text-white">
          Trending up from last 5 fights <TrendingUp className="w-4 h-4" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default FighterRadar;
