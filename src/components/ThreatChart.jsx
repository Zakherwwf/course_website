import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import Chart from 'chart.js/auto';

export default function ThreatChart() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Invasive Species', 'Habitat Loss', 'Pollution Costs'],
          datasets: [{
            label: 'Annual Economic Impact (USD)',
            data: [423e9, 100e9, 10e12], // in billions and trillions
            backgroundColor: [
              'rgba(239, 68, 68, 0.7)',  // Red
              'rgba(249, 115, 22, 0.7)', // Orange
              'rgba(245, 158, 11, 0.7)'  // Amber
            ],
            borderColor: [
                'rgba(239, 68, 68, 1)',
                'rgba(249, 115, 22, 1)',
                'rgba(245, 158, 11, 1)'
            ],
            borderWidth: 1,
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Key Economic Threats from Ecosystem Degradation',
              font: { family: "'Inter', sans-serif", size: 16 },
              color: '#27272a'
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  let value = context.raw;
                  if (value >= 1e12) return `$${(value / 1e12).toFixed(1)} Trillion`;
                  if (value >= 1e9) return `$${(value / 1e9).toFixed(0)} Billion`;
                  return `$${value}`;
                }
              }
            }
          },
          scales: {
            x: {
              type: 'logarithmic',
              title: {
                display: true,
                text: 'Annual Impact (Logarithmic Scale)',
                font: { family: "'Inter', sans-serif" }
              },
              ticks: {
                callback: function(value, index, values) {
                    if (value === 1e9) return '$1B';
                    if (value === 1e10) return '$10B';
                    if (value === 1e11) return '$100B';
                    if (value === 1e12) return '$1T';
                    if (value === 1e13) return '$10T';
                }
              }
            }
          }
        }
      });

      return () => chart.destroy();
    }
  }, []);

  return (
    <div class="chart-container">
      <canvas ref={canvasRef} style={{ height: '250px' }}></canvas>
    </div>
  );
}