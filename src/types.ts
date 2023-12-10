import { ComponentProps } from "react";

export type InputProps = ComponentProps<"input">;

export type Transaction = {
  id: number;
  currentBalance: string;
  withdrawAmount: string;
  depositAmount: string;
  newBalance: string;
};
