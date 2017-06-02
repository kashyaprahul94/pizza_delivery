import { Query } from "mongoose";

export interface Writable<T> {
	create ( item: T ): Promise<T>;
	update ( _id: string, item: T ): Query<any>;
	remove ( _id: string ): Query<void>;
}