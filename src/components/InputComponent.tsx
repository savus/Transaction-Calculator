import { Component } from "react";
import { InputProps } from "../types";

export class InputComponent extends Component<{
  inputProps: InputProps;
}> {
  render() {
    const { inputProps } = this.props;
    return (
      <>
        <input {...inputProps} />
      </>
    );
  }
}
