import { ComponentProps } from "react"

export type TTransaction = {
    "id": number,
    "previousBalance": string,
    "addedAmount": string,
    "subtractedAmount": string,
    "currentBalance": string
};

export type InputProps = ComponentProps<"input">;