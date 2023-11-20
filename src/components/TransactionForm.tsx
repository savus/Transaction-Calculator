import { Component } from "react";
import { TTransaction } from "../types";
import { FormDivider } from "./Layouts/FormDivider";
import { TextInput } from "./TextInput";

export class TransactionForm extends Component<{
  lastBalance: string;
  setLastBalance: (balance: string) => void;
  postTransaction: (transaction: Omit<TTransaction, "id">) => Promise<unknown>;
  isLoading: boolean;
  setTransactionModalVisible: (modalState: string) => void;
}> {
  state = {
    amountToAddInput: "0.00",
    amountToSubtractInput: "0.00",
  };

  calculateTotals = () => {
    const parsedLastBalance = parseFloat(this.props.lastBalance);
    const parsedAmountToAdd = parseFloat(this.state.amountToAddInput);
    const parsedAmountToSubtract = parseFloat(this.state.amountToSubtractInput);
    return `${parsedLastBalance + parsedAmountToAdd - parsedAmountToSubtract}`;
  };

  resetTotals = () => {
    this.setState({
      amountToAdd: "0.00",
      amountToSubtract: "0.00",
    });
  };

  render() {
    const {
      lastBalance,
      setLastBalance,
      postTransaction,
      isLoading,
      setTransactionModalVisible,
    } = this.props;
    const { amountToAddInput, amountToSubtractInput } = this.state;
    return (
      <form
        action=""
        className="new-transaction-form"
        onSubmit={(e) => {
          e.preventDefault();
          postTransaction({
            previousBalance: lastBalance,
            addedAmount: amountToAddInput,
            subtractedAmount: amountToSubtractInput,
            currentBalance: this.calculateTotals(),
          });
          this.resetTotals();
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
              value: amountToAddInput,
              onChange: (e) =>
                this.setState({ amountToAddInput: e.target.value }),
              disabled: isLoading,
            }}
          />
          <TextInput
            labelText="Amount to Subtract"
            inputProps={{
              type: "text",
              placeholder: "0.00",
              value: amountToSubtractInput,
              onChange: (e) =>
                this.setState({ amountToSubtractInput: e.target.value }),
              disabled: isLoading,
            }}
          />
        </FormDivider>
        <FormDivider classList="right-side">
          <h3 className="balance-to-submit">
            New Balance:{this.calculateTotals()}
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
    );
  }
}
