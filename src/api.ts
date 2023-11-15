import { TTransaction } from "./types";
const BASE_URL = "http://localhost:3000";

export const Requests = {
  getAllTransactions: () =>
    fetch(`${BASE_URL}/transactions`).then((response) => response.json()),

  postTransaction: (transaction: Omit<TTransaction, "id">) =>
    fetch(`${BASE_URL}/transactions`, {
      method: "POST",
      body: JSON.stringify(transaction),
      headers: { "Content-Type": "application/json" },
    }).then((response) => response.json()),
};
