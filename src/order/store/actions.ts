import { ActionContext } from "vuex"
import { OrderItem, OrderState } from "./states"
import { AxiosResponse } from "axios"
import axiosInst from "@/utility/axiosInstance"

export type OrderActions = {
    requestCartToAddOrderToDjango(
        context: ActionContext<OrderState, any>,
        payload: {
            userToken: string;
            items: {
                cartItemId: number;
                quantity: number;
                orderPrice: number
            }[]
        }
    ): Promise<AxiosResponse>;
    requestProductReadToAddOrderToDjango(
        context: ActionContext<OrderState, any>,
        payload: {
            userToken: string,
            productId: number,
            productPrice: number,
        }
    ): Promise<void>;
}

const actions: OrderActions = {
    async requestCartToAddOrderToDjango({ state }, payload) {
        try {
            const userToken = localStorage.getItem('userToken')
            if (!userToken) {
                throw new Error('User token not found')
            }
            
            console.log('payload:', payload)
            const requestData = { 
                userToken,
                items: payload.items.map(item => ({
                    cartItemId: item.cartItemId,
                    quantity: item.quantity,
                    orderPrice: item.orderPrice
                }))
            }

            const response = await axiosInst.djangoAxiosInst.post('/orders/register/cart', requestData)
            console.log('response data:', response.data)
            
            return response.data
        } catch (error) { 
            console.error('장바구니 페이지에서 상품 구매시 에러 발생:', error)
            throw error
        }
    },
    async requestProductReadToAddOrderToDjango(context: ActionContext<OrderState, any>, payload: {
        userToken: string, productId: number, productPrice: number}
        ): Promise<void> {
        try {
            const { userToken, productId, productPrice } = payload
            
            console.log('payload:', payload)

            const response = await axiosInst.djangoAxiosInst.post('/orders/register/product', payload )
            console.log('response data:', response.data)
            
            return response.data
        } catch (error) { 
            console.error('상품 페이지에서 상품 구매 시 에러 발생:', error)
            throw error
        }
    },
}

export default actions