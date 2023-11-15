import { TextInput } from "./TextInput";
import { useState } from "react";

export const TransactionForm = ({
  lastBalance,
  setLastBalance,
}: {
  lastBalance: string;
  setLastBalance: (lastBalance: string) => void;
}) => {
  const [amountToAddInput, setAmountToAddInput] = useState("0.00");
  const [amountToSubtractInput, setAmountToSubtractInput] = useState("0.00");
  return (
    <>
      <form action="" className="new-transaction-form">
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
          <h3 className="balance-to-submit">New Balance: 0.00</h3>
          <button id="record-transaction" className="btn spread-out-transition">
            Record Transaction
          </button>
        </div>
      </form>
    </>
  );
};
