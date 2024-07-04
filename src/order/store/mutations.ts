import { MutationTree } from "vuex";
import { Order, OrderState } from "./states";
import { REQUEST_MY_ORDER_LIST_TO_DJANGO } from "./mutation-types";

export interface OrderMutations extends MutationTree<OrderState> {
    [REQUEST_MY_ORDER_LIST_TO_DJANGO] (state: OrderState, receivedData: Order[]): void
}

const mutations: MutationTree<OrderState> = {
    [REQUEST_MY_ORDER_LIST_TO_DJANGO] (state: OrderState, receivedData: Order[]): void {
        state.orderList = receivedData
    }
}

export default mutations as OrderMutations