import { Component } from "react";
export class ModalButton extends Component<{
  text: string;
  onClick: () => void;
}> {
  render() {
    const { text, onClick } = this.props;
    return (
      <>
        <button
          className="btn btn-primary"
          onClick={() => {
            onClick();
          }}
        >
          {text}
        </button>
      </>
    );
  }
}
