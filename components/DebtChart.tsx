// components/DebtChart.tsx
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

export interface DebtChartParams {
  debtArray: Map<number, number>;
}

const DebtChart: React.FC<DebtChartParams> = ({ debtArray }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  //if (!Array.isArray(debtArray)) return null;
  if(debtArray.size == 0){
    alert("No debts found");
  }

  useEffect(() => {

    console.log(debtArray);
    const labels = Array.from(debtArray.keys());
    const dataValues = Array.from(debtArray.values());

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create new chart
    chartInstanceRef.current = new Chart(chartRef.current!, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Debt Balance Over Time',
          data: dataValues,
          backgroundColor: '#9F9FED',
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  }, [debtArray]);

  console.log("returning debtChart", chartInstanceRef.current);
  return (
    <div style={{ width: '100%', height: '22rem' }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default DebtChart;
