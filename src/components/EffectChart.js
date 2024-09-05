import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LogarithmicScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LogarithmicScale, PointElement, LineElement, Title, Tooltip, Legend);

const EffectChart = ({ baselineRate, sampleSizes, isAbsolute }) => {
  // Only plot every 5th point for simplicity
  const filteredSampleSizes = sampleSizes.filter((_, i) => i % 5 === 0);

  const labels = filteredSampleSizes.map((item) => item.detectableEffect);

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
        type: 'linear',
        title: {
          display: true,
          text: 'Minimum Detectable Effect (%)',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.2)',
        },
        ticks: {
          stepSize: 5, // Ensure ticks are divisible by 5
        },
        min: 0,
        max: isAbsolute ? 90 : 100,  // 90 for absolute, 100 for relative
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
  
  
  const data = {
    labels: sampleSizes.filter((_, i) => i % 5 === 0 || i === sampleSizes.length - 1).map(item => item.detectableEffect),  // Ensure 100% is included
    datasets: [
      {
        label: `Sample Size for Baseline Rate ${baselineRate}%`,
        data: sampleSizes.filter((_, i) => i % 5 === 0 || i === sampleSizes.length - 1).map(item => item.sampleSize),  // Ensure 100% is included
        fill: false,
        borderColor: '#1976d2',
        pointBackgroundColor: '#1976d2',
        pointBorderColor: '#1976d2',
        borderWidth: 2,
        pointBorderWidth: 2,
        pointRadius: 2,  // Small dots
        tension: 0.5,
      },
    ],
  };
  
  return <Line data={data} options={options} />;
  
};

export default EffectChart;
