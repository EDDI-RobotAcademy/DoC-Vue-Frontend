import { ActionContext } from "vuex"
import { Review, ReviewState } from "./states"
import { AxiosResponse } from "axios"
import axiosInst from "@/utility/axiosInstance"

export type ReviewActions = {
    requestReviewListToDjango(context: ActionContext<ReviewState, any>): Promise<void>
    requestCreateReviewToDjango(context: ActionContext<ReviewState, unknown>, 
        imageFormData: FormData): Promise<AxiosResponse>
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
                                        imageFormData: FormData): Promise<AxiosResponse> {
        try {
            console.log('requestCreateReviewToDjango()')

            const res: AxiosResponse = await axiosInst.djangoAxiosInst.post(
                '/review/register', imageFormData, {
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
export default actions