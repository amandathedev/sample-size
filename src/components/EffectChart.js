import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LogarithmicScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LogarithmicScale, PointElement, LineElement, Title, Tooltip, Legend);

const EffectChart = ({ baselineRate, sampleSizes }) => {
  const labels = sampleSizes.map((item) => item.detectableEffect);

  const data = {
    labels,
    datasets: [
      {
        label: `Sample Size for Baseline Rate ${baselineRate}%`,
        data: sampleSizes.map((item) => item.sampleSize),
        fill: false,
        borderColor: '#1976d2',
        pointBackgroundColor: '#1976d2',
        pointBorderColor: '#1976d2',
        borderWidth: 2,
        pointBorderWidth: 3,
        pointRadius: 2,
        pointShadowBlur: 5,
        pointShadowColor: 'rgba(0, 0, 0, 0.3)',
        tension: 0.1,
      },
    ],
  };
  

const options = {
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: `Sample Size for Baseline Rate ${baselineRate}%`,
      font: {
        size: 18,
        weight: 'bold',
      },
    },
    tooltip: {
      callbacks: {
        title: function (tooltipItems) {
          const item = tooltipItems[0];
          return `MDE: ${item.label}`;
        },
        label: function (tooltipItem) {
          return `Sample Size: ${tooltipItem.raw.toLocaleString()}`;
        },
      },
      displayColors: false,
    },
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(200, 200, 200, 0.2)',
      },
      ticks: {
        stepSize: 1,
      },
      title: {
        display: true,
        text: 'Minimum Detectable Effect (%)',
        font: {
          size: 14,
          weight: 'bold',
        },
      },
    },
    y: {
      type: 'logarithmic',
      grid: {
        color: 'rgba(200, 200, 200, 0.2)',
      },
      beginAtZero: true,
      title: {
        display: true,
        text: 'Sample Size',
        font: {
          size: 14,
          weight: 'bold',
        },
      },
    },
  },
};

  
  
  

  return <Line data={data} options={options} />;
};

export default EffectChart;
