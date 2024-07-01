import { ActionContext } from "vuex"
import { Review, ReviewState } from "./states"
import { AxiosResponse } from "axios"
import axiosInst from "@/utility/axiosInstance"

export type ReviewActions = {
    requestReviewListToDjango(context: ActionContext<ReviewState, any>): Promise<void>
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
export default actions