import { Component } from "react";
import "./css/base.css";
import "./css/styles.css";
import { Requests } from "./api";
import { Transaction } from "./types";

type State = {
  currentBalance: string;
  currentBalanceInput: string;
  withdrawInput: string;
  depositInput: string;
  allTransactions: Transaction[];
};

class App extends Component<Record<string, never>, State> {
  state: State = {
    currentBalance: "12.00",
    currentBalanceInput: "0.00",
    withdrawInput: "0.00",
    depositInput: "0.00",
    allTransactions: [],
  };

  fetchData = () => {
    return Requests.getAllTransactions().then((responses) => {
      this.setState({ allTransactions: responses });
      console.log(this.state.allTransactions);
    });
  };

  postTransaction = (body: Omit<Transaction, "id">) => {
    return Requests.postTransaction(body).then(() => {
      this.fetchData();
    });
  };

  componentDidMount(): void {
    this.fetchData();
  }

  render() {
    const {
      currentBalance,
      currentBalanceInput,
      withdrawInput,
      depositInput,
      allTransactions,
    } = this.state;

    const calculateTotals = () => {
      const parsedCurrent = parseFloat(currentBalance);
      const parsedWithdraw = parseFloat(withdrawInput);
      const parsedDeposit = parseFloat(depositInput);
      return `${(parsedCurrent - parsedWithdraw + parsedDeposit).toFixed(2)}`;
    };
    return (
      <>
        <div className="full-site-modal is-visible" data-animation="fadeInOut">
          <div className="modal-body container-md">
            <form
              id="transaction-form"
              onSubmit={(e) => {
                e.preventDefault();
                this.postTransaction({
                  currentBalance: currentBalance,
                  withdrawAmount: withdrawInput,
                  depositAmount: depositInput,
                  newBalance: calculateTotals(),
                });
              }}
            >
              <div className="left-side">
                <div>Current Balance ${currentBalance}</div>
                <div className="btn-center">
                  <input
                    type="text"
                    placeholder="0.00"
                    className="input-primary"
                    value={currentBalanceInput}
                    onChange={(e) => {
                      e.preventDefault();
                      this.setState({ currentBalanceInput: e.target.value });
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      this.setState({ currentBalance: currentBalanceInput });
                    }}
                  >
                    Change
                  </button>
                </div>
                <div className="btn-center">
                  <input
                    type="text"
                    placeholder="0.00"
                    className="input-primary"
                    value={withdrawInput}
                    onChange={(e) =>
                      this.setState({ withdrawInput: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      this.setState({ currentBalance: calculateTotals() });
                    }}
                  >
                    Withdraw
                  </button>
                </div>
                <div className="btn-center">
                  <input
                    type="text"
                    placeholder="0.00"
                    className="input-primary"
                    value={depositInput}
                    onChange={(e) =>
                      this.setState({ depositInput: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      this.setState({ currentBalance: calculateTotals() });
                    }}
                  >
                    Deposit
                  </button>
                </div>
              </div>
              <div className="right-side">
                <div className="new-balance">New Balance ${currentBalance}</div>
                <div className="btn-center">
                  <button className="btn btn-primary">
                    Post New Transaction
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div
          id="transaction-history"
          style={{ backgroundColor: "#fff", color: "#000" }}
        >
          <h1>Transactions</h1>
          {allTransactions.map((transaction) => (
            <div key={transaction.id}>
              <div>Previous Balance: {transaction.currentBalance}</div>
              <div>Withdraw Amount: {transaction.withdrawAmount}</div>
              <div>Deposit Amount: {transaction.depositAmount}</div>
              <div>Current Balance: {transaction.newBalance}</div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default App;
