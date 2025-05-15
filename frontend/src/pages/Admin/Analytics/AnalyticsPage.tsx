// DashboardPage.tsx
import React from 'react';
import Analytic from '../../../components/Analytic/Analytic';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import TimerIcon from '@mui/icons-material/Timer';
import LogoutIcon from '@mui/icons-material/Logout';
import './Analytic.css';
import { VisitorsChart } from '@/components/RadialChart/VisitorsChart';
import { ChartContainer } from '@/components/ui/chart';

const AnalyticsPage: React.FC = () => {
  return (
    <div className="analytic-page">
      {/* <div className="analytic-page__container">
        <Analytic
          icon={<ShowChartIcon sx={{ color: '#6a9eed', fontSize: '30px' }} />}
          name="Visitors"
          data="30.0K"
        />
        <Analytic
          icon={<TimerIcon sx={{ color: '#6a9eed', fontSize: '30px' }} />}
          name="Visit Duration"
          data="3m 14s"
        />
        <Analytic
          icon={<QueryStatsIcon sx={{ color: '#6a9eed', fontSize: '30px' }} />}
          name="Total Page Views"
          data="30.0K"
        />
        <Analytic
          icon={<LogoutIcon sx={{ color: '#6a9eed', fontSize: '30px' }} />}
          name="Bounce Rate"
          data="48%"
        />
      </div> */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ">
        <VisitorsChart />
        <VisitorsChart />
        <VisitorsChart />
        <VisitorsChart />
      </div>
    </div>
  );
};

export default AnalyticsPage;
