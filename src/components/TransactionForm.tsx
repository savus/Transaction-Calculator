import { Component } from "react";
import { ButtonContainer } from "./ButtonContainer";
import { InputComponent } from "./InputComponent";

export class TransactionForm extends Component<{
  setModalVisibleState: (modalVisibleState: string) => void;
  modalVisibleState: string;
}> {
  render() {
    const { setModalVisibleState, modalVisibleState } = this.props;
    return (
      <>
        <form
          id="transaction-form"
          data-animation="zoomInOut"
          onSubmit={(e) => {
            e.preventDefault();
            if (modalVisibleState === "is-visible")
              return setModalVisibleState("");
            return setModalVisibleState("is-visible");
          }}
        >
          <div className="left-side">
            <div className="previous-balance">
              Current Balance: $100.00
              <InputComponent
                inputProps={{
                  className: "input-primary",
                }}
              />
            </div>
            <div className="amount-to-add">
              Amount To Add: $0.00
              <InputComponent
                inputProps={{
                  className: "input-primary",
                }}
              />
            </div>
            <div className="amount-to-subtract">
              Amount to Subtract: $0.00
              <InputComponent
                inputProps={{
                  className: "input-primary",
                }}
              />
            </div>
          </div>
          <div className="right-side">
            <div className="new-balance">New Balance: $0.00</div>
            <ButtonContainer>
              <InputComponent
                inputProps={{
                  type: "submit",
                  className: "btn btn-primary",
                  value: "Post New Record",
                }}
              />
            </ButtonContainer>
          </div>
        </form>
      </>
    );
  }
}
