import { Component } from "react";
import "./css/base.css";
import "./css/styles.css";
import { Requests } from "./api";
import { TModalState, Transaction } from "./types";

type State = {
  currentBalance: string;
  currentBalanceInput: string;
  withdrawInput: string;
  depositInput: string;
  allTransactions: Transaction[];
  modalVisibleState: TModalState;
};

class App extends Component<Record<string, never>, State> {
  state: State = {
    currentBalance: "0.00",
    currentBalanceInput: "0.00",
    withdrawInput: "0.00",
    depositInput: "0.00",
    allTransactions: [],
    modalVisibleState: "",
  };

  fetchData = () => {
    return Requests.getAllTransactions().then((responses) => {
      this.setState({ allTransactions: responses });
      const isLastTransaction = responses[responses.length - 1];
      this.setState({ currentBalance: isLastTransaction.newBalance });
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
      modalVisibleState,
    } = this.state;

    const calculateTotals = () => {
      const parsedCurrent = parseFloat(currentBalance);
      const parsedWithdraw = parseFloat(withdrawInput);
      const parsedDeposit = parseFloat(depositInput);
      return `${(parsedCurrent - parsedWithdraw + parsedDeposit).toFixed(2)}`;
    };

    const resetInputs = () => {
      this.setState({
        currentBalanceInput: "0.00",
        withdrawInput: "0.00",
        depositInput: "0.00",
      });
    };

    const sortedTransactions = [...allTransactions].sort((a, b) => b.id - a.id);

    return (
      <>
        <div
          className={`full-site-modal ${modalVisibleState}`}
          data-animation="fadeInOut"
          onClick={(e) => {
            const target = e.target;
            if (target.className.includes("full-site-modal"))
              this.setState({ modalVisibleState: "" });
          }}
        >
          <div className="modal-body container-md">
            <form
              id="transaction-form"
              onSubmit={(e) => {
                e.preventDefault();
                this.setState({ modalVisibleState: "" });
                // resetInputs();
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
                      console.log(currentBalance, currentBalanceInput);
                      // resetInputs();
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
                      // resetInputs();
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
                      // resetInputs();
                    }}
                  >
                    Deposit
                  </button>
                </div>
              </div>
              <div className="right-side">
                <div className="new-balance">
                  New Balance ${calculateTotals()}
                </div>
                <div className="btn-center">
                  <button
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({ modalVisibleState: "" });
                      // resetInputs();
                    }}
                  >
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
          className="container-md"
        >
          <header className="history-header">
            <h1>Transactions</h1>
            <button
              id="new-transaction-button"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                this.setState({ modalVisibleState: "is-visible" });
              }}
            >
              New Transaction
            </button>
          </header>
          {sortedTransactions.map((transaction) => (
            <div className="transaction-card" key={transaction.id}>
              <div>
                Previous Balance:
                <span>{transaction.currentBalance}</span>
              </div>
              <div>
                Withdraw Amount:
                <span>{transaction.withdrawAmount}</span>
              </div>
              <div>
                Deposit Amount:
                <span>{transaction.depositAmount}</span>
              </div>
              <div>
                Current Balance:
                <span>{transaction.newBalance}</span>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default App;
