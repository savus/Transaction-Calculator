import { ComponentProps } from "react"

export type TTransaction = {
    "id": number,
    "addedAmount": string,
    "subtractedAmount": string,
    "newBalance": string
};

export type InputProps = ComponentProps<"input">;