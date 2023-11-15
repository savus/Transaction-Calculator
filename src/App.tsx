import { useState, useEffect } from "react";
import "../src/css/base.css";
import "../src/css/theme.css";
import "../src/css/styles.css";
import { TTransaction } from "./types";
import { Requests } from "./api";
import { ModalSection } from "./components/Layouts/ModalSection";
import { TransactionHistory } from "./components/TransactionHistory";

function App() {
  const [transactionModalVisible, setTransactionModalVisible] = useState("");
  const [allTransactions, setAllTransactions] = useState<TTransaction[]>([]);
  const [lastBalance, setLastBalance] = useState("0.00");
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    setIsLoading(true);
    return Requests.getAllTransactions().then((transactions) => {
      setLastBalance(transactions[transactions.length - 1].newBalance);
      setAllTransactions(transactions);
    }).finally(() => setIsLoading(false));
  };

  const postTransaction = (transaction: Omit<TTransaction, "id">) => {
    return Requests.postTransaction(transaction).then(fetchData);
  };

  const getReversedTransactionList = () => {
    const reversedList = [...allTransactions].sort((a, b) => b.id - a.id);
    return reversedList;
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

      <ModalSection
        transactionModalVisible={transactionModalVisible}
        setTransactionModalVisible={(value: string) => {
          setTransactionModalVisible(value);
        }}
        postTransaction={postTransaction}
        lastBalance={lastBalance}
        setLastBalance={setLastBalance}
      />
    </>
  );
}

export default App;
