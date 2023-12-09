import { Transaction } from "./types";

const BASE_URL = "http://localhost:3000/transactions";

export const Requests = {
  getAllTransactions: () =>
    fetch(`${BASE_URL}`).then((response) => response.json()),

  postTransaction: (body: Omit<Transaction, "id">) =>
    fetch(`${BASE_URL}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    }).then((response) => response.json()),
};
