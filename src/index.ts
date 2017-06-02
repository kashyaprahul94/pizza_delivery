import { App as PizzaDeliverySystem } from "./instance";

export namespace App {
	export type Type = PizzaDeliverySystem;
	export const Instance: PizzaDeliverySystem = PizzaDeliverySystem.Instance();
}