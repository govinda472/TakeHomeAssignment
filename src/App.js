import React, { useEffect, useState } from "react";
import { getRewards, getMonths } from "./server/mockAPIs";
import RewardsTable from "./components/RewardsTable";
import "./styles.css";
import { useMemo } from "react";

export default function App() {
  const [rewardsData, setRewardsData] = useState([]);
  const [months, setMonths] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const timeFrame = 3;
  useEffect(() => {
    getRewards(timeFrame).then((rewards) => {
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

      <RewardsTable rewardsData={filteredRewardsData} months={months} />
    </div>
  );
}