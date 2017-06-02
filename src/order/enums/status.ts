export enum OrderStatus {

	New = "NEW" as any,
	InProcess = "IN_PROCESS" as any,
	Processed = "PROCESSED" as any,
	OnWay = "ON_WAY" as any,
	Delivered = "DELIVERED" as any,

	Default = OrderStatus.New as any
}