import { Model, Document, Types, Query } from "mongoose";
import { Readable, Writable } from "../interfaces";

export class DocumentRepository<T extends Document> implements Readable<T>, Writable<T> {

	protected _model: Model<Document>;

	constructor ( schemaModel: Model<Document> ) {
		this._model = schemaModel;
	}

	create ( item: T ): Promise<T> {
		return this._model.create( item );
	}

	update ( _id: string, item: T ): Query<T> {
		return this._model.update( {
			_id: DocumentRepository.toObjectId( _id )
		}, item );
	}

	remove ( _id: string ): Query<void> {
		return this._model.remove( {
			_id: DocumentRepository.toObjectId( _id )
		} );
	}


	count ( condition: Object ): Query<number> {
		return this._model.count( condition );
	}


	findAll (): Query<T[]> {
		return this._model.find();
	}

	find ( condition?: Object, fields?: Object, options?: Object ): Query<T[]> {
		return this._model.find( condition, options );
	}

	findById ( _id: string ): Query<T> {
		return this._model.findById( _id );
	}

	findOne ( condition?: Object ): Query<T> {
		return this._model.findOne( condition );
	}


	public getModel (): Model<Document> {
		return this._model;
	}

	protected static toObjectId ( _id: string ): Types.ObjectId {
		return Types.ObjectId.createFromHexString( _id );
	}
}