import { TTransaction } from "../../types";
import { TransactionForm } from "../TransactionForm";

export const ModalSection = ({
  transactionModalVisible,
  setTransactionModalVisible,
  postTransaction,
  lastBalance,
  setLastBalance,
  isLoading,
}: {
  transactionModalVisible: string;
  setTransactionModalVisible: (value: string) => void;
  postTransaction: (transaction: Omit<TTransaction, "id">) => Promise<unknown>;
  lastBalance: string;
  setLastBalance: (lastBalance: string) => void;
  isLoading: boolean;
}) => {
  return (
    <>
      <section
        className={`modal-section ${transactionModalVisible}`}
        id="new-transaction"
        onClick={() => setTransactionModalVisible("")}
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
              postTransaction={postTransaction}
              setTransactionModalVisible={(transactionModalVisible) => {
                setTransactionModalVisible(transactionModalVisible);
              }}
              isLoading={isLoading}
            />
          </div>
        </div>
      </section>
    </>
  );
};
