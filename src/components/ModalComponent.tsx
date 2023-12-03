import { Component } from "react";
import { TransactionForm } from "./TransactionForm";

export class ModalComponent extends Component {
  render() {
    return (
      <>
        <div className="full-site-modal is-visible" data-animation="fadeInOut">
          <div className="modal-body container-md">
            <TransactionForm />
          </div>
        </div>
      </>
    );
  }
}
