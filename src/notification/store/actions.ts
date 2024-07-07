import { ActionContext } from "vuex"
import { ExpectedSecede, NotificationState } from "./states"
import { AxiosResponse } from "axios"
import axiosInst from "@/utility/axiosInstance"

export type NotificationActions = {
    requestExpectedSecedeListToDjango(
        context: ActionContext<NotificationState, any>,
    ): Promise<void>
}

const actions: NotificationActions = {
    async requestExpectedSecedeListToDjango(context: ActionContext<NotificationState, any>): Promise<void> {
        try {
            const res: AxiosResponse<any, any> = await axiosInst.djangoAxiosInst.post('/notification/list/',);
            console.log('data:', res)
            const data: ExpectedSecede[] = res.data;
            console.log('data:', data)
            context.commit('REQUEST_EXPECTED_SECEDE_LIST_TO_DJANGO', data);
        } catch (error) {
            console.error('이탈 예상 고객 리스트 가져오는 중 에러 발생:', error);
            throw error
        }
    },
}

export default actions