import { Component } from "react";
import { TransactionForm } from "./TransactionForm";

export class ModalComponent extends Component<{
  modalVisibleState: string;
  setModalVisibleState: (modalVisibleState: string) => void;
  isVisible: string;
}> {
  render() {
    const { modalVisibleState, setModalVisibleState, isVisible } = this.props;
    return (
      <>
        <div
          className={`full-site-modal ${modalVisibleState}`}
          data-animation="fadeInOut"
          onClick={(e) => {
            if (e.target.className.includes("full-site-modal")) {
              if (modalVisibleState === "is-visible")
                return setModalVisibleState("");
              return setModalVisibleState("is-visible");
            }
          }}
        >
          <div className="modal-body container-md">
            <TransactionForm
              setModalVisibleState={setModalVisibleState}
              modalVisibleState={modalVisibleState}
              isVisible={isVisible}
            />
          </div>
        </div>
      </>
    );
  }
}
