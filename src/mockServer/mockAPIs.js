import { customers, transactions } from "./mockData.js";
import { calculatePoints } from "./utlis.js";
import moment from "moment";

export const getRewards = async (numberOfMonths) => {
  const rewards = {};
  const startDate = moment().subtract(numberOfMonths, "months");

  transactions.forEach((transaction) => {
    const transactionDate = moment(transaction.date);
    if (transactionDate.isSameOrAfter(startDate)) {
      const customerId = transaction.customerId;
      const points = calculatePoints(transaction.amount);
      const month = transactionDate.format("MMMM YYYY");

      if (!rewards[customerId]) {
        const customer = customers.find((c) => c.id === customerId);
        rewards[customerId] = {
          customerId,
          customerName: customer ? customer.name : "Unknown",
          totalPoints: 0,
          monthlyPoints: {},
        };
      }
      if (!rewards[customerId].monthlyPoints[month]) {
        rewards[customerId].monthlyPoints[month] = 0;
      }
      rewards[customerId].monthlyPoints[month] += points;
      rewards[customerId].totalPoints += points;
    }
  });
  return Object.values(rewards);
};

export const getMonths = async (numberOfMonths) => {
  const startDate = moment().subtract(numberOfMonths, "months"); 

  const months = [
    ...new Set(
      transactions
        .filter((transaction) => moment(transaction.date).isSameOrAfter(startDate)) 
        .map((transaction) => moment(transaction.date).format("MMMM YYYY")) 
    ),
  ];
  return months.sort((a, b) => moment(a, "MMMM YYYY").diff(moment(b, "MMMM YYYY")));
};