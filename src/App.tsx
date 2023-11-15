import { useState, useEffect } from "react";
import "../src/css/base.css";
import "../src/css/theme.css";
import "../src/css/styles.css";
import { TTransaction } from "./types";
import { Requests } from "./api";
import { TextInput } from "./components/TextInput";
import { TransactionForm } from "./components/TransactionForm";

function App() {
  const [transactionModalVisible, setTransactionModalVisible] = useState("");
  const [allTransactions, setAllTransactions] = useState<TTransaction[]>([]);
  const [lastBalance, setLastBalance] = useState("0.00");
  const [activeTransaction, setActiveTransaction] = useState<
    Omit<TTransaction, "id">
  >({
    addedAmount: "0.00",
    subtractedAmount: "0.00",
    newBalance: "0.00",
  });

  const fetchData = () => {
    return Requests.getAllTransactions().then((transactions) => {
      setLastBalance(transactions[transactions.length - 1].newBalance);
      setAllTransactions(transactions);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <main className="transaction-app-wrapper container-md">
        <div className="transaction-button-container horizontal-center">
          <button
            id="transaction-modal-button"
            className="btn spread-out-transition"
            data-open="new-transaction"
            onClick={() => setTransactionModalVisible("is-visible")}
          >
            Create New Transaction
          </button>
        </div>
        <section className="transaction-history-container">
          <h3 className="horizontal-center header-md">Transaction History</h3>
          {allTransactions.map((transaction) => (
            <div className="transaction-item" key={transaction.id}>
              <div className="transaction-content">
                <div>Previous Balance: {transaction.previousBalance}</div>
                <div>Added Amount: +{transaction.addedAmount}</div>
                <div>Subtracted Amount: -{transaction.subtractedAmount}</div>
                <div>Current Balance: {transaction.newBalance}</div>
              </div>
            </div>
          ))}
        </section>
      </main>

      <section
        className={`modal-section ${transactionModalVisible}`}
        id="new-transaction"
      >
        <div className="modal-content container-md">
          <header className="modal-header">
            <div className="current-balance">
              <h3>Current Balance: {lastBalance}</h3>
            </div>
            <div className="close-modal-container">
              <i
                className="fa-solid fa-x"
                data-close="new-transaction"
                onClick={() => setTransactionModalVisible("")}
              ></i>
            </div>
          </header>
          <div className="modal-body">
            <TransactionForm
              lastBalance={lastBalance}
              setLastBalance={(lastBalance) => {
                setLastBalance(lastBalance);
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
