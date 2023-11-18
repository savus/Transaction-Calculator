import { useState, useEffect } from "react";
import "../src/css/base.css";
import "../src/css/theme.css";
import "../src/css/styles.css";
import { TTransaction } from "./types";
import { Requests } from "./api";
import { TransactionHistory } from "./components/TransactionHistory";
import { TextInput } from "./components/TextInput";
import { FormDivider } from "./components/Layouts/FormDivider";

function App() {
  const [transactionModalVisible, setTransactionModalVisible] = useState("");
  const [addedAmount, setAddedAmount] = useState("0.00");
  const [subTractedAmount, setSubtractedAmount] = useState("0.00");
  const [allTransactions, setAllTransactions] = useState<TTransaction[]>([]);
  const [lastBalance, setLastBalance] = useState("0.00");
  const [isLoading, setIsLoading] = useState(false);

  const calculateTotals = () => {
    const parsedAmountToAdd = parseFloat(addedAmount);
    const parsedAmountToSubtract = parseFloat(subTractedAmount);
    const parsedLastBalance = parseFloat(lastBalance);
    console.log(
      (parsedLastBalance + parsedAmountToAdd - parsedAmountToSubtract).toFixed(
        2
      )
    );
    return `${(
      parsedLastBalance +
      parsedAmountToAdd -
      parsedAmountToSubtract
    ).toFixed(2)}`;
  };

  const fetchData = () => {
    setIsLoading(true);
    return Requests.getAllTransactions()
      .then((transactions) => {
        setLastBalance(transactions[transactions.length - 1].currentBalance);
        setAllTransactions(transactions);
      })
      .finally(() => setIsLoading(false));
  };

  const postTransaction = (transaction: Omit<TTransaction, "id">) => {
    return Requests.postTransaction(transaction).then(fetchData);
  };

  const getReversedTransactionList = () => {
    const reversedList = [...allTransactions].sort((a, b) => b.id - a.id);
    return reversedList;
  };

  const resetTotals = () => {
    setAddedAmount("0.00");
    setSubtractedAmount("0.00");
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
          <TransactionHistory
            reversedTransactionList={getReversedTransactionList()}
            lastBalance={lastBalance}
          />
        </section>
      </main>

      <section
        className={`modal-section ${transactionModalVisible}`}
        id="new-transaction"
        onClick={(e) => {
          if (e.target.id === "new-transaction") {
            setTransactionModalVisible("");
          }
        }}
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
            <form
              action=""
              className="new-transaction-form"
              onSubmit={(e) => {
                e.preventDefault();
                const currentBalance = calculateTotals();
                postTransaction({
                  previousBalance: lastBalance,
                  addedAmount: addedAmount,
                  subtractedAmount: subTractedAmount,
                  currentBalance: currentBalance,
                });
                resetTotals();
              }}
            >
              <FormDivider classList="left-side">
                <TextInput
                  labelText="Change Current Balance:"
                  inputProps={{
                    type: "text",
                    placeholder: "0.00",
                    value: lastBalance,
                    onChange: (e) => setLastBalance(e.target.value),
                    disabled: isLoading,
                  }}
                />
                <TextInput
                  labelText="Amount to Add"
                  inputProps={{
                    type: "text",
                    placeholder: "0.00",
                    value: addedAmount,
                    onChange: (e) => setAddedAmount(e.target.value),
                    disabled: isLoading,
                  }}
                />
                <TextInput
                  labelText="Amount to Subtract"
                  inputProps={{
                    type: "text",
                    placeholder: "0.00",
                    value: subTractedAmount,
                    onChange: (e) => setSubtractedAmount(e.target.value),
                    disabled: isLoading,
                  }}
                />
              </FormDivider>
              <FormDivider classList="right-side">
                <h3 className="balance-to-submit">
                  New Balance:{calculateTotals()}
                </h3>
                <button
                  type="submit"
                  id="record-transaction"
                  className="btn spread-out-transition"
                  onClick={() => {
                    setTransactionModalVisible("");
                  }}
                  disabled={isLoading}
                >
                  Record Transaction
                </button>
              </FormDivider>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
