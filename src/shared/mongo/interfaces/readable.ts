import { Query } from "mongoose";

export interface Readable<T> {
	findAll (): Query<T[]>;
	find ( condition: Object, fields: Object, options: Object ): Query<T[]>;
	findById ( id: string ): Query<T>;
	findOne ( condition?: Object ): Query<T>;
	count ( conditions: Object ) : Query<number>;
}