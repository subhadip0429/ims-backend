import {
    Aggregate,
    Document, DocumentDefinition,
    FilterQuery,
    Model,
    QueryOptions,
    QueryWithHelpers, SaveOptions,
    UpdateQuery,
    UpdateWriteOpResult
} from "mongoose";
import {DeleteWriteOpResultObject} from "mongodb";
import {IService} from "@core/typing";

export class Service<T extends Document> extends Model implements IService{
    _model: Model<T>;

    getModel(): Model<T> {
        return this._model;
    }

    setModel(model:Model<T>) {
        this._model = model;
    }

    create(docs: (T | DocumentDefinition<T>)[], options: SaveOptions = {}): Promise<T[]>{
        return this._model.create(docs, options);
    }

    countDocuments(filter: FilterQuery<T> = {}): QueryWithHelpers<number, T, {}>{
        return this._model.countDocuments(filter);
    }

    exists(filter: FilterQuery<T>): Promise<boolean>{
      return  this._model.exists(filter);
    }

    findById(id: any, projection: any | null = {}, options: QueryOptions | null = {}): QueryWithHelpers<T | null, T, {}>{
        return this._model.findById(id, projection, options);
    }

    findOne(filter: (FilterQuery<T>) = {}, projection: any | null = {}, options: (QueryOptions | null) = {}):QueryWithHelpers<T | null, T, {}>{
        return this._model.findOne(filter, projection, options);
    }

    find(filter: FilterQuery<T> = {}, projection: any | null = null, options: QueryOptions | null = {}):QueryWithHelpers<T[], T, {}> {
        return this._model.find(filter, projection, options);
    }

    updateOne(filter: FilterQuery<T> = {}, update: UpdateQuery<T>, options: QueryOptions | null = {}) :QueryWithHelpers<UpdateWriteOpResult, T, {}> {
        return this._model.updateOne(filter, update, options);
    }

    updateMany(filter: FilterQuery<T> = {}, update: UpdateQuery<T>, options: QueryOptions | null = {}): QueryWithHelpers<UpdateWriteOpResult, T, {}> {
        return this._model.updateMany(filter, update, options);
    }

    deleteMany(filter: FilterQuery<T> = {}, options: QueryOptions = {}): QueryWithHelpers<DeleteWriteOpResultObject['result'] & { deletedCount?: number }, T, {}> {
        return this._model.deleteMany(filter,options);
    }

    deleteOne(filter: FilterQuery<T> = {}, options: QueryOptions = {}): QueryWithHelpers<DeleteWriteOpResultObject['result'] & { deletedCount?: number }, T, {}> {
        return this._model.deleteOne(filter, options);
    }

    aggregate<R = any>(pipeline?: any[]): Aggregate<Array<R>> {
        return this._model.aggregate()
    }

}
