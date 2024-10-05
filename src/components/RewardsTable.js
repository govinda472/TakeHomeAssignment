import React, { useState } from "react";
import "./RewardsTable.css";

const SortIndicator = ({ sortBy, sortOrder, column }) => {
  if (sortBy !== column) {
    return null; 
  }
  return sortOrder === "asc" ? "▲" : "▼"; 
};

const RewardsTable = ({ rewardsData, months }) => {
  const [sortBy, setSortBy] = useState("customerId"); 
  const [sortOrder, setSortOrder] = useState("asc");

  // sorting criteria
  const handleSort = (criteria) => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc"); 
    } else {
      setSortBy(criteria); 
      setSortOrder("asc"); 
    }
  };

  // Sorting logic
  const sortedRewardsData = [...rewardsData].sort((a, b) => {
    if (sortBy === "customerId") {
      return sortOrder === "asc"
        ? a.customerId - b.customerId
        : b.customerId - a.customerId;
    } else if (sortBy === "customerName") {
      return sortOrder === "asc"
        ? a.customerName.localeCompare(b.customerName)
        : b.customerName.localeCompare(a.customerName);
    } else if (sortBy === "totalPoints") {
      return sortOrder === "asc"
        ? a.totalPoints - b.totalPoints
        : b.totalPoints - a.totalPoints;
    }
    return 0;
  });

  return (
    <table className="table-container">
      <thead>
        <tr>
          <th
            onClick={() => handleSort("customerId")}
            className="sortable-column"
          >
            Customer ID{" "}
            <SortIndicator
              sortBy={sortBy}
              sortOrder={sortOrder}
              column="customerId"
            />
          </th>
          <th
            onClick={() => handleSort("customerName")}
            className="sortable-column"
          >
            Customer Name{" "}
            <SortIndicator
              sortBy={sortBy}
              sortOrder={sortOrder}
              column="customerName"
            />
          </th>
          {months.map((month) => (
            <th key={month}>{month}</th>
          ))}
          <th
            onClick={() => handleSort("totalPoints")}
            className="sortable-column"
          >
            Total Points{" "}
            <SortIndicator
              sortBy={sortBy}
              sortOrder={sortOrder}
              column="totalPoints"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedRewardsData.map((reward) => {
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
