import { TTransaction } from "../types";
import { FormDivider } from "./Layouts/FormDivider";
import { TextInput } from "./TextInput";
import { useState } from "react";

export const TransactionForm = ({
  lastBalance,
  setLastBalance,
  postTransaction,
  setTransactionModalVisible,
  isLoading
}: {
  lastBalance: string;
  setLastBalance: (lastBalance: string) => void;
  postTransaction: (transaction: Omit<TTransaction, "id">) => Promise<unknown>;
  setTransactionModalVisible: (transactionModalVisible: string) => void;
  isLoading: boolean
}) => {
  const [amountToAddInput, setAmountToAddInput] = useState("0.00");
  const [amountToSubtractInput, setAmountToSubtractInput] = useState("0.00");
  const calculateTotals = () => {
    const parsedLastBalance = parseFloat(lastBalance);
    const parsedAmountToAdd = parseFloat(amountToAddInput);
    const parsedAmountToSubtract = -parseFloat(amountToSubtractInput);
    return (
      parsedLastBalance +
      parsedAmountToAdd +
      parsedAmountToSubtract
    ).toFixed(2);
  };
  const resetTotals = () => {
    setAmountToAddInput("0.00");
    setAmountToSubtractInput("0.00");
  };
  return (
    <>
      
    </>
  );
};
