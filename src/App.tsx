import { Component } from "react";
import "./css/base.css";
import "./css/styles.css";
import { ModalButton } from "./components/ModalButton";
import { ButtonContainer } from "./components/shared/ButtonContainer";
import { ModalComponent } from "./components/ModalComponent";
import { Requests } from "./api";
import { Transaction } from "./types";

type State = {
  modalVisibleState: string;
  allTransactions: Transaction[];
};

const isVisible = "is-visible";

class App extends Component<Record<string, never>, State> {
  state: State = {
    modalVisibleState: isVisible,
    allTransactions: [],
  };

  refetchData = () => {
    return Requests.getAllTransactions().then((responses) => {
      this.setState({ allTransactions: responses });
    });
  };

  componentDidMount(): void {}
  render() {
    const { modalVisibleState } = this.state;
    return (
      <>
        <main className="container-md transaction-container">
          <header className="transaction-header">
            <ButtonContainer>
              <ModalButton
                text={"Create New Transaction"}
                onClick={() => {
                  this.setState({ modalVisibleState: isVisible });
                }}
              />
            </ButtonContainer>
          </header>
        </main>
        <ModalComponent
          modalVisibleState={modalVisibleState}
          setModalVisibleState={(modalVisibleState) => {
            this.setState({ modalVisibleState: modalVisibleState });
          }}
          isVisible={isVisible}
        />
      </>
    );
  }
}

export default App;
