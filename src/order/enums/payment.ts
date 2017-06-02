export enum PaymentType {

	Cash = "CASH" as any,
	DebitCard = "DEBIT_CARD" as any,
	CreditCard = "CREDIT_CARD" as any,

	Default = PaymentType.DebitCard as any
}