import { ActionContext } from "vuex"
import { ReportState } from "./states"
import { AxiosResponse } from "axios"
import axiosInst from "@/utility/axiosInstance"

export type ReportActions = {
    requestCreateReportToDjango(context: ActionContext<ReportState, unknown>, payload: {
        writer: string, age: number, gender: string}): Promise<AxiosResponse>
}

const actions: ReportActions = {
    async requestCreateReportToDjango(context: ActionContext<ReportState, unknown>, payload: {
        writer: string, age: number, gender: string}): Promise<AxiosResponse> {

        console.log('requestCreateReportToDjango()')

        const { writer, age, gender } = payload
        console.log('전송할 데이터:', { writer, age, gender })

        try {
            const res: AxiosResponse = await axiosInst.djangoAxiosInst.post('/report/register', { writer, age, gender})

            console.log('res:', res.data)
            return res.data
        } catch (error) {
            alert('requestCreateReportToDjango() 문제 발생!')
            throw error
        }
    }
};

export default actions;