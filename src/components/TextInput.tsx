import { Component } from "react";
import { InputProps } from "../types";
export class TextInput extends Component<{
  labelText: string;
  inputProps: InputProps;
}> {
  render() {
    const { labelText, inputProps } = this.props;
    return (
      <>
        <div className="input-container">
          <label htmlFor="new-balance">{labelText}:</label>
          <input {...inputProps} />
        </div>
      </>
    );
  }
}
