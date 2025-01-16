export interface IEventTax {
    name: string,
    amount: number,
    type: "percentage" | "fixed",
    id: string
}