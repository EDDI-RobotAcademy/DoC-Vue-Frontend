import { ActionContext } from "vuex"
import { Board, BoardState } from "./states"
import { AxiosResponse } from "axios"
import axiosInst from "@/utility/axiosInstance"

export type BoardActions = {
    requestBoardListToDjango(context: ActionContext<BoardState, any>): Promise<void>
    requestCreateBoardToDjango(context: ActionContext<BoardState, unknown>, 
        imageFormData: FormData): Promise<AxiosResponse>
    requestBoardToDjango(context: ActionContext<BoardState, any>, boardId: number): Promise<void>
    requestModifyBoardToDjango(context: ActionContext<BoardState, any>, payload: {
        boardTitle: string, boardContent: string, boardId: number
    }): Promise<void>
    requestDeleteBoardToDjango(context: ActionContext<BoardState, unknown>, boardId: number): Promise<void>
}

const actions: BoardActions = {
    async requestBoardListToDjango(context: ActionContext<BoardState, any>): Promise<void> {
        try {
            const res: AxiosResponse<any, any> = await axiosInst.djangoAxiosInst.get('/board/list/');
            console.log('data:', res)
            const data: Board[] = res.data;
            console.log('data:', data)
            context.commit('REQUEST_BOARD_LIST_TO_DJANGO', data);
        } catch (error) {
            console.error('게시글 리스트 출력 과정 중 에러 발생:', error);
            throw error
        }
    },
    async requestCreateBoardToDjango(context: ActionContext<BoardState, unknown>, 
                                        imageFormData: FormData): Promise<AxiosResponse> {
        try {
            console.log('requestCreateBoardToDjango()')

            const res: AxiosResponse = await axiosInst.djangoAxiosInst.post(
                '/board/register', imageFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log('응답 데이터:', res.data)
            return res
        } catch (error) {
            console.error('requestCreateBoardToDjango():', error)
            throw error
        }
    },
    async requestBoardToDjango(context: ActionContext<BoardState, any>, boardId: number): Promise<void> {
        try {
            const res: AxiosResponse<Board> = await axiosInst.djangoAxiosInst.get(`/board/read/${boardId}`);
            console.log('data:', res.data)
            context.commit('REQUEST_BOARD_TO_DJANGO', res.data);
        } catch (error) {
            console.error('requestBoardToDjango() 문제 발생:', error);
            throw error
        }
    },
    async requestModifyBoardToDjango(context: ActionContext<BoardState, any>, payload: {
        boardTitle: string, boardContent: string, boardId: number
    }): Promise<void> {
        
        const { boardTitle, boardContent, boardId } = payload

        try {
            await axiosInst.djangoAxiosInst.put(`/board/modify/${boardId}`, { boardTitle, boardContent })
            console.log('수정 성공!')
        } catch (error) {
            console.log('requestModifyBoardToDjango() 과정에서 문제 발생')
            throw error
        }
    },
    async requestDeleteBoardToDjango(context: ActionContext<BoardState, unknown>, boardId: number): Promise<void> {
        try {
            console.log('requestDeleteBoardToDjango()')
            await axiosInst.djangoAxiosInst.delete(`/board/delete/${boardId}`)
        } catch (error) {
            console.log('requestDeleteBoardToDjango() 과정에서 문제 발생')
            throw error
        }
    },
}

export default actions