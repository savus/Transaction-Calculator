import { Component, ReactNode } from "react";
export class ModalSectionLayout extends Component<{
  transactionModalVisible: string;
  setTransactionModalVisible: (modalState: string) => void;
  lastBalance: string;
  children: ReactNode;
}> {
  render() {
    const {
      transactionModalVisible,
      setTransactionModalVisible,
      lastBalance,
      children,
    } = this.props;
    return (
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
          <div className="modal-body">{children}</div>
        </div>
      </section>
    );
  }
}
