import { TTransaction } from "../types";
import { TextInput } from "./TextInput";
import { useState } from "react";

export const TransactionForm = ({
  lastBalance,
  setLastBalance,
  postTransaction,
  setTransactionModalVisible,
}: {
  lastBalance: string;
  setLastBalance: (lastBalance: string) => void;
  postTransaction: (transaction: Omit<TTransaction, "id">) => Promise<unknown>;
  setTransactionModalVisible: (transactionModalVisible: string) => void;
}) => {
  const [amountToAddInput, setAmountToAddInput] = useState("0.00");
  const [amountToSubtractInput, setAmountToSubtractInput] = useState("0.00");
  const calculateTotals = () => {
    const parsedLastBalance = parseFloat(lastBalance);
    const parsedAmountToAdd = parseFloat(amountToAddInput);
    const parsedAmountToSubtract = -parseFloat(amountToSubtractInput);
    return (
      parsedLastBalance +
      parsedAmountToAdd +
      parsedAmountToSubtract
    ).toFixed(2);
  };
  const resetTotals = () => {
    setAmountToAddInput("0.00");
    setAmountToSubtractInput("0.00");
  };
  return (
    <>
      <form
        action=""
        className="new-transaction-form"
        onSubmit={(e) => {
          e.preventDefault();
          postTransaction({
            addedAmount: amountToAddInput,
            subtractedAmount: amountToSubtractInput,
            newBalance: calculateTotals(),
          });
          resetTotals();
        }}
      >
        <div className="form-divider left-side">
          <TextInput
            labelText="Change Current Balance:"
            inputProps={{
              type: "text",
              placeholder: "0.00",
              value: lastBalance,
              onChange: (e) => setLastBalance(e.target.value),
            }}
          />
          <TextInput
            labelText="Amount to Add"
            inputProps={{
              type: "text",
              placeholder: "0.00",
              value: amountToAddInput,
              onChange: (e) => setAmountToAddInput(e.target.value),
            }}
          />
          <TextInput
            labelText="Amount to Subtract"
            inputProps={{
              type: "text",
              placeholder: "0.00",
              value: amountToSubtractInput,
              onChange: (e) => setAmountToSubtractInput(e.target.value),
            }}
          />
        </div>
        <div className="form-divider right-side">
          <h3 className="balance-to-submit">
            New Balance: {calculateTotals()}
          </h3>
          <button
            type="submit"
            id="record-transaction"
            className="btn spread-out-transition"
            onClick={() => {
                setTransactionModalVisible("");
            }}
          >
            Record Transaction
          </button>
        </div>
      </form>
    </>
  );
};
