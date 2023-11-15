import { Component, ReactNode } from "react";

export class FormDivider extends Component<{
  children: ReactNode;
  classList: string;
}> {
  render() {
    const { children, classList } = this.props;
    return (
      <>
        <div className={`form-divider ${classList}`}>{children}</div>
      </>
    );
  }
}
