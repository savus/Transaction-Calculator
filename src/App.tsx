import { useState, useEffect } from "react";
import "../src/css/base.css";
import "../src/css/theme.css";
import "../src/css/styles.css";
import { TTransaction } from "./types";
import { Requests } from "./api";

function App() {
  const [transactionModalVisible, setTransactionModalVisible] = useState("");
  const [allTransactions, setAllTransactions] = useState<TTransaction[]>([]);

  const fetchData = () => {
    return Requests.getAllTransactions().then(setAllTransactions);
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
              <h3>Current Balance: 0.00</h3>
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
            <form action="" className="new-transaction-form">
              <div className="form-divider left-side">
                <div className="input-container">
                  <label htmlFor="new-balance">
                    Change Current Balance: --
                  </label>
                  <input type="text" placeholder="0.00" />
                </div>
                <div className="input-container">
                  <label htmlFor="new-balance">Amount to Add: --</label>
                  <input type="text" placeholder="0.00" />
                </div>
                <div className="input-container">
                  <label htmlFor="new-balance">Amount to Subtract: --</label>
                  <input type="text" placeholder="0.00" />
                </div>
              </div>
              <div className="form-divider right-side">
                <h3 className="balance-to-submit">New Balance: 0.00</h3>
                <button
                  id="record-transaction"
                  className="btn spread-out-transition"
                >
                  Record Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
