import { Component } from "react";
import "./css/base.css";
import "./css/styles.css";
import { ModalButton } from "./components/ModalButton";
import { ButtonContainer } from "./components/ButtonContainer";
import { ModalComponent } from "./components/ModalComponent";

class App extends Component<Record<string, never>> {
  render() {
    return (
      <>
        <main className="container-md transaction-container">
          <header className="transaction-header">
            <ButtonContainer>
              <ModalButton
                text={"Create New Transaction"}
                onClick={() => console.log("clicked")}
              />
            </ButtonContainer>
          </header>
        </main>
        <ModalComponent />
      </>
    );
  }
}

export default App;
