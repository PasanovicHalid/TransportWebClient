export class Money {
    amount: number = 0;
    currency: string = "EUR";

    public getFormattedAmount() : string {
        return `${this.currency} ${this.amount}`;
    }
}
