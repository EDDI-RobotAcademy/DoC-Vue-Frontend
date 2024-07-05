import { ActionContext } from "vuex"
import { Review, ReviewState } from "./states"
import { AxiosResponse } from "axios"
import axiosInst from "@/utility/axiosInstance"

export type ReviewActions = {
    requestReviewListToDjango(context: ActionContext<ReviewState, any>): Promise<void>
    requestCreateReviewToDjango(context: ActionContext<ReviewState, unknown>, 
        payload: { productId: string, imageFormData: FormData }): Promise<AxiosResponse>
    requestReviewToDjango(context: ActionContext<ReviewState, any>, reviewId: number): Promise<void>
    requestModifyReviewToDjango(context: ActionContext<ReviewState, any>, payload: {
        reviewTitle: string, reviewContent: string, reviewId: number,reviewRating:number
    }): Promise<void>
    requestDeleteReviewToDjango(context: ActionContext<ReviewState, unknown>, reviewId: number): Promise<void>
    requestReviewProductListToDjango(context: ActionContext<ReviewState, any>, productId: number): Promise<void>
}

const actions: ReviewActions = {
    async requestReviewListToDjango(context: ActionContext<ReviewState, any>): Promise<void> {
        try {
            const res: AxiosResponse<any, any> = await axiosInst.djangoAxiosInst.get('/review/list/');
            console.log('data:', res)
            const data: Review[] = res.data;
            console.log('data:', data)
            context.commit('REQUEST_REVIEW_LIST_TO_DJANGO', data);
        } catch (error) {
            console.error('리뷰 리스트 출력 과정 중 에러 발생:', error);
            throw error
        }
    },
    async requestCreateReviewToDjango(context: ActionContext<ReviewState, unknown>, 
        payload: { productId: string, imageFormData: FormData }): Promise<AxiosResponse> {
        try {
            const { productId, imageFormData } = payload
            console.log('requestCreateReviewToDjango()')

            const res: AxiosResponse = await axiosInst.djangoAxiosInst.post(
                `/review/register/${productId}`, imageFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log('응답 데이터:', res.data)
            return res
        } catch (error) {
            console.error('requestCreateReviewToDjango():', error)
            throw error
        }
    },
    async requestReviewToDjango(context: ActionContext<ReviewState, any>, reviewId: number): Promise<void> {
        try {
            const res: AxiosResponse<Review> = await axiosInst.djangoAxiosInst.get(`/review/read/${reviewId}`);
            console.log('data:', res.data)
            context.commit('REQUEST_REVIEW_TO_DJANGO', res.data);
        } catch (error) {
            console.error('requestReviewToDjango() 문제 발생:', error);
            throw error
        }
    },
    async requestModifyReviewToDjango(context: ActionContext<ReviewState, any>, payload: {
        reviewTitle: string, reviewContent: string, reviewId: number,reviewRating:number
    }): Promise<void> {
        
        const { reviewTitle, reviewContent, reviewId, reviewRating } = payload

        try {
            await axiosInst.djangoAxiosInst.put(`/review/modify/${reviewId}`, { reviewTitle, reviewContent,reviewRating })
            console.log('수정 성공!')
        } catch (error) {
            console.log('requestModifyReviewToDjango() 과정에서 문제 발생')
            throw error
        }
    },
    async requestDeleteReviewToDjango(context: ActionContext<ReviewState, unknown>, reviewId: number): Promise<void> {
        try {
            console.log('requestDeleteReviewToDjango()')
            await axiosInst.djangoAxiosInst.delete(`/review/delete/${reviewId}`)
        } catch (error) {
            console.log('requestDeleteReviewToDjango() 과정에서 문제 발생')
            throw error
        }
    },
    async requestReviewProductListToDjango(context: ActionContext<ReviewState, any>, productId: number): Promise<void> {
        try {
            console.log('productId:', productId)
            const res: AxiosResponse<any, any> = await axiosInst.djangoAxiosInst.get(`/review/product/list/${productId}`);
            console.log('data:', res)
            const data: Review[] = res.data;
            console.log('data:', data)
            context.commit('REQUEST_REVIEW_PRODUCT_LIST_TO_DJANGO', data);
        } catch (error) {
            console.error('해당 상품에 대한 리뷰 리스트 출력 과정 중 에러 발생:', error);
            throw error
        }
    },
}

export default actions