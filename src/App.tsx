import { Component } from "react";
import "./css/base.css";
import "./css/styles.css";
import { ModalButton } from "./components/ModalButton";
import { ButtonContainer } from "./components/ButtonContainer";
import { ModalComponent } from "./components/ModalComponent";

type State = {
  modalVisibleState: string;
};

class App extends Component<Record<string, never>, State> {
  state: State = {
    modalVisibleState: "",
  };
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
                  this.setState({ modalVisibleState: "is-visible" });
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
        />
      </>
    );
  }
}

export default App;
