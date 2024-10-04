import React from "react";
import "./RewardsTable.css";

const RewardsTable = ({ rewardsData, months }) => {
  return (
    <table className="table-container">
      <thead>
        <tr>
          <th>Customer ID</th>
          <th>Customer Name</th>
          {months.map((month) => (
            <th key={month}>{month}</th>
          ))}
          <th>Total Points</th>
        </tr>
      </thead>
      <tbody>
        {rewardsData.map((reward) => {
          const { customerId, customerName, monthlyPoints, totalPoints } =
            reward;

          return (
            <tr key={customerId}>
              <td>{customerId}</td>
              <td>{customerName}</td>
              {months.map((month) => (
                <td key={month}>{monthlyPoints[month] || 0}</td>
              ))}
              <td>{totalPoints}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default RewardsTable;
