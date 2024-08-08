import styles from "./Totals.module.scss";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

import { useEffect, useState } from "react";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export const Totals = () => {
  
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const incomes = JSON.parse(localStorage.getItem('incomes')) || [];
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    const totalIncome = incomes.reduce((acc, item) => acc + item.amount, 0);
    const totalExpense = expenses.reduce((acc, item) => acc + item.amount, 0);

    setChartData({
      labels: ['Incomes', 'Expenses'],
      datasets: [{
        label: 'Financial Overview',
        data: [totalIncome, totalExpense],
        backgroundColor: [
          'rgb(0,239,123)', // Blue for incomes
          'rgb(255, 0, 0)'  // Red for expenses
        ],
        hoverOffset: 4
      }]
    });
  }, []);

  return (
    <div className={`${styles.Totals} wrapper`}>
      <div className={styles.TotalsWrapper}>
        <div className={styles.TotalsTypes}>
          <div className={styles.TotalsType}>
            <p>Incomes:</p>
            <p className={styles.TotalsIncome}>
              {new Intl.NumberFormat().format(chartData.datasets[0]?.data[0] || 0)} $
            </p>
          </div>
          <div className={styles.TotalsType}>
            <p>Expenses:</p>
            <p className={styles.TotalsExpense}>
            {new Intl.NumberFormat().format(chartData.datasets[0]?.data[1] || 0)} $
            </p>
          </div>
        </div>
        <div className={styles.TotalsChart}>
          <Doughnut data={chartData} />
        </div>
      </div>
    </div>
  );
};
