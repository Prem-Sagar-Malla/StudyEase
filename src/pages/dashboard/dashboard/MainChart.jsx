import React, { useEffect, useRef } from 'react';
import { CChartLine } from '@coreui/react-chartjs';
import { getStyle } from '@coreui/utils';

const MainChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const updateChartStyles = () => {
      const chart = chartRef.current;
      if (chart) {
        setTimeout(() => {
          chart.options.scales.x.grid.borderColor = getStyle('--cui-border-color-translucent');
          chart.options.scales.x.grid.color = getStyle('--cui-border-color-translucent');
          chart.options.scales.x.ticks.color = getStyle('--cui-body-color');
          chart.options.scales.y.grid.borderColor = getStyle('--cui-border-color-translucent');
          chart.options.scales.y.grid.color = getStyle('--cui-border-color-translucent');
          chart.options.scales.y.ticks.color = getStyle('--cui-body-color');
          chart.update();
        });
      }
    };

    document.documentElement.addEventListener('ColorSchemeChange', updateChartStyles);

    return () => {
      document.documentElement.removeEventListener('ColorSchemeChange', updateChartStyles);
    };
  }, []);

  const chartData = {
    labels: data.labels || [],
    datasets: [
      {
        label: 'Total Visitors',
        data: data.totalVisitors || [],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: false,
      },
      {
        label: 'New Visitors',
        data: data.newVisitors || [],
        borderColor: 'rgba(255,99,132,1)',
        backgroundColor: 'rgba(255,99,132,0.2)',
        fill: false,
      },
      {
        label: 'Pageviews',
        data: data.pageviews || [],
        borderColor: 'rgba(255,206,86,1)',
        backgroundColor: 'rgba(255,206,86,0.2)',
        fill: false,
      },
      {
        label: 'Organic',
        data: data.organic || [],
        borderColor: 'rgba(153,102,255,1)',
        backgroundColor: 'rgba(153,102,255,0.2)',
        fill: false,
      },
    ],
  };

  return (
    <CChartLine
      ref={chartRef}
      style={{ height: '300px', marginTop: '40px' }}
      data={chartData}
      options={{
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          x: {
            grid: {
              color: getStyle('--cui-border-color-translucent'),
              drawOnChartArea: false,
            },
            ticks: {
              color: getStyle('--cui-body-color'),
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: getStyle('--cui-border-color-translucent'),
            },
            ticks: {
              color: getStyle('--cui-body-color'),
              maxTicksLimit: 5,
              stepSize: Math.ceil(250 / 5),
            },
          },
        },
        elements: {
          line: {
            tension: 0.4,
          },
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3,
          },
        },
      }}
    />
  );
};

export default MainChart;
