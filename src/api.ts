const BASE_URL = "http://localhost:3000";

export const Requests = {
  getAllTransactions: () =>
    fetch(`${BASE_URL}/transactions`).then((response) => response.json()),
};
