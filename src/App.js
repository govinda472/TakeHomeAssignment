import React, { useEffect, useState } from "react";
import { getRewards, getMonths } from "./server/mockAPIs";
import RewardsTable from "./components/RewardsTable";
import "./styles.css";
import { useMemo } from "react";

export default function App() {
  const [rewardsData, setRewardsData] = useState([]);
  const [months, setMonths] = useState([]);
  const [sortBy, setSortBy] = useState("id");
  const [searchQuery, setSearchQuery] = useState("");
  
  const timeFrame = 3;
  useEffect(() => {
    getRewards().then((rewards) => {
      setRewardsData(rewards);
    });
    getMonths(timeFrame).then((availableMonths) => {
      setMonths(availableMonths);
    });
  }, []);

  const filteredRewardsData = useMemo(() => {
    return rewardsData.filter(
      (reward) =>
        reward.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reward.customerId.toString().includes(searchQuery)
    );
  }, [rewardsData, searchQuery]);

  const handleSort = (criteria) => {
    setSortBy(criteria);
  };

  const sortedRewardsData = [...filteredRewardsData].sort((a, b) => {
    if (sortBy === "name") {
      return a.customerName.localeCompare(b.customerName);
    } else if (sortBy === "id") {
      return a.customerId - b.customerId;
    } else if (sortBy === "points") {
      return b.totalPoints - a.totalPoints;
    }
    return 0;
  });

  return (
    <div>
      <h1>Customer Rewards Program</h1>
      {/* search */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Customer Name or ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Sorting Options */}
      <div className="radio-container">
        <label>
          <input
            type="radio"
            value="id"
            checked={sortBy === "id"}
            onChange={() => handleSort("id")}
          />
          Sort by ID
        </label>
        <label>
          <input
            type="radio"
            value="name"
            checked={sortBy === "name"}
            onChange={() => handleSort("name")}
          />
          Sort by Name
        </label>
        <label>
          <input
            type="radio"
            value="points"
            checked={sortBy === "points"}
            onChange={() => handleSort("points")}
          />
          Sort by points
        </label>
      </div>
      <RewardsTable rewardsData={sortedRewardsData} months={months} />
    </div>
  );
}
