export interface IController{

}

export interface IRouter {

}

export interface IService<T>{
    _model:T
    setModel(model:T)
    getModel():T
    raw():T
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
