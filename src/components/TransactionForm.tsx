import { Component } from "react";
import { ButtonContainer } from "./shared/ButtonContainer";
import { InputComponent } from "./InputComponent";

export class TransactionForm extends Component<{
  setModalVisibleState: (modalVisibleState: string) => void;
  modalVisibleState: string;
  isVisible: string;
}> {
  state = {
    previousBalance: "0.00",
    addedAmount: "0.00",
    subtractedAmount: "0.00",
    newBalance: "20.00",
  };
  render() {
    const { setModalVisibleState, modalVisibleState, isVisible } = this.props;
    const { previousBalance, addedAmount, subtractedAmount, newBalance } =
      this.state;
    return (
      <>
        <form
          id="transaction-form"
          data-animation="zoomInOut"
          onSubmit={(e) => {
            e.preventDefault();
            if (modalVisibleState === isVisible)
              return setModalVisibleState("");
            return setModalVisibleState(isVisible);
          }}
        >
          <div className="left-side">
            <div className="previous-balance">
              Current Balance: $100.00
              <InputComponent
                inputProps={{
                  type: "text",
                  className: "input-primary",
                  value: previousBalance,
                  onChange: (e) =>
                    this.setState({ previousBalance: e.target.value }),
                }}
              />
            </div>
            <div className="amount-to-add">
              Amount To Add: $0.00
              <InputComponent
                inputProps={{
                  type: "text",
                  className: "input-primary",
                  value: addedAmount,
                  onChange: (e) =>
                    this.setState({ addedAmount: e.target.value }),
                }}
              />
            </div>
            <div className="amount-to-subtract">
              Amount to Subtract: $0.00
              <InputComponent
                inputProps={{
                  type: "text",
                  className: "input-primary",
                  value: subtractedAmount,
                  onChange: (e) =>
                    this.setState({ subtractedAmount: e.target.value }),
                }}
              />
            </div>
          </div>
          <div className="right-side">
            <div className="new-balance">New Balance: ${newBalance}</div>
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
