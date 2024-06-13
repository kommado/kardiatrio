
import GetManyRequestParams = service.GetManyRequestParams;
import Query = service.Query;
import GetOneRequestParams = service.GetOneRequestParams;
import GetListRequestParams = service.GetListRequestParams;
import PostRequestOnlyData = service.PostRequestOnlyData;
import PostRequestParamsSingle = service.PostRequestParamsSingle;
import PostRequestParamsMulti = service.PostRequestParamsMulti;
import {service} from "../wailsjs/go/models";
import {
    Create, Delete, DeleteMany,
    GetList,
    GetMany,
    GetManyReference,
    GetOne,
    Update,
    UpdateMany
} from "../wailsjs/go/service/ProviderService";
import {
    CreateParams, DeleteManyParams, DeleteParams,
    GetListParams,
    GetManyParams,
    GetManyReferenceParams,
    GetOneParams, UpdateManyParams,
    UpdateParams
} from "react-admin";

export const dataProvider = {
    getList: async (resource: string, params: GetListParams) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        let res = GetList(
            resource,
            GetListRequestParams.createFrom({
                    query: Query.createFrom({
                        sort: [field, order],
                        range: [(page - 1) * perPage, page * perPage - 1],
                        filter: params.filter,
                    })
                }
            )
        )
        console.log(res)
        return res
    },

    getOne: async (resource: string, params: GetOneParams) => {
        let res = GetOne(resource, GetOneRequestParams.createFrom({id: params.id}))
        console.log(res)
        return res
    },

    getMany: async (resource: string, params: GetManyParams) => {
        let res =  GetMany(
            resource,
            GetManyRequestParams.createFrom({id: params.ids})
        )
        console.log(res)
        return res
    },

    getManyReference: async (resource: string, params: GetManyReferenceParams) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: [field, order],
            range: [(page - 1) * perPage, page * perPage - 1],
            filter: {
                ...params.filter,
                [params.target]: params.id,
            },
        };
        let res = GetManyReference(
            resource,
            GetManyRequestParams.createFrom({query: Query.createFrom(query)})
        )
        console.log(res)
        return res
    },

    create: async (resource: string, params: CreateParams) => {
        let res = Create(
            resource,
            PostRequestOnlyData.createFrom({body: params.data})
        )
        console.log(res)
        return res
    },

    update: async (resource: string, params: UpdateParams) => {
        console.log(`Updating ${resource}`)
        console.log(`Data: ${params.data}`)
        let res  = Update(
            resource,
            PostRequestParamsSingle.createFrom({id: params.id, body: JSON.stringify(params.data)})
        )
        console.log(res)
        return res
    },

    updateMany: async (resource: string, params: UpdateManyParams) => {
        let res = UpdateMany(
            resource,
            PostRequestParamsMulti.createFrom({
                id: params.ids,
                body: params.data
            })
        )
        console.log(res)
        return res
    },

    delete: async (resource: string, params: DeleteParams) => {
        let res = Delete(
            resource,
            GetOneRequestParams.createFrom({id: params.id})
        )
        console.log(res)
        return res
    },

    deleteMany: async (resource: string, params: DeleteManyParams) => {
        let res = DeleteMany(
            resource,
            GetManyRequestParams.createFrom({id: params.ids})
        )
        console.log(res)
        return res
    },
};
