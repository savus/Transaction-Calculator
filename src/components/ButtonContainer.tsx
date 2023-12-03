import { Component, ReactNode } from "react";

export class ButtonContainer extends Component<{ children: ReactNode }> {
  render() {
    const { children } = this.props;
    return (
      <>
        <div className="btn-container">{children}</div>
      </>
    );
  }
}
