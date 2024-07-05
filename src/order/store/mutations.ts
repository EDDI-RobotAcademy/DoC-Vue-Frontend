import { MutationTree } from "vuex";
import { Order, OrderItem, OrderState } from "./states";
import { REQUEST_MY_ORDER_LIST_TO_DJANGO,
         REQUEST_MY_ORDER_ITEM_LIST_TO_DJANGO
       } from "./mutation-types";

export interface OrderMutations extends MutationTree<OrderState> {
    [REQUEST_MY_ORDER_LIST_TO_DJANGO] (state: OrderState, receivedData: Order[]): void
    [REQUEST_MY_ORDER_ITEM_LIST_TO_DJANGO] (state: OrderState, receivedData: OrderItem[]): void
}

const mutations: MutationTree<OrderState> = {
    [REQUEST_MY_ORDER_LIST_TO_DJANGO] (state: OrderState, receivedData: Order[]): void {
        state.orderList = receivedData},
    [REQUEST_MY_ORDER_ITEM_LIST_TO_DJANGO] (state: OrderState, receivedData: OrderItem[]): void {
        state.orderItemList = receivedData}
}

export default mutations as OrderMutations