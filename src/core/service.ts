import {
    Aggregate,
    Document, DocumentDefinition,
    FilterQuery,
    QueryOptions,
    QueryWithHelpers, SaveOptions,
    UpdateQuery,
    UpdateWriteOpResult
} from "mongoose";
import {SoftDeleteModel} from "mongoose-delete";
import {DeleteWriteOpResultObject} from "mongodb";
import {IPaginate, IService, PaginationOptions} from "@core/typing";

export class Service<T extends Document, K = any> implements IService<SoftDeleteModel<T>>{
    _model: SoftDeleteModel<T>;

    getModel(): SoftDeleteModel<T> {
        return this._model;
    }

    setModel(model:SoftDeleteModel<T>) {
        this._model = model;
    }

    raw(): SoftDeleteModel<T> {
       return this.getModel();
    }

    builder(doc:K){
        return new this._model(doc);
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

    find(filter: FilterQuery<T> = {}, projection: any | null = {}, options: QueryOptions | null = {}):QueryWithHelpers<T[], T, {}> {
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

    aggregate<R = any>(pipeline = []): Aggregate<Array<R>> {
        return this._model.aggregate(pipeline)
    }

    paginate(filter: FilterQuery<T> = {}, projection: any | null = {}, options:PaginationOptions<T> = {size: 10, page: 0, sortBy: {_id: 1}}): Promise<IPaginate<T>>{
        const query = this.find(filter, projection)
        return this.paginateQuery(query,options);
    }

    async paginateQuery(query: QueryWithHelpers<T[], T, {}>, options:PaginationOptions<T> = {size: 10, page: 0, sortBy: {_id: 1}}){
        const data = await query
            .sort(options.sortBy)
            .skip(options.page)
            .limit(options.size)
            .exec();

        return {
            data,
            page: options.page,
            pageSize: options.size
        }
    }

}
