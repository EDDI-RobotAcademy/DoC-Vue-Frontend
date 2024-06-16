import { ActionContext } from "vuex"
import { Product, ProductState } from "./states"
import { AxiosResponse} from "axios"
import axiosInst from "@/utility/axiosInstance"
import { REQUEST_PRODUCT_LIST_TO_DJANGO, REQUEST_PRODUCT_TO_DJANGO } from "./mutation-types"



export type ProductActions = {
    requestProductToDjango(context: ActionContext<ProductState, any>, productId: number): Promise<void>
    requestProductListToDjango(context: ActionContext<ProductState, any>): Promise<void>
}


const actions: ProductActions = {
    async requestProductToDjango(context: ActionContext<ProductState, any>, productId: number): Promise<void>{
        try {
            const res: AxiosResponse<Product> = await axiosInst.djangoAxiosInst.get(`/product/read/${productId}`);
            console.log('data:',res.data)
            context.commit(REQUEST_PRODUCT_TO_DJANGO, res.data);
        } catch (error) {
            console.error('requestProductToDjango() 문제 발생:', error);
            throw error
        }
    },
    async requestProductListToDjango(context: ActionContext<ProductState, any>): Promise<void> {
        try {
            const res: AxiosResponse<any, any> = await axiosInst.djangoAxiosInst.get('/product/list/');
            console.log('res:',res)
            const data: Product[] = res.data;
            console.log('data:', data)
            context.commit(REQUEST_PRODUCT_LIST_TO_DJANGO, data);
        } catch (error) {
            console.error('Error fetching product list:', error);
            // 에러를 처리할 수 있는 추가 로직
            throw error
        }
    },
};

export default actions;