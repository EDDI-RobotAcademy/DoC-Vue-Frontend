import { ActionContext } from "vuex"
import { Product, ProductState } from "./states"
import { AxiosResponse} from "axios"
import axiosInst from "@/utility/axiosInstance"
import { REQUEST_PRODUCT_LIST_TO_DJANGO, REQUEST_PRODUCT_TO_DJANGO } from "./mutation-types"



export type ProductActions = {
    requestProductListToDjango(context: ActionContext<ProductState, any>): Promise<void>
    requestCreateProductToDjango(context: ActionContext<ProductState, unknown>, imageFormData: FormData): Promise<AxiosResponse>
}


const actions: ProductActions = {
    async requestProductListToDjango(context: ActionContext<ProductState, any>): Promise<void> {
        try {
            const res: AxiosResponse<any, any> = await axiosInst.djangoAxiosInst.get('/product/list/');
            console.log('res:',res)
            const data: Product[] = res.data;
            console.log('data:', data)
            context.commit(REQUEST_PRODUCT_LIST_TO_DJANGO, data);
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
};

export default actions;