// src/components/StatsCharts/StatsCharts.tsx
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

// generate 12 months of random win/loss counts
const winsLosses = Array.from({ length: 12 }).map((_, i) => ({
  month: new Date(2024, i).toLocaleString('en-us', { month: 'short' }),
  wins: Math.floor(Math.random() * 5),
  losses: Math.floor(Math.random() * 3),
}));

// random pie data for KO vs decision
const pieData = [
  { name: 'KO/TKO', value: Math.floor(Math.random() * 30) + 5 },
  { name: 'Decision', value: Math.floor(Math.random() * 30) + 5 },
  { name: 'DQ/Other', value: Math.floor(Math.random() * 10) + 1 },
];
const COLORS = ['#22c55e', '#3b82f6', '#ef4444'];

const StatsCharts: React.FC = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 24,
      height: 300,
    }}
  >
    {/* Win/Loss Trend */}
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={winsLosses}
        margin={{ top: 20, right: 30, bottom: 20, left: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Line type="monotone" dataKey="wins" stroke="#22c55e" strokeWidth={2} />
        <Line
          type="monotone"
          dataKey="losses"
          stroke="#ef4444"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>

    {/* KO vs Decision */}
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {pieData.map((_, idx) => (
            <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
          ))}
        </Pie>
        <Legend verticalAlign="bottom" height={36} />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default StatsCharts;
