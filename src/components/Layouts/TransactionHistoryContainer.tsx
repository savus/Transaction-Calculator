import { Component, ReactNode } from "react";

export class TransactionHistoryContainer extends Component<{
  children: ReactNode;
}> {
  render() {
    const { children } = this.props;
    return (
      <section className="transaction-history-container">{children}</section>
    );
  }
}
