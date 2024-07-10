import { ActionContext } from "vuex"
import {CartItem, CartState} from "./states"
import { AxiosResponse } from "axios"
import axiosInst from "@/utility/axiosInstance"
import { REQUEST_CART_LIST_TO_DJANGO } from "./mutation-types"

export type CartActions = {
    requestAddCartToDjango(
        context: ActionContext<CartState, any>,
        cartData: CartItem
    ): Promise<AxiosResponse>;

    requestCartListToDjango(
        context: ActionContext<CartState, any>
    ): Promise<AxiosResponse>;
    requestDeleteCartItemToDjango(
        context: ActionContext<CartState, any>,
        cartItemId: number[]
    ): Promise<void>
    requestCartItemDuplicationCheckToDjango(
        context: ActionContext<CartState, any>,
        payload: { 
            userToken: string,
            productId: number,
        }
    ): Promise<void>
}

const actions: CartActions = {
    async requestAddCartToDjango({ commit }, cartData: CartItem) {
        try {
            const userToken = localStorage.getItem('userToken');
            if (!userToken) {
                throw new Error('User token not found');
            }

            const requestData = {
                ...cartData,
                userToken
            };

            console.log('requestData:', requestData);

            const response = await axiosInst.djangoAxiosInst.post('/cart/register', requestData);
            return response.data;
        } catch (error) {
            console.error('Error adding to cart:', error);
            throw error;
        }
    },
    async requestCartListToDjango({ commit }) {
        try {
            const userToken = localStorage.getItem('userToken');
            if (!userToken) {
                throw new Error('User token not found');
            }

            const requestData = {
                userToken
            };

            console.log('requestCartListToDjango requestData:', requestData);

            const response = await axiosInst.djangoAxiosInst.post('/cart/list', requestData);
            return response.data;
        } catch (error) {
            console.error('Error fetching cart list:', error);
            throw error;
        }
    },
    async requestDeleteCartItemToDjango(context: ActionContext<CartState, any>, cartItemId: number[]): Promise<void> {
        try {
            console.log('requestDeleteCartItemToDjango()')
            await axiosInst.djangoAxiosInst.delete('/cart/delete', { data: cartItemId })
        } catch (error) {
            console.log('requestDeleteCartItemToDjango() 과정에서 문제 발생')
            throw error
        }
    },
    async requestCartItemDuplicationCheckToDjango(
        context: ActionContext<CartState, any>,
        payload: {
            userToken: string, productId: number
        }): Promise<void> {
        const { userToken, productId } = payload
        const res = await axiosInst.djangoAxiosInst
        .post('/cart/cart-item-duplication-check', { payload })
        return res.data
    },
};

export default actions;