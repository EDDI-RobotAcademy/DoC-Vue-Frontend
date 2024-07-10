import { ActionContext, Commit } from "vuex"
import { AccountState } from "./states"
import { AxiosResponse } from "axios"
import axiosInst from "@/utility/axiosInstance"

export type AccountActions = {
    requestEmailDuplicationCheckToDjango(
        context: ActionContext<AccountState, any>,
        email: string
    ): Promise<boolean>
    requestNicknameDuplicationCheckToDjango(
        context: ActionContext<AccountState, any>,
        payload: any
    ): Promise<boolean>
    requestCreateNewAccountToDjango(
        context: ActionContext<any, any>,
        accountInfo: { email: string, nickname: string, business: boolean}
    ): Promise<void>
    requestNicknameToDjango(
        context: ActionContext<AccountState, any>,
        userToken: string
    ): Promise<string>
    requestRoleTypeToDjango(
        context: ActionContext<AccountState, any>,
        userToken: string
    ): Promise<string>
    requestCorrectAdminPasswordToDjango(
        context: ActionContext<AccountState, any>,
    ): Promise<string>
    requestCreateRecommendProductIdListToDjango(
        context: ActionContext<any, any>,
        payload: { userToken: string, RecommendProductIdList: number[] }
    ): Promise<void>
    requestRecommendProductIdListToDjango(
        context: ActionContext<AccountState, any>,
        userToken: string
    ): Promise<string>
}

const actions: AccountActions = {
    async requestEmailDuplicationCheckToDjango(
        context: ActionContext<AccountState, any>,
        email: string
    ): Promise<boolean> {

        const response = await axiosInst.djangoAxiosInst.post(
                '/account/email-duplication-check', { email })
        return response.data.isDuplicate
    },
    async requestNicknameDuplicationCheckToDjango(
        context: ActionContext<AccountState, any>,
        payload: any
    ): Promise<boolean> {

        const { newNickname } = payload

        return axiosInst.djangoAxiosInst.post(
                    '/account/nickname-duplication-check', 
                    { newNickname: newNickname }
        )
        .then((res) => {
            if (res.data) {
                alert('사용 가능한 닉네임입니다!')
                return false
            } else {
                alert('중복된 닉네임입니다!')
                return true
            }
        })
    },
    async requestCreateNewAccountToDjango(
        context: ActionContext<any, any>,
        accountInfo: { email: string, nickname: string, business:boolean}
    ): Promise<void> {
        try {
            await axiosInst.djangoAxiosInst.post('/account/register', accountInfo)
        } catch (error) {
            console.error('신규 계정 생성 실패:', error)
            throw error
        }
    },
    async requestNicknameToDjango(context: ActionContext<AccountState, any>, userToken: string): Promise<string> {
        try {
            const userToken = localStorage.getItem("userToken");
            const res: AxiosResponse<string> = 
            await axiosInst.djangoAxiosInst.post('/account/nickname',  { userToken: userToken } );
            console.log('data:', res.data)
            context.commit('REQUEST_NICKNAME_TO_DJANGO', res.data);
            return res.data
        } catch (error) {
            console.error('requestNicknameToDjango() 문제 발생:', error);
            throw error
        }
    },
    async requestRoleTypeToDjango(context: ActionContext<AccountState, any>, userToken: string): Promise<string> {
        try{
            const userToken = localStorage.getItem("userToken");
            const res: AxiosResponse<string> = await axiosInst.djangoAxiosInst.post('/account/roleType', { userToken: userToken });
            console.log('data:', res.data)
            context.commit('REQUEST_ROLETYPE_TO_DJANGO', res.data)
            return res.data
        } catch (error) {
            console.log('requestRoleTypeToDjango() 문제 발생:', error)
            throw error
        }
    },
    async requestCorrectAdminPasswordToDjango(context: ActionContext<AccountState, any>): Promise<string> {
        try{
            const res: AxiosResponse<string> = await axiosInst.djangoAxiosInst.post('/account/admin/password');
            console.log('data:', res.data)
            context.commit('REQUEST_CORRECT_ADMIN_PASSWORD_TO_DJANGO', res.data)
            return res.data
        } catch (error) {
            console.log('requestCorrectAdminPasswordToDjango() 문제 발생:', error)
            throw error
        }
    },
    async requestCreateRecommendProductIdListToDjango(
        context: ActionContext<any, any>,
        payload: { userToken: string, RecommendProductIdList: number[] }
    ): Promise<void> {
        try {
            await axiosInst.djangoAxiosInst.post('/account/recommend/register', payload)
        } catch (error) {
            console.error('추천 상품 ID 리스트 생성 실패:', error)
            throw error
        }
    },
    async requestRecommendProductIdListToDjango(context: ActionContext<AccountState, any>, userToken: string): Promise<string> {
        try{
            const userToken = localStorage.getItem("userToken");
            const res: AxiosResponse<string> = await axiosInst.djangoAxiosInst.post('/account/recommend/list', { userToken: userToken });
            console.log('data:', res.data)
            context.commit('REQUEST_RECOMMNED_PRODUCT_ID_LIST_TO_DJANGO', res.data)
            return res.data
        } catch (error) {
            console.log('requestRecommendProductIdListToDjango() 문제 발생:', error)
            throw error
        }
    }
};

export default actions;