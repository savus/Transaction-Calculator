import { Component } from "react";
import "./css/base.css";
import "./css/styles.css";

class App extends Component<Record<string, never>> {
  render() {
    return (
      <>
        <div className="full-site-modal is-visible" data-animation="fadeInOut">
          <div className="modal-body container-md">
            <form id="transaction-form">
              <div className="left-side">
                <div>
                  Current Balance $0.00
                  <input
                    type="text"
                    placeholder="0.00"
                    className="input-primary"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="0.00"
                    className="input-primary"
                  />
                  <button className="btn secondary-btn">Withdraw</button>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="0.00"
                    className="input-primary"
                  />
                  <button className="btn secondary-btn">Deposit</button>
                </div>
              </div>
              <div className="right-side">
                <div className="new-balance">New Balance $0.00</div>
                <div className="btn-container">
                  <button className="btn btn-primary">
                    Post New Transaction
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default App;
