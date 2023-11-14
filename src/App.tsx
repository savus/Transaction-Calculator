import { useState } from "react";
import "../src/css/styles.css";
import "../src/css/base.css";
import "../src/css/theme.css";

function App() {
  return (
    <>
      <main className="transaction-app-wrapper container container-md">
        <div className="transaction-button-container horizontal-center">
          <button id="transaction-modal-button" className="btn">
            Create New Transaction
          </button>
        </div>
        <section className="transaction-history-container">
          <h3 className="horizontal-center">Transaction History</h3>
          <ul className="record-list"></ul>
        </section>
      </main>

      <section className="modal-section">
        <div className="full-site-modal">
          <header className="modal-header">
            <div className="current-balance">
              <h3>Current Balance: 0.00</h3>
            </div>
            <div className="close-modal-container">
              <i className="fa-solid fa-x"></i>
            </div>
          </header>
          <div className="modal-body">
            <form action="" className="new-transaction-form">
              <div className="form-divider left-side">
                <div className="input-container">
                  <label htmlFor="new-balance">Enter New Balance: --</label>
                  <input type="text" placeholder="0.00" />
                </div>
              </div>
              <div className="form-divider right-side">
                <h3 className="balance-to-submit">New Balance: 0.00</h3>
                <button id="record-transaction">Record Transaction</button>
              </div>
            </form>
          </div>
        </div>
      </section>

    </>
  );
}

export default App;
