import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import Chart from 'chart.js/auto';

export default function DoughnutChart({ title, labels, data, colors }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const chart = new Chart(canvasRef.current.getContext('2d'), {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: colors,
            borderColor: '#ffffff',
            borderWidth: 2,
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: {
              display: true,
              text: title,
              font: { family: "'Inter', sans-serif", size: 16 },
              color: '#27272a',
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `${context.label}: ${context.raw}%`;
                }
              }
            }
          }
        }
      });
      return () => chart.destroy();
    }
  }, [title, labels, data, colors]);

  return (
    <div class="chart-container">
      <canvas ref={canvasRef} style={{ maxHeight: '350px' }}></canvas>
    </div>
  );
}