import { ComponentProps } from "react";

export type InputProps = ComponentProps<"input">;

export type Transaction = {
  id: number;
  previousBalance: string;
  addedAmount: string;
  subtractedAmount: string;
  newBalance: string;
};
