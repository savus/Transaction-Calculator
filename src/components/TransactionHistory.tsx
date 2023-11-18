import { Component } from "react";
import { TTransaction } from "../types";
export class TransactionHistory extends Component<{
  reversedTransactionList: TTransaction[];
  lastBalance: string;
}> {
  render() {
    const { reversedTransactionList, lastBalance } = this.props;
    return (
      <>
        <h3 className="horizontal-center header-md">Transaction History</h3>
        {reversedTransactionList.map((transaction) => (
          <div className="transaction-item" key={transaction.id}>
            <div className="transaction-content">
              <div>Previous Balance: {lastBalance}</div>
              <div>Added Amount: +{transaction.addedAmount}</div>
              <div>Subtracted Amount: -{transaction.subtractedAmount}</div>
              <div>Current Balance: {transaction.currentBalance}</div>
            </div>
          </div>
        ))}
      </>
    );
  }
}
