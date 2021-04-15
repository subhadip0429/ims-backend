export interface IController{

}

export interface IRouter {

}

export interface IService<T = any>{
    _model
    setModel(model:T)
    getModel():T
}

export interface PaginationOptions<T> {
    size: number
    page?: number
    sortBy?: {[key: string] : (1 | 0)}
}

export interface IPaginate<T>{
    data: T[],
    page: number,
    pageSize: number
}
