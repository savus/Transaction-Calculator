import { TTransaction } from "../../types";
import { TextInput } from "../TextInput";
import { FormDivider } from "./FormDivider";

export const ModalSection = ({
  lastBalance,
  setLastBalance,
  transactionModalVisible,
  setTransactionModalVisible,
  postTransaction,
  calculateTotals,
  resetTotals,
  isLoading,
}: {
  lastBalance: string;
  setLastBalance: (amount: string) => void;
  transactionModalVisible: string;
  setTransactionModalVisible: (value: string) => void;
  postTransaction: (transaction: TTransaction) => void;
  calculateTotals: () => string;
  resetTotals: () => void;
  isLoading: boolean;
}) => {
  return (
    <>
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
};
