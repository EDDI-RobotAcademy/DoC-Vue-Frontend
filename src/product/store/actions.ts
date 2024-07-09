import { ActionContext } from "vuex"
import { Product, ProductState } from "./states"
import { AxiosResponse} from "axios"
import axiosInst from "@/utility/axiosInstance"
import { REQUEST_PRODUCT_LIST_TO_DJANGO, REQUEST_PRODUCT_TO_DJANGO } from "./mutation-types"



export type ProductActions = {
    requestProductToDjango(
        context: ActionContext<ProductState, any>, 
        productId: number
    ): Promise<void>
    requestProductListToDjango(
        context: ActionContext<ProductState, any>
    ): Promise<void>
    requestCreateProductToDjango(
        context: ActionContext<ProductState, unknown>, 
        imageFormData: FormData
    ): Promise<AxiosResponse>
    requestRandomFourProductListToDjango(
        context: ActionContext<ProductState, any>,
        productCategory: string
    ): Promise<void>
    requestRecommendProductListToDjango(
        context: ActionContext<ProductState, any>,
        recommendProductIdList: number[]
    ): Promise<void>
}

const actions: ProductActions = {
    async requestProductToDjango(
        context: ActionContext<ProductState, any>, 
        productId: number
    ): Promise<void> {

        try {
            const res: AxiosResponse<Product> = 
                await axiosInst.djangoAxiosInst.get(`/product/read/${productId}`)

            context.commit(REQUEST_PRODUCT_TO_DJANGO, res.data)
        } catch (error) {
            console.error('requestProductToDjango() -> error:', error)
            throw error
        }
    },
    async requestProductListToDjango(context: ActionContext<ProductState, any>): Promise<void> {
        try {
            const res: AxiosResponse<any, any> = await axiosInst.djangoAxiosInst.get('/product/list/');
            const data: Product[] = res.data;
            // console.log('data:', data)
            context.commit('REQUEST_PRODUCT_LIST_TO_DJANGO', data);
        } catch (error) {
            console.error('Error fetching product list:', error);
            throw error
        }
    },
    async requestCreateProductToDjango(context: ActionContext<ProductState, unknown>, imageFormData: FormData): Promise<AxiosResponse> {
        try {
                console.log('requestCreateProductToDjango()')
                const res: AxiosResponse = await axiosInst.djangoAxiosInst.post('/product/register', imageFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                console.log('응답 데이터 : ', res.data)
                alert('이모티콘을 성공적으로 등록하셨습니다.');
                return res
            } catch (error) {
                console.log('requestCreateProductToDjango(): ', error)
                throw error
            }
    },
    async requestRandomFourProductListToDjango(context: ActionContext<ProductState, any>, productCategory: string): Promise<void> {
        try {
            const res: AxiosResponse<any, any> = await axiosInst.djangoAxiosInst
            .get('/product/random/list/', { params: { productCategory } });
            const data: Product[] = res.data;
            // console.log('data:', data)
            context.commit('REQUEST_RANDOM_FOUR_PRODUCT_LIST_TO_DJANGO', data);
        } catch (error) {
            console.error('Error fetching random product list:', error);
            throw error
        }
    },
    async requestRecommendProductListToDjango(context: ActionContext<ProductState, any>,
        recommendProductIdList: number[]): Promise<void> {
        try {
            const res: AxiosResponse<any, any> = await axiosInst.djangoAxiosInst
            .post('/product/recommend/list/', { recommendProductIdList });
            const data: Product[] = res.data;
            // console.log('data:', data)
            context.commit('REQUEST_RECOMMEND_PRODUCT_LIST_TO_DJANGO', data);
        } catch (error) {
            console.error('Error fetching recommend product list:', error);
            throw error
        }
    },
};

export default actions;