import { useState } from "react";
import "../src/css/base.css";
import "../src/css/theme.css";
import "../src/css/styles.css";

function App() {
  const [transactionModalVisible, setTransactionModalVisible] = useState("");
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
          <h3 className="horizontal-center">Transaction History</h3>
          <div className="transaction-item">
            <div className="transaction-content">
              <div>Previous Balance: 100.00</div>
              <div>Added Amount: +5.00</div>
              <div>Subtracted Amount: -0.00</div>
              <div>Current Balance: 105.00</div>
            </div>
          </div>
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
